import { AppModule } from '@/views/tl/store/modules/app'
import { Component, Vue } from 'vue-property-decorator'
import { CssClassName } from '@/context'
import { VNode } from 'vue/types/umd'
import style from './style.module.scss'
@Component({
  name: 'Partners'
})
export default class extends Vue {
  private get itemsData(): Array<string> {
    const language = AppModule.language
    return [
      require(`@/views/tl/assets/images/partners/partners1.png`),
      require(`@/views/tl/assets/images/partners/${language}/partners2.png`)
    ]
  }

  render(): VNode {
    return (
      <check-view
        scopedSlots={{
          default: ({ inView }: { inView: boolean }) => {
            return (
              <div class={style.main}>
                <section-title title="partners" />
                <div
                  class={[
                    CssClassName.Animate.Animated,
                    inView ? CssClassName.Animate.ZoomIn : '',
                    style.partners
                  ]}
                >
                  {this.itemsData.map((item) => {
                    return <img src={item} alt="" />
                  })}
                </div>
              </div>
            )
          }
        }}
      />
    )
  }
}
