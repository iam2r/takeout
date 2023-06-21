import { Component, Vue } from 'vue-property-decorator'
import { VNode } from 'vue/types/umd'
import style from './style.module.scss'
@Component({
  name: 'Fotter'
})
export default class extends Vue {
  openWindow(url: string): void {
    window.open(url)
  }
  render(): VNode {
    return (
      <div class={style.main}>
        <div>
          <span class={style.logo}></span>
          <div>
            <p>关注我们</p>
            <p>FOLLOW US</p>
          </div>
          <i
            class={style.face}
            onClick={this.openWindow.bind(
              this,
              'https://www.facebook.com/Tin-Tin-Life-103943765638003/?ref=page_internal'
            )}
          ></i>
          <i
            class={style.onme}
            onClick={this.openWindow.bind(
              this,
              'https://www.instagram.com/tintin.life_foodparadise/'
            )}
          ></i>
          <i
            class={style.phone}
            onClick={this.openWindow.bind(this, 'https://wa.me/601115888888')}
          ></i>
          <i
            class={style.tel}
            onClick={this.openWindow.bind(this, 'https://t.me/TIN_TIN_LIFE')}
          ></i>
        </div>
        <div class={style.bottom}>
          <span
            onClick={this.openWindow.bind(this, '/about.html?type=payment')}
          >
            {this.$t('tl.footer.s1')}
          </span>
          <span onClick={this.openWindow.bind(this, '/about.html?type=policy')}>
            {this.$t('tl.footer.s2')}
          </span>
          <span>© 2022 Tin Tin Life SDN. BHD. All Rights Reserved</span>
        </div>
      </div>
    )
  }
}
