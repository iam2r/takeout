export interface Options {
  /**
   * 是否阻止右键菜单（右键单击/Shift+F10快捷键）
   */
  preventContextMenu?: boolean
  /**
   * 是否阻止开发者模式快捷键（ F12/Ctrl+Shift+I/Ctrl+Shift+J/Ctrl+Shift+C/CMD+Alt+I/CMD+Alt+J/CMD+Alt+C）
   */
  preventDevTools?: boolean
  /**
   * 开发模式时是否开启阻止
   */
  preventInDev?: boolean
}
export default class Browser {
  private options!: Options

  constructor(options: Options) {
    this.options = options
    this.init()
  }

  private init() {
    if (!this.options.preventInDev && process.env.NODE_ENV === 'development') {
      return
    }

    this.doPreventContextMenu()

    this.doPreventDevTools()
  }

  private doPreventContextMenu(): void {
    if (this.options.preventContextMenu) {
      /**
       * 屏蔽右键点击
       */
      window.oncontextmenu = function (e) {
        //取消默认的浏览器自带右键 很重要！！
        e.preventDefault()
      }
    }
  }

  private doPreventDevTools(): void {
    if (this.options.preventDevTools) {
      this.forceReload()
    }
    /**
     *屏蔽 相关 快捷键
     */
    window.addEventListener('keydown', this.keyboardHandler.bind(this), true)
  }

  private keyboardHandler(event: KeyboardEvent): void {
    if (event.defaultPrevented) {
      return // 如果已取消默认操作，则不应执行任何操作
    }
    if (this.options.preventContextMenu) {
      /**
       * 1. Shift+F10，等同于鼠标右键
       */
      if (event.shiftKey && event.key == 'F10') {
        event.preventDefault()
      }
    }
    if (this.options.preventDevTools) {
      /**
       * 1. F12
       * WINDOW/LINUX
       * 2. Ctrl+Shift+I
       * 3. Ctrl+Shift+J
       * 4. Ctrl+Shift+C
       * MAC
       * 5. CMD+Alt+I
       * 6. CMD+Alt+J
       * 7. CMD+Alt+C
       */
      if (
        // F12 (Chome, Firefox, Edge)
        event.key == 'F12' ||
        (event.ctrlKey &&
          event.shiftKey &&
          ['i', 'j', 'c'].includes(event.key.toLowerCase())) ||
        (event.metaKey &&
          event.altKey &&
          ['i', 'j', 'c'].includes(event.key.toLowerCase()))
      ) {
        event.preventDefault()
      }
    }
  }

  private forceReload(): void {
    const context = {
      warn: console.warn,
      reload: () => {
        location.href = '/'
      }
    }
    context.warn(
      Object.defineProperties(new Error(), {
        toString: {
          value() {
            const error = new Error()
            if (error?.stack && error?.stack.includes('toString@')) {
              context.reload()
            }
          }
        },
        message: {
          get() {
            context.reload()
          }
        }
      })
    )
  }
}
