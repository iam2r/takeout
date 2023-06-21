import Vue, { VNode } from 'vue'
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

//jsx
declare global {
  namespace JSX {
    type Element = VNode
    type ElementClass = Vue
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [elem: string]: any
    }
  }
}
