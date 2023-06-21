import { getVuexStorage } from '@/views/tl/store'
import Locale, { Country, Language } from '@/utils/Locale'
import globalMessage from '@/lang'

const languageStorage = getVuexStorage()['app']?.language
const countryStorage = getVuexStorage()['app']?.country

export const language = ['en', 'zh-TW', 'zh-CN'] as Language[]
export const country = ['MY'] as Country[]

export const defaultLanguage = language.includes(languageStorage)
  ? languageStorage
  : 'zh-CN'

export const defaultCountry = country.includes(countryStorage)
  ? countryStorage
  : 'MY'

const messages = {
  en: () => import('./en'),
  'zh-TW': () => import('./zh-TW'),
  'zh-CN': () => import('./zh-CN')
}
const locale = new Locale({
  defaultLanguage,
  language,
  messages: [messages, globalMessage],
  loadElementUILocale: false,
  loadLanguageAsync: true
})

export default locale
