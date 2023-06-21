import { Component, Vue } from 'vue-property-decorator'
import { VNode } from 'vue/types/umd'
import style from './style.module.scss'
@Component({
  name: 'AppMain'
})
export default class extends Vue {
  render(): VNode {
    return (
      <main class={[style['app-main']]}>
        <section class={[style['app-main-container']]}>
          {this.$scopedSlots?.default?.({})}
        </section>
      </main>
    )
  }
}
