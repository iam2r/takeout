import { AppModule, DeviceType } from '@/views/tl/store/modules/app'
import { Component, Vue } from 'vue-property-decorator'
import { CssClassName, baseSwiperOptions } from '@/context'
import { DOM7Element, SwiperOptions } from 'swiper'
import { VNode } from 'vue/types/umd'
import { merge } from 'lodash'
import locale from '@/views/tl/lang'
import style from './style.module.scss'

const options: SwiperOptions = {
  pagination: {
    el: `.${style.swiperPagination}`,
    clickable: true,
    renderBullet(index, className) {
      return `<div class="${[className].join(' ')}">
        <i class='icon${index}'></i> 
        <span>${locale.t(`tl.home.${index}.title`)}</span>
      </div>`
    }
  },
  autoplay: { delay: 3000 }
}

@Component({
  name: 'SectionHome'
})
export default class extends Vue {
  /**
   * 当前轮播下标
   */
  private currentIndex = 0
  private bannersData: string[] = [
    require(`@/views/tl/assets/images/home/banner1.png`),
    require(`@/views/tl/assets/images/home/banner2.png`),
    require(`@/views/tl/assets/images/home/banner3.png`),
    require(`@/views/tl/assets/images/home/banner4.png`),
    require(`@/views/tl/assets/images/home/banner5.png`),
    require(`@/views/tl/assets/images/home/banner6.png`),
    require(`@/views/tl/assets/images/home/banner7.png`),
    require(`@/views/tl/assets/images/home/banner8.png`),
    require(`@/views/tl/assets/images/home/banner9.png`)
  ]
  private swiperOption: SwiperOptions = merge<
    SwiperOptions,
    SwiperOptions,
    SwiperOptions
  >({}, baseSwiperOptions, {
    ...options,
    on: {
      slideChangeTransitionStart: this.slideChange
    }
  })

  /**
   * swiper下标改变
   */
  private slideChange() {
    const realIndex = (this.$refs.mySwiper as DOM7Element)?.$swiper?.realIndex
    this.currentIndex = Number(realIndex) || 0
  }
  /**
   * 改变swiper下标
   */
  private changeSlide(index: number) {
    ;(this.$refs.mySwiper as DOM7Element).$swiper.slideTo(index + 1)
  }

  renderDesktopSwiper(inView: boolean): VNode {
    return (
      <div
        class={[
          style.main,
          CssClassName.Animate.Animated,
          inView ? CssClassName.Animate.VanishIn : ''
        ]}
      >
        <swiper
          class={[style.aboutSwiper]}
          ref="mySwiper"
          options={this.swiperOption}
        >
          {this.bannersData.map((banner: string) => {
            return (
              <swiper-slide key={banner}>
                <img class={style.imgBg} src={banner} />
              </swiper-slide>
            )
          })}
          <div
            class={[
              CssClassName.Swiper.Pagination,
              CssClassName.Swiper.NoSwiping,
              style.swiperPagination
            ]}
            slot="pagination"
          ></div>
        </swiper>
        {AppModule.device === DeviceType.Mobile && (
          <div class={style.aboutBannerContainer}>
            {this.bannersData.map((banner: string, index) => {
              return (
                <div
                  key={banner}
                  onClick={this.changeSlide.bind(this, index)}
                  class={`${this.currentIndex === index ? 'active' : ''}`}
                >
                  <i class={`icon${index}`}></i>
                  <span>{locale.t(`tl.home.${index}.title`)}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  render(): VNode {
    return (
      <check-view
        polling={100}
        scopedSlots={{
          default: ({ inView }: { inView: boolean }) => {
            return this.renderDesktopSwiper(inView)
          }
        }}
      />
    )
  }
}
