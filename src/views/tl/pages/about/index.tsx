import { Component, Vue } from 'vue-property-decorator'
import { VNode } from 'vue/types/umd'
import SectionPolicy from './sections/policy'

@Component({
  name: 'About'
})
export default class extends Vue {
  render(): VNode {
    return (
      <div>
        <section id="section-policy">
          <SectionPolicy />
        </section>
      </div>
    )
  }
}
