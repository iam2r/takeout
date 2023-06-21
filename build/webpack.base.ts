import {
  Configuration,
  DefinePlugin,
  Module,
  WebpackPluginInstance
} from 'webpack'
import { VueLoaderPlugin } from 'vue-loader'
import { babelExclude, createCssLoader } from './lib/util/loader'
import { resolve } from 'path'
import { transpileDependencies } from './config/babel.config'
import CaseSensitivePathsWebpackPlugin from 'case-sensitive-paths-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ESLintWebpackPlugin from 'eslint-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import SpritesmithPlugin from './config/sprites.config'
import StylelintWebpackPlugin from 'stylelint-webpack-plugin'
import fs from 'fs'
import { getNodeEnvVar } from './lib/util/shared'

const config: Configuration = {
  entry: {
    index: './src/main.ts'
  },
  target: 'web',
  output: {
    filename: 'assets/[name].bundle.js',
    assetModuleFilename: 'assets/[name].[contenthash][ext]',
    path: resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      // 处理vue
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(t|j)sx?$/,
        exclude: (filepath) =>
          /**如果需要兼容IE把这些也走babel*/
          babelExclude(filepath, transpileDependencies),
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        oneOf: [
          // 这里匹配 `<style module>`
          {
            resourceQuery: /module/,
            use: createCssLoader('sass')
          },
          {
            test: /\.module\.\w+$/,
            use: createCssLoader('sass')
          },
          {
            use: createCssLoader('sass', { modules: false })
          }
        ]
      },
      {
        test: /\.less$/,
        oneOf: [
          // 这里匹配 `<style module>`
          {
            resourceQuery: /module/,
            use: createCssLoader('less')
          },
          {
            test: /\.module\.\w+$/,
            use: createCssLoader('less')
          },
          {
            use: createCssLoader('less', { modules: false })
          }
        ]
      },
      // 处理其它资源
      {
        test: /\.(woff2?|eot|ttf|otf|png|svg|jpg|gif|cur|mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: (
            source: string | Buffer,
            { filename }: { filename: string; module: Module }
          ): boolean => {
            const rule1 = Buffer.byteLength(source) <= 8 * 1024
            const isSpritesmith = /_spritesmith[\\/]/.test(filename)
            return rule1 && !isSpritesmith
          }
        }
      }
    ]
  },
  plugins: [
    new ESLintWebpackPlugin({
      fix: true,
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
    }),
    new StylelintWebpackPlugin({
      fix: true,
      extensions: ['css', 'scss', 'sass', '.vue']
    }),
    new VueLoaderPlugin() as WebpackPluginInstance,
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(getNodeEnvVar()),
      'process.env.NODE_VIEW': JSON.stringify(getNodeEnvVar('NODE_VIEW')),
      'process.env.NODE_SERVICE': JSON.stringify(getNodeEnvVar('NODE_SERVICE')),
      'process.env.NODE_SITECODE': JSON.stringify(getNodeEnvVar('SITE_CODE'))
    }),
    new HtmlWebpackPlugin({
      version: new Date().toString(),
      filename: 'index.html',
      template: resolve(__dirname, '../index.html'),
      chunks: ['index'],
      favicon: resolve(
        __dirname,
        `../src/views/${getNodeEnvVar('NODE_VIEW')}/favicon.ico`
      )
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve(__dirname, '../public'),
          toType: 'dir'
        }
      ].filter(({ from }) => fs.existsSync(from))
    }),

    // fork-ts-checker-webpack-plugin，顾名思义就是创建一个新进程，专门来运行Typescript类型检查。这么做的原因是为了利用多核资源来提升编译的速度
    new ForkTsCheckerWebpackPlugin(),
    new CaseSensitivePathsWebpackPlugin(),
    ...SpritesmithPlugin
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
    alias: {
      '@': resolve('src')
    }
  }
}

export default config
