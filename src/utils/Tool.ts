import { Message } from 'element-ui'
import Locale from '@/utils/Locale'
import Vue from 'vue'
import qs from 'qs'

/**
 * 用于将一个数字或者字符串剔除特殊字符及重复小数点、零等
 * 转成合法的数字字符串
 * @param {Number|String} value
 * @returns {String}
 */
export const force2LegalNumberStr = (value: number | string): string => {
  //转成字符串
  let strValue = value + ''
  //以-开头的定义为负号，其它为空
  const symbol = /^-/.test(strValue) ? '-' : ''
  strValue = strValue
    .replace(/([^\d.])/g, '') //只保留数字和小数点
    .replace(/\./, 'd') //将第一个小数点用字母d占位置
    .replace(/\./g, '') //清理所有小数点
    .replace(/d/, '.') //还原第一个匹配到的小数点位置
    .replace(/^\./, '0.') //如果小数点在首位，则替换.xx 为0.xx
    .replace(/^0+(\d+?\.?)/, '$1') //去除整数位重复0
    .replace(/(?:\.0*|(\.\d+?)0+)$/, '$1') //去除小数位重复0

  return (Number(symbol + strValue) >= 0 ? '#' : '-#').replace('#', strValue)
}

export const currencyFormatter = (
  value: number | string,
  opts?: {
    symbol?: string
    separator?: string
    decimal?: string
    precision?: number //保留的小数位,默认2位
    groups?: RegExp
    useRounding?: boolean
    useForceTransform?: boolean
  }
): string => {
  const {
    symbol,
    separator,
    decimal,
    precision,
    groups,
    useRounding,
    useForceTransform
  } = Object.assign(
    {},
    {
      symbol: '', //金额标识，传$等货币符号可拼接在前，默认为空
      separator: ',', //分割符号，按groups规则对整数位进行分割，默认为空'',比如要用','隔开传它即可
      decimal: '.', //小数点的符号，默认英文'.'
      precision: 2, //保留的小数位,默认2位
      groups: /(\d)(?=(\d{3})+\b)/g, //整数位分割规则，默认千分位，每三位用separator符号进行分割
      useRounding: false, //是否开启四舍五入，默认不开启
      useForceTransform: true //是否强制转成合法数字字符串
    },
    opts
  )
  value = (useForceTransform ? force2LegalNumberStr(value) : value) || 0
  //处理精度
  const scale = Math.pow(10, precision)
  value = useRounding ? Math.round(Number(value) * scale) / scale : value

  //分开处理整数位和小数位
  const split = ('' + value).replace(/^-/, '').split('.'),
    dollars = split[0]
  let cents = split[1] || ''
  //截取
  if (precision <= cents.length) {
    cents = cents.slice(0, precision)
  }

  //补0
  while (precision > cents.length) {
    cents += '0'
  }

  return (value >= 0 ? '!#' : '-!#')
    .replace('!', symbol)
    .replace(
      '#',
      dollars.replace(groups, '$1' + separator) + (cents ? decimal + cents : '')
    )
}

export const createCopy =
  (locale: Locale) =>
  (content: string): Promise<unknown> => {
    return Vue.prototype.$copyText(content).then(
      function () {
        Message({
          customClass: 'my-mini',
          message: locale.t('global.copied'),
          type: 'success'
        })
      },
      function () {
        console.log('Can not copy')
      }
    )
  }

export const openHack = (href: string, e?: Event): void => {
  e && e.preventDefault()
  /**
   * 通过iframe方式调用，避免调用失败时打开了新的窗口
   */
  const openByIframe = (url: string): void => {
    const iframeHack = document.createElement('IFRAME') as HTMLIFrameElement
    iframeHack.style.display = 'none'
    iframeHack.src = url
    document.body.appendChild(iframeHack)
    setTimeout(() => {
      document.body.removeChild(iframeHack)
    }, 100)
  }
  if (/^(mailto):/.test(href)) {
    openByIframe(href)
  } else {
    window.open(href)
  }
}

export const toPage = (url: string, query?: unknown, cache = true): void => {
  const split = url.split('?')
  window.location.href =
    split[0] +
    '?' +
    qs.stringify(
      Object.assign(
        {
          ...(!cache ? { time: +new Date() } : {}),
          ...(split[1] ? qs.parse(split[1]) : {})
        },
        query
      )
    )
}

export const to403 = (log?: string): void => {
  let logId = ''
  if (log) {
    logId = 'page-403-log'
    sessionStorage.setItem(logId, log)
  }
  toPage('./pages/403/', { logId })
}

export const check403 = (
  blackList: string[],
  countryCode?: string
): boolean => {
  if (blackList.length === 0) {
    return false
  }
  if (!countryCode) {
    return true
  }
  if (blackList.includes(countryCode)) {
    return true
  }
  return false
}
