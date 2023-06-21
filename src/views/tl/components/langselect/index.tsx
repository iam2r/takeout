import { AppModule } from '@/views/tl/store/modules/app'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Language } from '@/utils/Locale'
import { VNode } from 'vue/types/umd'
import style from './style.module.scss'

@Component({
  name: 'LangSelect'
})
export default class extends Vue {
  @Prop({
    default: () => ({
      'zh-CN': '简体中文',
      en: 'English'
    })
  })
  readonly lanConfig!: Record<Language, string>

  private loading = false

  get language(): Language {
    return AppModule.language
  }

  private async handleSetLanguage(lang: Language): Promise<void> {
    this.loading = true
    await AppModule.SetLanguage(lang)
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
        class={[style.international]}
        onCommand={this.handleSetLanguage}
        placement="bottom-end"
        onVisible-change={this.changeFun}
      >
        <div>
          {this.lanConfig[this.language]}
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
          {Object.entries(this.lanConfig).map(([command, label]) => (
            <el-dropdown-item
              disabled={this.language === command}
              command={command}
              class={[this.language === command ? style.active : '']}
            >
              <span>{label}</span>
            </el-dropdown-item>
          ))}
        </el-dropdown-menu>
      </el-dropdown>
    )
  }
}
