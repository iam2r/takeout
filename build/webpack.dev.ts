import { Configuration, WebpackOptionsNormalized } from 'webpack'
import path from 'path'
import { formatter, transformer } from './lib/util/log'
import { getPortPromise } from 'portfinder'
import { getServerUrls } from './lib/util/log'
import { merge } from 'webpack-merge'
import FriendlyErrorsWebpackPlugin from '@soda/friendly-errors-webpack-plugin'
import baseWebpackConfig from './webpack.base'
import openInEditor from 'launch-editor-middleware'
import proxy from './config/proxy.config'
import { getViewWebpackConfig } from './lib/util/shared'
interface DevServerConfiguration extends Configuration {
  devServer?: WebpackOptionsNormalized['devServer']
}

const config = async (): Promise<DevServerConfiguration> => {
  const host = process.env.HOST || '0.0.0.0'
  const port = await getPortPromise({ port: Number(process.env.PORT) || 8080 })

  const configBase = merge<DevServerConfiguration>(baseWebpackConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    cache: {
      type: 'filesystem'
    },
    devServer: {
      allowedHosts: 'all',
      open: {
        target: [`http://localhost:${port}/`]
      },
      client: {
        overlay: { warnings: false, errors: true }
      },
      static: {
        directory: path.resolve(__dirname, '../dist')
      },
      devMiddleware: {
        stats: 'errors-only'
      },
      host,
      port,
      hot: true,
      historyApiFallback: {
        rewrites: [{ from: /./, to: '/index.html' }]
      },
      proxy,
      onBeforeSetupMiddleware({ app }) {
        app.use('/__open-in-editor', openInEditor())
      }
    },
    plugins: [
      // friendly error plugin displays very confusing errors when webpack
      // fails to resolve a loader, so we provide custom handlers to improve it
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [getServerUrls(host, port)],
          additionalTransformers: [transformer],
          additionalFormatters: [formatter]
        }
      })
    ]
  })
  return merge(configBase, getViewWebpackConfig(configBase))
}

export default config
