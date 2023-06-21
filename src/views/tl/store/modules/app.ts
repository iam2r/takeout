import {
  Action,
  Module,
  Mutation,
  VuexModule,
  getModule
} from 'vuex-module-decorators'
import { Country, Language } from '@/utils/Locale'
import locale, { defaultCountry, defaultLanguage } from '@/views/tl/lang'

import { setCurrentMenu } from '@/views/tl/components/navbar/utils'
import settings from '@/views/tl/settings'
import store, { getVuexStorage } from '@/views/tl/store'

export const menus = [
  'home',
  'business',
  'rider',
  'download',
  'partners',
  'about',
  'contact'
] as const

export type MenusType = typeof menus[number]

export enum DeviceType {
  Mobile = 'mobile',
  Desktop = 'desktop'
}

export interface IAppState {
  activeMenu: MenusType
  device: DeviceType
  navbar: {
    opened: boolean
    withoutAnimation: boolean
  }
  language: Language
  country: Country
  size: string
}

const vuexStorage = getVuexStorage()['app']
@Module({
  dynamic: true,
  store,
  name: 'app'
})
class App extends VuexModule implements IAppState {
  public activeMenu: IAppState['activeMenu'] = 'home'
  public scrollOverTop = false //滚动是否超过了导航栏高度
  public device: DeviceType = DeviceType.Desktop
  public language: IAppState['language'] = defaultLanguage
  public country: IAppState['country'] = defaultCountry
  public size: IAppState['size'] = vuexStorage?.size || 'medium'
  public navbar: IAppState['navbar'] = {
    opened: false,
    withoutAnimation: false
  }

  @Mutation
  public SET_ACTIVEMENU(menuKey: MenusType) {
    this.activeMenu = menuKey
  }

  @Mutation
  public TOGGLE_SCROLLOVERTOP(isOverTop: boolean) {
    this.scrollOverTop = isOverTop
  }

  @Mutation
  private TOGGLE_NAVBAR(withoutAnimation: boolean) {
    this.navbar.opened = !this.navbar.opened
    this.navbar.withoutAnimation = withoutAnimation
    /**
     * 重新计算激活的菜单
     */
    if (this.navbar.opened) {
      setCurrentMenu()
    }
    /**
     * 根据配置决定是否固定body
     */
    if (settings.mobileMenuOpendlockScroll) {
      document.body.style.overflow = this.navbar.opened ? 'hidden' : ''
    }
  }

  @Mutation
  private TOGGLE_DEVICE(device: DeviceType) {
    this.device = device
  }

  @Mutation
  private SET_LANGUAGE(language: Language) {
    this.language = language
  }

  @Mutation
  private SET_COUNTRY(country: Country) {
    this.country = country
  }

  @Mutation
  private SET_SIZE(size: string) {
    this.size = size
  }

  @Action
  public ToggleNavBar(withoutAnimation: boolean) {
    this.TOGGLE_NAVBAR(withoutAnimation)
  }

  @Action
  public ToggleDevice(device: DeviceType) {
    this.TOGGLE_DEVICE(device)
  }

  @Action
  public async SetLanguage(language: Language) {
    await locale.setLanguage(language)
    this.SET_LANGUAGE(language)
  }

  @Action
  public async SetCountry(country: Country) {
    await locale.setCountry(country)
    this.SET_COUNTRY(country)
  }

  @Action
  public SetSize(size: string) {
    this.SET_SIZE(size)
  }
}

export const AppModule = getModule(App)
