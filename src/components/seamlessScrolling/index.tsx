import { Component, Prop, Vue } from 'vue-property-decorator'
import { CssClassName } from '@/context'
import { VNode } from 'vue/types/umd'
import style from './style.module.scss'
export enum DirectionTypes {
  Up = 'Up',
  Right = 'Right',
  Down = 'Down',
  Left = 'Left'
}
@Component({
  name: 'SeamlessScrolling'
})
export default class extends Vue {
  @Prop({
    default: DirectionTypes.Left
  })
  direction!: DirectionTypes

  @Prop({
    default: 1
  })
  duration!: number

  render(): VNode {
    return (
      <span
        class={style.main}
        data-direction={this.direction.toLocaleLowerCase()}
      >
        <div>
          <span class={style.placeholder} style={{ visibility: 'hidden' }}>
            {this.$slots?.default}
          </span>
          <div
            class={[
              style.mainScroller,
              CssClassName.Animate.Animated,
              CssClassName.Animate.Repeat.infinite,
              CssClassName.Animate.ScrollHalf[this.direction]
            ]}
            style={{
              'animation-duration': this.duration + 's'
            }}
          >
            {Array.from({ length: 2 }).map((_, i) => {
              return <span key={`content-${i}`}>{this.$slots?.default}</span>
            })}
          </div>
        </div>
      </span>
    )
  }
}
