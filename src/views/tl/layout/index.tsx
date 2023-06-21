import { AppFooter, AppHeader, AppMain } from './components'
import { AppModule, DeviceType } from '@/views/tl/store/modules/app'
import { Component, Mixins, Prop } from 'vue-property-decorator'
import { VNode } from 'vue/types/umd'
import ResizeMixin from './mixin/resize'
import style from './style.module.scss'
@Component({
  name: 'Layout',
  components: {
    AppMain,
    AppHeader,
    AppFooter
  }
})
export default class extends Mixins(ResizeMixin) {
  @Prop({
    default: true
  })
  private readonly showMenu!: boolean

  private handleClickOutside() {
    if (!AppModule.navbar.opened) return
    AppModule.ToggleNavBar(false)
  }

  render(): VNode {
    return (
      <div
        class={[
          style['app-wrapper'],
          {
            mobile: this.device === DeviceType.Mobile,
            withoutAnimation: this.navbar.withoutAnimation
          }
        ]}
      >
        {/* 移动端导航栏 */}
        <transition name="fade-inner-height">
          {this.device === DeviceType.Mobile && this.navbar.opened && (
            <div class={[style['drawer-bg']]} onClick={this.handleClickOutside}>
              <div
                onClick={(e: Event) => e.stopPropagation()}
                class={[style['mobile-menu-container']]}
              >
                <div class={[style['scroll-container']]}>
                  <div class={[style['scroll-scroller']]}>
                    {this.$scopedSlots?.navbar?.({})}
                  </div>
                </div>
              </div>
            </div>
          )}
        </transition>
        <div class={[style['main-container']]}>
          <app-header
            show-menu={this.showMenu}
            id={'section-header'}
            scopedSlots={{
              navbar: () => {
                return this.$scopedSlots?.navbar?.({})
              }
            }}
          />
          <app-main
            scopedSlots={{
              default: () => {
                return this.$scopedSlots?.default?.({})
              }
            }}
          />
          <app-footer />
        </div>
      </div>
    )
  }
}
