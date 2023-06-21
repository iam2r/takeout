import { Options as GoogleTagManagerOptions } from '@/utils/GoogleTagManager'

interface ISettings {
  fixedHeader: boolean
  mobileMenuOpendlockScroll: boolean
  countryCodeLimit: string[]
  googleTagConfig: GoogleTagManagerOptions
}

// You can customize below settings :)
const settings: ISettings = {
  /**
   * 控制头部是否固定
   */
  fixedHeader: true,
  /**
   * 移动端导航栏开启时是body是否可以滚动
   * 关联逻辑：
   * 如果可以滚动，则菜单打开时需要实时计算菜单激活项
   */
  mobileMenuOpendlockScroll: true,
  //内外环境不进行IP过滤
  countryCodeLimit: ['test'].includes(process.env.NODE_SERVICE || '')
    ? []
    : ['MY', 'CN'],
  // countryCodeLimit: [],
  googleTagConfig: {
    gtagId: 'G-5G97DLGXNQ',
    gtmId: 'GTM-KR2K2FB'
  }
}

export default settings
