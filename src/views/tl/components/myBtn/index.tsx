import { Component, Prop, Vue } from 'vue-property-decorator'
import { VNode } from 'vue/types/umd'
import style from './style.module.scss'

type type = 'app' | 'google' | 'service'

@Component({
  name: 'MyBtn'
})
export default class extends Vue {
  @Prop({
    default: 'app'
  })
  type!: type

  @Prop({
    required: true
  })
  url!: string

  private Info = {
    app: {
      title: 'App Store',
      remark: 'Download on the</br>'
    },
    google: {
      title: 'Google Play',
      remark: 'Get it on</br>'
    },
    service: {
      title: '联系客服',
      remark: ''
    }
  }

  render(): VNode {
    return (
      <check-view
        scopedSlots={{
          default: () => {
            return (
              <div
                class={style.main}
                onClick={() => {
                  window.open(this.url)
                }}
              >
                <i class={style[this.type]}></i>
                <p>
                  <span domPropsInnerHTML={this.Info[this.type].remark}></span>
                  {this.Info[this.type].title}
                </p>
              </div>
            )
          }
        }}
      />
    )
  }
}
