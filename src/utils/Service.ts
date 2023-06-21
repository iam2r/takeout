import { Message } from 'element-ui'
import { merge, uniqueId } from 'lodash'
import Locale from '@/utils/Locale'
import qs from 'qs'

declare module 'axios' {
  export interface AxiosRequestConfig {
    customParams?: {
      notShowGlobalErrorDialog?: boolean
      successCode?: number
    }
  }
}

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Canceler
} from 'axios'

export enum ContentTypeEnum {
  JSON = 'application/json',
  FORM = 'application/x-www-form-urlencoded'
}

export type Response<T = unknown> = {
  msg: string
  code: number
  result?: string
  data?: T
}

export type ResponseInstance<R = Response> = Promise<AxiosResponse<R>>

export interface Interceptors<R = Response> {
  // 请求拦截
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestInterceptorsCatch?: (err: any) => any
  // 响应拦截
  responseInterceptors?: (
    config: AxiosResponse<R>
  ) => AxiosResponse<R> | Promise<never>
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  responseInterceptorsCatch?: (err: any) => any
}

export interface ServiceOptions<R = Response> {
  successCode?: number
  config?: AxiosRequestConfig
  locale?: Locale
  interceptors?: Interceptors<R>
}

export default class Service<R = Response> {
  private successCode!: number
  private config!: AxiosRequestConfig
  private locale!: Locale | undefined
  protected instance!: AxiosInstance
  private interceptors!: Interceptors<R>
  private cancelRequestSource: Map<string, Canceler> = new Map()
  constructor(options: ServiceOptions<R>) {
    this.successCode = options.successCode ?? 1
    this.locale = options.locale
    this.config = merge(
      {
        timeout: 5000,
        headers: {
          'Content-type': ContentTypeEnum.JSON,
          siteCode: process.env.NODE_SITECODE ?? ''
        }
      },
      options.config
    )
    this.interceptors = merge<Interceptors<R>, Interceptors<R> | undefined>(
      {
        requestInterceptors: (config) => {
          if (config.headers['Content-type'] === ContentTypeEnum.FORM) {
            config.data = qs.stringify(config.data, {
              allowDots: true
            })
          }
          return config
        },
        requestInterceptorsCatch: (err) => {
          return Promise.reject(err)
        },
        responseInterceptors: (response: AxiosResponse<R>) => {
          const res = (response as unknown as AxiosResponse<Response>)?.data
          if (res.result === 'success') {
            return response
          }
          const successCode =
            response.config.customParams?.successCode ?? this.successCode
          if (!res || res.code !== successCode) {
            if (!response.config.customParams?.notShowGlobalErrorDialog) {
              Message({
                customClass: 'my-mini',
                message:
                  res?.msg ||
                  (this.locale ? this.locale.t('global.error') : ''),
                type: 'error'
              })
            }
            return Promise.reject(res)
          } else {
            return response
          }
        },
        responseInterceptorsCatch: (error) => {
          if (!error.config.customParams?.notShowGlobalErrorDialog) {
            Message({
              customClass: 'my-mini',
              message: error.message,
              type: 'error'
            })
          }

          return Promise.reject(error)
        }
      },
      options.interceptors
    )

    this.create()
  }
  private create() {
    this.instance = axios.create(this.config)

    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      const uid = uniqueId('data-uuid-')

      merge(
        {
          headers: {
            'data-uuid': uid,
            'x-request-id': uid
          },
          cancelToken: new axios.CancelToken((c) => {
            if (!this.cancelRequestSource.has(uid)) {
              this.cancelRequestSource.set(uid, c)
            }
          })
        },
        config
      )

      return config
    })

    this.instance.interceptors.request.use(
      this.interceptors.requestInterceptors,
      this.interceptors.requestInterceptorsCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors.responseInterceptors,
      this.interceptors.responseInterceptorsCatch
    )
  }

  public cancel(config?: AxiosRequestConfig): void {
    const doCancel = (id: string): void => {
      if (this.cancelRequestSource.has(id)) {
        const canceler = this.cancelRequestSource.get(id)
        canceler && canceler()
        this.cancelRequestSource.delete(id)
      }
    }

    if (!config) {
      this.cancelRequestSource.forEach((_canceler, id) => {
        doCancel(id)
      })
    } else {
      doCancel(config.headers['data-uuid'])
    }
  }
}
