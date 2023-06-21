import { getNodeEnvVar } from '../lib/util/shared'

/**
 * 所有走了loader的sccs文件头部均会自动注入下列代码
 */
export const additionalData = ` 
@use 'sass:math';
@use "@/views/${getNodeEnvVar('NODE_VIEW')}/styles/_variables.scss" as *;
@use "@/views/${getNodeEnvVar(
  'NODE_VIEW'
)}/assets/images/sprites/main/_spritesmith/main.scss" as *;
@use "@/styles/_mixins.scss" as *;
`
