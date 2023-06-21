import { AppModule } from '@/views/tl/store/modules/app'
import { Component, Vue } from 'vue-property-decorator'
import { MetaInfo } from 'vue-meta'
import { VNode } from 'vue/types/umd'
import Layout from '@/views/tl/layout'

import Home from '@/views/tl/pages/home'
import NavBar from '@/views/tl/components/navbar'

Component.registerHooks(['metaInfo'])
@Component({
  name: 'App'
})
export default class extends Vue {
  /**
   * seo 优化
   */
  metaInfo(): MetaInfo {
    const title = '天天生活|Tin Tin Life'
    return {
      htmlAttrs: {
        lang: AppModule.language
      },
      title,
      meta: [
        {
          name: 'title',
          property: 'og:title',
          content: title
        },
        {
          name: 'description',
          property: 'og:description',
          content: '天天生活|Tin Tin Life'
        },
        {
          name: 'keywords',
          property: 'og:keywords',
          content: '天天生活|Tin Tin Life'
        }
      ]
    }
  }
  render(): VNode {
    return (
      <div id="app" data-lang={AppModule.language} key={AppModule.language}>
        <Layout
          {...{
            scopedSlots: {
              default: () => {
                return <Home />
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
