import { AppModule } from '@/views/tl/store/modules/app'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Country } from '@/utils/Locale'
import { VNode } from 'vue/types/umd'
import style from './style.module.scss'

@Component({
  name: 'CountrySelect'
})
export default class extends Vue {
  @Prop({
    required: true
  })
  readonly CountryConfig!: Record<Country, string>

  private loading = false

  get country(): Country {
    return AppModule.country
  }

  private async handleSetLanguage(country: Country): Promise<void> {
    this.loading = true
    await AppModule.SetCountry(country)
    this.loading = false
  }

  private isOpen = false

  private changeFun(data: boolean): void {
    this.isOpen = data
  }

  render(): VNode {
    return (
      <el-dropdown
        trigger="click"
        class={[style.country]}
        onCommand={this.handleSetLanguage}
        placement="bottom-end"
        onVisible-change={this.changeFun}
      >
        <div class={[style.selectbox]}>
          <img
            src={require(`@/views/tl/assets/images/sprites/main/icon_country_${this.country.toLocaleLowerCase()}.png`)}
            alt="country"
          />
          {this.CountryConfig[this.country]}
          <span
            class={[
              this.loading
                ? 'el-icon-loading'
                : 'el-icon-arrow-down el-icon--right',
              style.openIcon,
              this.isOpen ? style.open : '',
              'el-icon--right'
            ]}
          ></span>
        </div>
        <el-dropdown-menu slot="dropdown">
          {Object.entries(this.CountryConfig).map(([command, label]) => (
            <el-dropdown-item
              disabled={this.country === command}
              command={command}
              class={[this.country === command ? style.active : '']}
            >
              <span>{label}</span>
            </el-dropdown-item>
          ))}
        </el-dropdown-menu>
      </el-dropdown>
    )
  }
}
