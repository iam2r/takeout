import { AppModule } from '@/views/tl/store/modules/app'
import { Component, Vue } from 'vue-property-decorator'
import { VNode } from 'vue/types/umd'
import style from './style.module.scss'
interface Item {
  src: string
  url: string
}
@Component({
  name: 'Floating'
})
export default class extends Vue {
  private get itemsData(): Array<Item> {
    const language = AppModule.language
    return [
      {
        src: require(`@/views/tl/assets/images/common/${language}/service.png`),
        url: 'https://wa.me/601115888888'
      },
      {
        src: require(`@/views/tl/assets/images/common/app.png`),
        url: 'https://apps.apple.com/my/app/tin-tin-life/id1594312677'
      },
      {
        src: require(`@/views/tl/assets/images/common/google.png`),
        url: 'https://play.google.com/store/apps/details?id=uni.UNIB70EEFA'
      }
    ]
  }

  render(): VNode {
    return (
      <div class={style.main}>
        {this.itemsData.map((item: Item) => {
          return (
            <img
              src={item.src}
              alt=""
              onClick={() => {
                window.open(item.url)
              }}
            />
          )
        })}
        <img
          src={
            process.env.NODE_SERVICE === 'test'
              ? require(`@/views/tl/assets/images/common/qr1_test.jpg`)
              : require(`@/views/tl/assets/images/common/qr1_prod.jpg`)
          }
          alt=""
        />
        <span domPropsInnerHTML={this.$t('tl.common.scan')}></span>
      </div>
    )
  }
}
