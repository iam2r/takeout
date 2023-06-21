import { Component, Prop, Vue } from 'vue-property-decorator'
import { VNode } from 'vue/types/umd'

export enum EventTypes {
  Enter = 'enter',
  Exit = 'exit',
  Progress = 'progress'
}
@Component({
  name: 'CheckView'
})
export default class extends Vue {
  private _timer!: number
  private inView = false
  @Prop({
    default: 'div'
  })
  tag!: string

  @Prop({
    default: 0,
    type: Number
  })
  polling!: number

  @Prop({
    default: true,
    type: Boolean
  })
  once!: boolean

  mounted(): void {
    this.polling > 0 && this.doPolling()
  }

  private doPolling() {
    this._timer = window.setInterval(() => {
      if (this.inView) return window.clearInterval(this._timer)
      this.doForceCheck()
    }, this.polling)
  }

  public doForceCheck(): void {
    window.dispatchEvent(new Event('resize'))
  }

  render(): VNode {
    return (
      <this.tag
        {...{
          style: {
            visibility: this.inView ? 'visible' : 'hidden'
          },
          directives: [
            {
              name: 'view',
              modifiers: { once: this.once },
              value: (e: { type: EventTypes }) => {
                if (e.type === EventTypes.Enter) {
                  this.inView = true
                }
                if (e.type === EventTypes.Exit) {
                  this.inView = false
                }
                this.$emit('in-view', e)
              }
            }
          ]
        }}
      >
        {this.$scopedSlots?.default?.({
          inView: this.inView,
          doForceCheck: this.doForceCheck
        })}
      </this.tag>
    )
  }
}
