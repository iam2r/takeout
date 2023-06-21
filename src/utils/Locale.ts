import { merge } from 'lodash'
import Vue from 'vue'
import VueI18n, { LocaleMessageObject, LocaleMessages } from 'vue-i18n'
export type Language = 'en' | 'zh-TW' | 'zh-CN'
export type Country = 'MY'
const elementUIMessages = {
  en: () => import('element-ui/lib/locale/lang/en'),
  'zh-TW': () => import('element-ui/lib/locale/lang/zh-TW'),
  'zh-CN': () => import('element-ui/lib/locale/lang/zh-CN')
}

export type Messages = Record<
  Language,
  (() => Promise<{ default: LocaleMessageObject }>) | LocaleMessageObject
>

interface LocaleOptions {
  defaultLanguage: Language //初始装载的语言
  language: Language[] //需要下载的语言列表
  messages: Messages | Messages[] // messsage配置
  loadElementUILocale?: boolean // 是否混入elementUI的国际化
  loadLanguageAsync?: boolean // 是否开启语言的按需加载，开启后，使用该语言时才会进行下载
}

export default class Locale {
  private options!: LocaleOptions
  private messages: Set<Messages> = new Set()
  public i18n!: VueI18n
  constructor(options: LocaleOptions) {
    this.options = options
  }

  private async loadMessages(
    messages: Messages
  ): Promise<Record<Language, LocaleMessageObject>> {
    const promises = Object.entries(messages).map(([key, value]) => {
      return (async () => {
        const lang = key as Language
        const message: LocaleMessageObject =
          typeof value === 'function' ? (await value()).default : value
        return [lang, message] as [Language, LocaleMessageObject]
      })()
    })
    const result = await Promise.all(promises)
    return result.reduce((pre, [key, value]) => {
      pre[key] = value
      return pre
    }, {} as Record<Language, LocaleMessageObject>)
  }

  private async loadLanguageAsync(
    filterLanguages: Language[]
  ): Promise<LocaleMessages> {
    const needLoadLanguages = filterLanguages.filter(Boolean)
    const messagesArgs = []
    for (const iterator of this.messages) {
      messagesArgs.push(
        await this.loadMessages(
          this.messagesFilter(iterator, needLoadLanguages)
        )
      )
    }
    const message = merge({}, ...messagesArgs)

    for (const lang of needLoadLanguages) {
      if (this.i18n) {
        this.i18n.mergeLocaleMessage(lang, message[lang])
      }
    }

    return message
  }

  private messagesFilter(
    messages: Messages,
    filterLanguages?: Language[]
  ): Messages {
    return Object.entries(messages).reduce((pre, [lang, value]) => {
      const languages = filterLanguages || []
      if (languages.includes(lang as Language)) {
        pre[lang as Language] = value
      }
      return pre
    }, {} as Messages)
  }

  public async create(): Promise<VueI18n> {
    const {
      defaultLanguage: locale,
      loadElementUILocale,
      loadLanguageAsync,
      language
    } = this.options

    const filterLanguages = loadLanguageAsync ? [locale] : language
    Vue.use(VueI18n)

    this.mergeMessages(this.options.messages)

    const messages = await this.loadLanguageAsync(filterLanguages)
    this.i18n = new VueI18n({
      locale,
      messages
    })

    if (loadElementUILocale) {
      const elementUILocale = (await import('element-ui/lib/locale')).default
      elementUILocale.i18n((key: string, value: string) =>
        this.i18n.t(key, value)
      )
    }

    return this.i18n
  }

  public mergeMessages(messages: Messages | Messages[]): void {
    const { loadElementUILocale } = this.options
    const messagesArr = Array.isArray(messages) ? messages : [messages]
    if (loadElementUILocale) {
      messagesArr.push(elementUIMessages)
    }
    for (const iterator of messagesArr) {
      this.messages.add(iterator)
    }
  }

  public async setLanguage(
    locale: Language,
    instance: VueI18n = this.i18n
  ): Promise<Language> {
    await this.loadLanguageAsync([locale])
    instance.locale = locale
    return locale
  }

  public async setCountry(locale: Country): Promise<Country> {
    // await this.loadLanguageAsync([locale])
    // instance.locale = locale
    console.log(locale, '目前只有一个国家，没有具体功能，暂时写死')
    return 'MY'
  }

  public t(
    path: string,
    options: string[] | { [key: string]: unknown } = []
  ): string {
    const i18nResult = this.i18n.t(
      path,
      !Array.isArray(options) ? options : undefined
    ) as string

    return Array.isArray(options)
      ? i18nResult.replace(/\{\d\}/g, (match) => {
          const index = +match.replace(/[{}]/g, '')
          if (Array.isArray(options)) {
            return options[index] || match
          }
          return match
        })
      : i18nResult
  }
}
