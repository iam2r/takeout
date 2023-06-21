import { SwiperOptions } from 'swiper'
import CssClassName from './css-class-name'
export const baseSwiperOptions: SwiperOptions = {
  slidesPerView: 1,
  autoplay: {
    delay: 6000,
    /**
     * 操作行为后是否停止轮播
     */
    disableOnInteraction: false
  },
  loop: true,
  navigation: {
    nextEl: `.${CssClassName.Swiper.Button.Next}`,
    prevEl: `.${CssClassName.Swiper.Button.Prev}`
  }
}
