import { Configuration } from 'webpack'
import { resolve } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
export type AppMapType = Record<
  string,
  {
    NODE_VIEW: string
    NODE_SERVICE: Record<string, string>
    webpackConfig?: (config?: Configuration) => Configuration
  }
>
export const AppMap: AppMapType = {
  TL: {
    NODE_VIEW: 'tl',
    NODE_SERVICE: {
      test: 'test', //内网
      try: 'try', //体验
      prod: 'prod' //生产
    },
    webpackConfig: () => {
      return {
        entry: {
          about: './src/views/tl/entry/about/index.ts'
        },
        plugins: [
          new HtmlWebpackPlugin({
            version: new Date().toString(),
            filename: 'about.html',
            template: resolve(__dirname, '../../index.html'),
            chunks: ['about'],
            favicon: resolve(__dirname, `../../src/views/tl/favicon.ico`)
          })
        ]
      }
    }
  }
}
