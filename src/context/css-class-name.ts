import { range } from 'lodash'
export default {
  Swiper: {
    NoSwiping: 'swiper-no-swiping',
    Pagination: 'swiper-pagination',
    Button: {
      Prev: 'swiper-button-prev',
      Next: 'swiper-button-next'
    }
  },

  Animate: {
    Animated: 'animate__animated',
    Speed: {
      Fast: 'animate__fast',
      Faster: 'animate__faster',
      Slow: 'animate__slow',
      Slower: 'animate__slower'
    },
    Repeat: {
      infinite: 'animate__infinite'
    },

    Delay: range(50, 2001, 50).reduce((pre: Record<number, string>, item) => {
      pre[item] = `animate__delay-${item}ms`
      return pre
    }, {}),
    ZoomIn: 'animate__zoomIn',
    VanishIn: 'animate__vanishIn',
    BounceIn: 'animate__bounceIn',
    FlipInY: 'animate__flipInY',
    Streamer: 'animate__streamer',
    SlideInLeft: 'animate__slideInLeft',
    SlideInRight: 'animate__slideInRight',
    FadeInLeft: 'animate__fadeInLeft',
    FadeInRight: 'animate__fadeInRight',
    HeartBeat: 'animate__heartBeat',
    ScrollHalf: {
      Up: 'animate__scrollUpHalf',
      Right: 'animate__scrollRightHalf',
      Down: 'animate__scrollDownHalf',
      Left: 'animate__scrollLeftHalf'
    },

    Hover: {
      Grow: 'animate__grow__hover',
      Float: 'animate__float__hover',
      Forward: 'animate__forward__hover',
      Backward: 'animate__backward__hover'
    }
  }
}
