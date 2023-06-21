import { AppModule, DeviceType } from '@/views/tl/store/modules/app'
import { Component, Vue } from 'vue-property-decorator'
import { CssClassName, baseSwiperOptions } from '@/context'
import { SwiperOptions } from 'swiper'
import { TranslateResult } from 'vue-i18n'
import { VNode } from 'vue/types/umd'
import { merge } from 'lodash'
import style from './style.module.scss'
interface Item {
  src: string
  title: TranslateResult
}
const options: SwiperOptions = {
  pagination: {
    el: `.${style.swiperPagination}`,
    clickable: true,
    renderBullet(index, className) {
      return `<div class="${[className].join(' ')}">
        <i class='icon${index}'></i> 
      </div>`
    }
  },
  autoplay: { delay: 3000 }
}
@Component({
  name: 'Rider'
})
export default class extends Vue {
  private swiperOption: SwiperOptions = merge<
    SwiperOptions,
    SwiperOptions,
    SwiperOptions
  >({}, baseSwiperOptions, options)

  private get itemsData(): Array<Item> {
    const language = AppModule.language
    return [
      {
        src: require(`@/views/tl/assets/images/rider/${language}/rider1.png`),
        title: this.$t('tl.rider.rider1')
      },
      {
        src: require(`@/views/tl/assets/images/rider/rider2.png`),
        title: this.$t('tl.rider.rider2')
      },
      {
        src: require(`@/views/tl/assets/images/rider/${language}/rider3.png`),
        title: this.$t('tl.rider.rider3')
      },
      {
        src: require(`@/views/tl/assets/images/rider/${language}/rider4.png`),
        title: this.$t('tl.rider.rider4')
      }
    ]
  }

  private get itemsInfoData(): Array<Item> {
    return [
      {
        src: require(`@/views/tl/assets/images/rider/info1.png`),
        title: this.$t('tl.rider.info.info1')
      },
      {
        src: require(`@/views/tl/assets/images/rider/info2.png`),
        title: this.$t('tl.rider.info.info2')
      },
      {
        src: require(`@/views/tl/assets/images/rider/info3.png`),
        title: this.$t('tl.rider.info.info3')
      }
    ]
  }

  renderContent(item: Item, index: number, inView: boolean): VNode {
    return (
      <div
        key={item.src}
        class={[
          style.contentbox,
          CssClassName.Animate.Animated,
          inView ? CssClassName.Animate.ZoomIn : ''
        ]}
      >
        <div class={style.count}>{index}</div>
        {AppModule.device === DeviceType.Mobile && (
          <p>{(item.title as string).replace('<br/>', '')}</p>
        )}
        <img src={item.src} alt="" />
        {AppModule.device === DeviceType.Desktop && (
          <p domPropsInnerHTML={item.title}></p>
        )}
      </div>
    )
  }

  renderInfoContent(item: Item, inView: boolean): VNode {
    if (AppModule.device === DeviceType.Mobile) {
      return (
        <div
          key={item.src}
          class={[
            style.infoContentbox,
            CssClassName.Animate.Animated,
            inView ? CssClassName.Animate.ZoomIn : ''
          ]}
        >
          <h1>{item.title}</h1>
          <img src={item.src} alt="" />
        </div>
      )
    } else {
      return (
        <div
          key={item.src}
          class={[
            style.infoContentbox,
            CssClassName.Animate.Animated,
            inView ? CssClassName.Animate.ZoomIn : ''
          ]}
        >
          <img src={item.src} alt="" />
          <h1>{item.title}</h1>
        </div>
      )
    }
  }

  render(): VNode {
    return (
      <check-view
        scopedSlots={{
          default: ({ inView }: { inView: boolean }) => {
            return (
              <div class={style.main}>
                <section-title title="rider" />
                {AppModule.device === DeviceType.Desktop && (
                  <div class={style.outbox}>
                    {this.itemsData.map((item: Item, index: number) => {
                      return this.renderContent(item, index + 1, inView)
                    })}
                  </div>
                )}
                {AppModule.device === DeviceType.Mobile && (
                  <swiper
                    class={style.swiperbox}
                    ref="mySwiper"
                    options={this.swiperOption}
                  >
                    {this.itemsData.map((item: Item, index: number) => {
                      return (
                        <swiper-slide key={item.src}>
                          <div class={style.outbox}>
                            {this.renderContent(item, index + 1, inView)}
                          </div>
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
                )}
                <div>
                  <section-title title="apply" />
                  <div class={style.infobox}>
                    {this.itemsInfoData.map((item: Item) => {
                      return this.renderInfoContent(item, inView)
                    })}
                  </div>
                </div>
              </div>
            )
          }
        }}
      />
    )
  }
}
