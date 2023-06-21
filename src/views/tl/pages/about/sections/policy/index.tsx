import { Component, Vue } from 'vue-property-decorator'
import { VNode } from 'vue/types/umd'
import style from './style.module.scss'
@Component({
  name: 'Policy'
})
export default class extends Vue {
  private type = 'payment'
  private getQueryString(key: string): string {
    let _type = ''
    const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i')
    const r = window.location.search.substr(1).match(reg)
    if (r != null) {
      _type = decodeURIComponent(r[2])
    }
    // 避免query乱输无内容展示
    if (_type === 'policy') {
      return _type
    } else {
      return 'payment'
    }
  }
  public mounted(): void {
    this.type = this.getQueryString('type')
  }
  render(): VNode {
    return (
      <div class={style.main}>
        <h1 domPropsInnerHTML={this.$t(`tl.${this.type}.title`)}></h1>
        <blockquote
          domPropsInnerHTML={this.$t(`tl.${this.type}.content`)}
        ></blockquote>
      </div>
    )
  }
}
