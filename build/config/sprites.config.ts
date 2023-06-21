/**
 * 精灵图插件配置
 */
import { parse, relative, resolve } from 'path'
import SpritesmithPlugin from 'webpack-spritesmith'
import { getNodeEnvVar } from '../lib/util/shared'

type Config = {
  input: string
}
const list: Config[] = [
  {
    input: `views/${getNodeEnvVar('NODE_VIEW')}/assets/images/sprites/main`
  }
]

export default [
  ...list.map(({ input }) => {
    const namespace = input.split('/').pop()
    const target = `_spritesmith`
    const output = `${input}/${target}`
    const assetsPath = resolve(__dirname, `../../src/${input}`)
    const outputPath = resolve(__dirname, `../../src/${output}`)
    const cssImageRef = `~@/${output}/${namespace}.png`
    return new SpritesmithPlugin({
      spritesmithOptions: {
        padding: 2
      },
      src: {
        cwd: assetsPath,
        glob: ['*.png', '*.jpg']
      },
      target: {
        image: `${outputPath}/${namespace}.png`,
        css: [[`${outputPath}/${namespace}.scss`]]
      },

      apiOptions: {
        cssImageRef,
        spritesheet_info: {
          name: namespace + '-spritesheet'
        },
        generateSpriteName: (fileName) =>
          `sprite_${namespace}_${parse(relative(assetsPath, fileName)).name}`
      }
    })
  })
]
