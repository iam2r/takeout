import { AppModule, DeviceType } from '@/views/tl/store/modules/app'
import { Component, Vue } from 'vue-property-decorator'
import { CssClassName } from '@/context'
import { VNode } from 'vue/types/umd'
import style from './style.module.scss'

@Component({
  name: 'About'
})
export default class extends Vue {
  private Img: string = require('@/views/tl/assets/images/about/about.png')
  renderWeb(inView: boolean): VNode {
    return (
      <div
        class={[
          CssClassName.Animate.Animated,
          inView ? CssClassName.Animate.ZoomIn : ''
        ]}
      >
        <div class={style.left}>
          <p domPropsInnerHTML={this.$t('tl.about.p1')}></p>
          <p domPropsInnerHTML={this.$t('tl.about.p2')}></p>
          <p domPropsInnerHTML={this.$t('tl.about.p3')}></p>
        </div>
        <img class={style['about-img']} src={this.Img} alt="" />
      </div>
    )
  }
  renderMobile(inView: boolean): VNode {
    return (
      <div
        class={[
          CssClassName.Animate.Animated,
          inView ? CssClassName.Animate.ZoomIn : ''
        ]}
      >
        <p domPropsInnerHTML={this.$t('tl.about.p1')}></p>
        <div>
          <img class={style['about-img']} src={this.Img} alt="" />
          <p domPropsInnerHTML={this.$t('tl.about.p2')}></p>
        </div>
        <p domPropsInnerHTML={this.$t('tl.about.p3')}></p>
      </div>
    )
  }
  render(): VNode {
    return (
      <check-view
        scopedSlots={{
          default: ({ inView }: { inView: boolean }) => {
            return (
              <div class={style.main}>
                <section-title class={style.title} title="about" />
                {AppModule.device === DeviceType.Mobile
                  ? this.renderMobile(inView)
                  : this.renderWeb(inView)}
              </div>
            )
          }
        }}
      />
    )
  }
}
