import { Component, Vue } from 'vue-property-decorator'
import { CssClassName } from '@/context'
import { VNode } from 'vue/types/umd'
import style from './style.module.scss'
@Component({
  name: 'Contact'
})
export default class extends Vue {
  render(): VNode {
    return (
      <check-view
        scopedSlots={{
          default: ({ inView }: { inView: boolean }) => {
            return (
              <div class={style.main}>
                <section-title class={style.title} title="contact" />
                <iframe
                  id="gmap_canvas"
                  src="https://maps.google.com/maps?q=menara%20perak,%20kuala%20lumpur&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  frameborder="0"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
                ></iframe>
                <div
                  class={[
                    style.content,
                    CssClassName.Animate.Animated,
                    inView ? CssClassName.Animate.ZoomIn : ''
                  ]}
                >
                  <p>Tin Tin Life Sdn Bhd (1429651-M)</p>
                  <p domPropsInnerHTML={this.$t('tl.contact.content')}></p>
                </div>
              </div>
            )
          }
        }}
      />
    )
  }
}
