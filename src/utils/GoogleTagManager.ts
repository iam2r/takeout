import { loadScripts } from './Loader'

/* eslint-disable @typescript-eslint/no-explicit-any*/
export interface Options {
  gtagId: string
  gtmId: string
  prop?: string | 'dataLayer'
}
export default class GoogleTagManager {
  private options!: Required<Options>

  constructor(options: Options) {
    this.options = Object.assign({ prop: 'dataLayer' }, options)
    this.init()
  }

  public init(): void {
    this.createNoScript()
    this.dataLayerPush(['js', new Date()])
    this.dataLayerPush(['config', this.options.gtagId])
    this.dataLayerPush({ 'gtm.start': +new Date(), event: 'gtm.js' })
    this.loadJs()
  }

  private loadJs(): void {
    const { prop, gtagId, gtmId } = this.options
    const dl = prop != 'dataLayer' ? '&l=' + prop : ''

    loadScripts([
      {
        id: 'script-gtag',
        async: true,
        src: `https://www.googletagmanager.com/gtag/js?id=${gtagId}`
      },
      {
        id: 'script-gtm',
        async: true,
        src: `https://www.googletagmanager.com/gtm.js?id=${gtmId}${dl}`
      }
    ])
  }

  private dataLayerPush(data: any): void {
    const { prop } = this.options
    ;(window as any)[prop] = (window as any)[prop] || []
    ;(window as any)[prop].push(data)
  }

  private createNoScript(): void {
    const $noscript = document.createElement('noscript')
    $noscript.innerHTML = `<iframe
        title="googletagmanager"
        src="https://www.googletagmanager.com/ns.html?id=${this.options.gtmId}"
        height="0"
        width="0"
        style="display: none; visibility: hidden"
      ></iframe
      >`
    document.body.insertBefore($noscript, document.body.children[0])
  }
}
