import 'swiper/css/swiper.css'
import { PluginObject } from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
const SwiperPlugin: PluginObject<unknown> = {
  install: (Vue): void => {
    Vue.use(VueAwesomeSwiper)
  }
}

export default SwiperPlugin
