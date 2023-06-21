import '@/styles/index.scss'
import '@/views/tl/styles/adapter.scss'

import CheckView from 'vue-check-view'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import VueMeta from 'vue-meta'

import { GlobalEventEmitter, GlobalEvents } from '@/context'

import Browser from '@/utils/Browser'

import ElementUI from '@/plugins/element-ui'
import Swiper from '@/plugins/swiper'

import MyCheckView from '@/components/checkView'
import SeamlessScrolling from '@/components/seamlessScrolling'

import App from '@/views/tl/App'
import AppContainer from '@/views/tl/layout/components/appcontainer'
import MyBtn from '@/views/tl/components/myBtn'
import SectionTitle from '@/views/tl/components/sectionTitle'

import locale from '@/views/tl/lang'
import store from '@/views/tl/store'

GlobalEventEmitter.once(GlobalEvents.Loaded, (i18n) => {
  Vue.use(ElementUI)
    .use(Swiper)
    .use(VueClipboard)
    .use(CheckView)
    .use(VueMeta)
    .use({
      install() {
        Vue.component('CheckView', MyCheckView)
        Vue.component('SeamlessScrolling', SeamlessScrolling)
        Vue.component('AppContainer', AppContainer)
        Vue.component('MyBtn', MyBtn)
        Vue.component('SectionTitle', SectionTitle)
      }
    })

  Vue.config.productionTip = false
  new Vue({
    i18n,
    store,
    render: (h) => h(App)
  }).$mount('#app')
})
;(async () => {
  try {
    /*
      注入GoogleTagManager进行访问统计
      new GoogleTagManager(settings.googleTagConfig)
      进行浏览器安全配置
    */
    new Browser({
      preventContextMenu: true,
      preventDevTools: true,
      preventInDev: false
    })
    //动态加载国际化内容
    const i18n = await locale.create()
    //异步加载完毕，派发加载完毕事件
    GlobalEventEmitter.emit(GlobalEvents.Loaded, i18n)
  } catch (error) {}
})()
