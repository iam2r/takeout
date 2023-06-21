import { AppModule } from '@/views/tl/store/modules/app'
import { Component, Vue } from 'vue-property-decorator'
import { CssClassName } from '@/context'
import { TranslateResult } from 'vue-i18n'
import { VNode } from 'vue/types/umd'
import style from './style.module.scss'
interface Item {
  src: string
  title: TranslateResult
  appUrl: string
  googleUrl: string
}
const imgQrType = process.env.NODE_SERVICE === 'test' ? 'test' : 'prod'

@Component({
  name: 'Download'
})
export default class extends Vue {
  private itemsData: Array<Item> = [
    {
      src: require(`@/views/tl/assets/images/common/qr4_${imgQrType}.jpg`),
      title: this.$t('tl.download.title1'),
      googleUrl: 'https://play.google.com/store/apps/details?id=uni.UNIB70EEFA',
      appUrl: 'https://apps.apple.com/my/app/tin-tin-life/id1594312677'
    },
    {
      src: require(`@/views/tl/assets/images/common/qr2_${imgQrType}.jpg`),
      title: this.$t('tl.download.title2'),
      googleUrl:
        'https://play.google.com/store/apps/details?id=com.veding.seller463_6504',
      appUrl: 'https://apps.apple.com/my/app/tin-tin-life-merchant/id1618900705'
    },
    {
      src: require(`@/views/tl/assets/images/common/qr3_${imgQrType}.jpg`),
      title: this.$t('tl.download.title3'),
      googleUrl:
        'https://play.google.com/store/apps/details?id=com.veding.vesend463_6503',
      appUrl: 'https://apps.apple.com/my/app/tin-tin-life-rider/id1618912208'
    }
  ]

  render(): VNode {
    const language = AppModule.language
    return (
      <check-view
        scopedSlots={{
          default: ({ inView }: { inView: boolean }) => {
            return (
              <div class={style.main}>
                <section-title title="download" />
                <div class={style.downloadbox}>
                  {this.itemsData.map((item: Item) => {
                    return (
                      <div
                        class={[
                          style.card,
                          CssClassName.Animate.Animated,
                          inView ? CssClassName.Animate.ZoomIn : ''
                        ]}
                      >
                        <img src={item.src} alt="" />
                        <div>
                          <p class={language === 'en' ? style.en : ''}>
                            {item.title}
                          </p>
                          {/* <my-btn type="app" url={item.appUrl} />  */}
                          {/* <my-btn type="google" url={item.googleUrl} /> */}
                          <img
                            src={require(`@/views/tl/assets/images/common/app.png`)}
                            alt=""
                            onClick={() => {
                              window.open(item.appUrl)
                            }}
                          />
                          <img
                            src={require(`@/views/tl/assets/images/common/google.png`)}
                            alt=""
                            onClick={() => {
                              window.open(item.googleUrl)
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          }
        }}
      />
    )
  }
}
