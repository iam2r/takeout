// CSS后处理
const postcssPresetEnv = require('postcss-preset-env')
const autoprefixer = require('autoprefixer')
const px2rem = require('postcss-pxtorem')
module.exports = {
  plugins: [
    postcssPresetEnv({ stage: 0 }),
    autoprefixer,
    px2rem({
      rootValue: 100,
      unitPrecision: 5,
      propList: ['*'],
      exclude: /node_modules|adapter\.scss/i
    })
  ]
}
