import { AppModule, DeviceType, IAppState } from '@/views/tl/store/modules/app'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Throttle } from '@/utils/Decorator'
import { setCurrentMenu } from '@/views/tl/components/navbar/utils'
import globalStyle from '@/views/tl/styles/_variables.module.scss'
import settings from '@/views/tl/settings'
const WIDTH = parseFloat(globalStyle.responsiveWidth) * 100 // refer to Bootstrap's responsive design
const TOP = parseFloat(globalStyle.menuHeight) * 100

@Component({
  name: 'ResizeMixin'
})
export default class extends Vue {
  get navbar(): IAppState['navbar'] {
    return AppModule.navbar
  }

  get device(): IAppState['device'] {
    return AppModule.device
  }

  @Watch('$route')
  protected onRouteChange(): void {
    if (this.device === DeviceType.Mobile && this.navbar.opened) {
      AppModule.ToggleNavBar(true)
    }
  }
  @Watch('device')
  protected onDeviceChange(val: DeviceType): void {
    if (this.navbar.opened && val === DeviceType.Desktop) {
      AppModule.ToggleNavBar(true)
    }
  }

  beforeMount(): void {
    window.addEventListener('resize', this.resizeHandler)
    window.addEventListener('scroll', this.scrollHandler)
    window.addEventListener('unload', () => {
      window.scrollTo(0, 0)
    })
  }

  mounted(): void {
    this.resizeHandler()
  }

  beforeDestroy(): void {
    window.removeEventListener('resize', this.resizeHandler)
    window.removeEventListener('scroll', this.scrollHandler)
  }

  private isMobile(): boolean {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  @Throttle(100)
  private resizeHandler(): void {
    if (!document.hidden) {
      const isMobile = this.isMobile()
      const device = isMobile ? DeviceType.Mobile : DeviceType.Desktop
      AppModule.ToggleDevice(device)
      document.querySelector('html')?.setAttribute('data-device', device)
    }
  }

  @Throttle(300)
  private scrollHandler(): void {
    if (!document.hidden) {
      /**
       * 滚动是否超过了固定的头部
       */
      if (settings.fixedHeader) {
        if (window.scrollY > TOP && !AppModule.scrollOverTop) {
          AppModule.TOGGLE_SCROLLOVERTOP(true)
        } else if (window.scrollY <= TOP && AppModule.scrollOverTop) {
          AppModule.TOGGLE_SCROLLOVERTOP(false)
        }
      }

      /**
       * PC版因为导航栏一直显示，所以滚动时需要实时计算
       * Mobile版需要打开了导航栏且配置了打开时body可以滚动才需要实时计算
       */

      const needCalcCurrentMenu =
        AppModule.device === DeviceType.Desktop ||
        (AppModule.device === DeviceType.Mobile &&
          AppModule.navbar.opened &&
          !settings.mobileMenuOpendlockScroll)

      /**
       * 计算菜单激活项目
       */
      if (needCalcCurrentMenu) {
        setCurrentMenu()
      }
    }
  }
}
