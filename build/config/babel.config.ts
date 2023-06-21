/**
 * transpileDependencies 变量 配置 需要强行走babel转化的依赖
 */
export const transpileDependencies = process.env.MODERN_BUILD
  ? []
  : ['vuex-module-decorators', 'swiper', 'dom7'] //为了兼容IE11 这些依赖也需要跑babel转化
