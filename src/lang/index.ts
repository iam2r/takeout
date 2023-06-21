import { Messages } from '@/utils/Locale'
export default {
  en: () => import('./en'),
  'zh-TW': () => import('./zh-TW'),
  'zh-CN': () => import('./zh-CN')
} as Messages
