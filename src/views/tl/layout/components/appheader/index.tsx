import { AppModule, DeviceType } from '@/views/tl/store/modules/app'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { CssClassName } from '@/context'
import { Debounce } from '@/utils/Decorator'
import { VNode } from 'vue/types/umd'
import { scroll2Menu } from '@/views/tl/components/navbar/utils'
import CountrySelect from '@/views/tl/components/countryselect'
import LangSelect from '@/views/tl/components/langselect'
import settings from '@/views/tl/settings'
import style from './style.module.scss'

@Component({
  name: 'AppHeader',
  components: {
    CountrySelect,
    LangSelect
  }
})
export default class extends Vue {
  @Prop({
    default: true
  })
  private readonly showMenu!: boolean

  private onLogoClick(): void {
    scroll2Menu('home')
  }

  @Debounce(300, {
    leading: true,
    trailing: false
  })
  private onSwitchClick(): void {
    AppModule.ToggleNavBar(false)
  }

  headerSetting(): VNode {
    return (
      <div class={[style['app-header-setting']]}>
        <div>
          <country-select
            country-config={{
              MY: this.$t('tl.header.lang')
            }}
            class={[
              CssClassName.Animate.Animated,
              CssClassName.Animate.BounceIn
            ]}
          />
          <lang-select
            class={[
              CssClassName.Animate.Animated,
              CssClassName.Animate.BounceIn
            ]}
          />
        </div>
        <a
          href={
            process.env.NODE_SERVICE === 'test'
              ? 'https://lzufe.tt.gs/member/login.jhtml'
              : 'https://nledz.tt.vip/member/login.jhtml'
          }
          target="_blank"
        >
          <img
            src={require('@/views/tl/assets/images/sprites/main/header_shop.png')}
            alt=""
          ></img>
          {this.$t('tl.header.Merchant')}
        </a>
      </div>
    )
  }

  render(): VNode {
    return (
      <header
        class={[
          style['app-header'],
          {
            'fixed-header': settings.fixedHeader,
            'scroll-over-top': AppModule.scrollOverTop
          }
        ]}
      >
        <app-container>
          {AppModule.device === DeviceType.Desktop && this.headerSetting()}
          {this.showMenu && (
            <div class={[style['app-header-container']]}>
              <div class={style.logoBox}>
                <span
                  class={[
                    style.logo,
                    CssClassName.Animate.Animated,
                    CssClassName.Animate.BounceIn
                  ]}
                  onClick={this.onLogoClick}
                ></span>
              </div>

              {AppModule.device === DeviceType.Desktop &&
                this.$scopedSlots?.navbar?.({})}
              <div class={[style['header-right']]}>
                {AppModule.device === DeviceType.Mobile && (
                  <i
                    class={[style['menu-switch']]}
                    onClick={this.onSwitchClick}
                  ></i>
                )}
              </div>
            </div>
          )}

          {AppModule.device === DeviceType.Mobile && this.headerSetting()}
        </app-container>
      </header>
    )
  }
}
