import { AppModule } from '@/views/tl/store/modules/app'
import { Component, Vue } from 'vue-property-decorator'
import { VNode } from 'vue/types/umd'
import Layout from '@/views/tl/layout'

import About from '@/views/tl/pages/about'
import NavBar from '@/views/tl/components/navbar'

@Component({
  name: 'App'
})
export default class extends Vue {
  render(): VNode {
    return (
      <div id="app" data-lang={AppModule.language} key={AppModule.language}>
        <Layout
          show-menu={false}
          {...{
            scopedSlots: {
              default: () => {
                return <About />
              },
              navbar: () => {
                return <NavBar />
              }
            }
          }}
        />
      </div>
    )
  }
}
