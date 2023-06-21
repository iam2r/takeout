import { GlobalEventEmitter, GlobalEvents } from '@/context'
import NProgress from 'nprogress'
NProgress.configure({ showSpinner: false }) // NProgress Configuration
GlobalEventEmitter.once(GlobalEvents.Loaded, () => {
  NProgress.done()
})
;(async () => {
  try {
    NProgress.start()
    await import(/* webpackChunkName: "about-async" */ `./about.async`)
  } catch (error) {}
})()
