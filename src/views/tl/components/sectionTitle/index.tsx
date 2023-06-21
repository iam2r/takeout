import { AppModule } from '@/views/tl/store/modules/app'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { CssClassName } from '@/context'
import { VNode } from 'vue/types/umd'
import style from './style.module.scss'

@Component({
  name: 'SectionTitle'
})
export default class extends Vue {
  @Prop({
    default: ''
  })
  title!: string

  @Prop({
    default: ''
  })
  remark!: string

  render(): VNode {
    const language = AppModule.language
    return (
      <check-view
        class={[style.main]}
        scopedSlots={{
          default: ({ inView }: { inView: boolean }) => {
            return [
              <img
                class={[
                  CssClassName.Animate.Animated,
                  inView ? CssClassName.Animate.VanishIn : ''
                ]}
                src={require(`@/views/tl/assets/images/title/${language}/${this.title}.png`)}
                alt=""
                srcset=""
              />,
              this.remark && (
                <p
                  class={[
                    CssClassName.Animate.Animated,
                    inView ? CssClassName.Animate.VanishIn : ''
                  ]}
                >
                  {this.remark}
                </p>
              )
            ]
          }
        }}
      />
    )
  }
}
