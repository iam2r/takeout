import '@/styles/index.scss'
import '@/views/tl/styles/adapter.scss'

import Vue from 'vue'

import { GlobalEventEmitter, GlobalEvents } from '@/context'

import Browser from '@/utils/Browser'

import ElementUI from '@/plugins/element-ui'

import App from './App'
import AppContainer from '@/views/tl/layout/components/appcontainer'

import locale from '@/views/tl/lang'
import store from '@/views/tl/store'

GlobalEventEmitter.once(GlobalEvents.Loaded, (i18n) => {
  Vue.use(ElementUI).use({
    install() {
      Vue.component('AppContainer', AppContainer)
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
    //注入GoogleTagManager进行访问统计
    // new GoogleTagManager(settings.googleTagConfig)
    //进行浏览器安全配置
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
