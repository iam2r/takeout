import { Component, Vue } from 'vue-property-decorator'
import { VNode } from 'vue/types/umd'
import style from './style.module.scss'
@Component({
  name: 'AppContainer'
})
export default class extends Vue {
  render(): VNode {
    return (
      <section class={[style['app-container'], 'app-container']}>
        {this.$slots.default}
      </section>
    )
  }
}
