import Service, {
  Response,
  ResponseInstance,
  ServiceOptions
} from '@/utils/Service'
type IPResponseData = {
  country_code: string
  city_code: string
}
class WgService extends Service {
  constructor(options: ServiceOptions) {
    super(options)
  }
  public getIpInfo(): ResponseInstance<Response<IPResponseData>> {
    return this.instance({
      url: '/api/v1/ip/get',
      method: 'get',
      customParams: {
        notShowGlobalErrorDialog: true
      }
    })
  }
}

export default new WgService({})
