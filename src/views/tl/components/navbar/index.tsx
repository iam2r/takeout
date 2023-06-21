import { AppModule, DeviceType, menus } from '@/views/tl/store/modules/app'
import { Component, Vue } from 'vue-property-decorator'
import { CssClassName } from '@/context'
import { VNode } from 'vue/types/umd'
import { scroll2Menu } from '@/views/tl/components/navbar/utils'
import style from './style.module.scss'

@Component({
  name: 'NavBar'
})
export default class extends Vue {
  private menusKey = menus

  render(): VNode {
    return (
      <section
        class={[
          style.main,
          CssClassName.Animate.Animated,
          AppModule.device === DeviceType.Desktop
            ? CssClassName.Animate.ZoomIn
            : ''
        ]}
      >
        {this.menusKey.map((menuKey, index) => {
          const title = this.$t(`tl.navbar.${menuKey}`)
          return (
            <div
              key={menuKey}
              class={[
                AppModule.activeMenu === menuKey ? style.active : '',

                AppModule.device === DeviceType.Mobile
                  ? [
                      CssClassName.Animate.Animated,
                      CssClassName.Animate.Speed.Faster,
                      index != 0 ? CssClassName.Animate.Delay[index * 50] : '',
                      CssClassName.Animate.FadeInRight
                    ]
                  : ''
              ]}
              onClick={() => {
                AppModule.device === DeviceType.Mobile &&
                  AppModule.ToggleNavBar(true)
                if (
                  AppModule.device === DeviceType.Desktop &&
                  (menuKey === 'about' || menuKey === 'contact')
                ) {
                  scroll2Menu(menuKey, 100)
                } else {
                  scroll2Menu(menuKey)
                }
              }}
            >
              <span>{title}</span>
            </div>
          )
        })}
      </section>
    )
  }
}
