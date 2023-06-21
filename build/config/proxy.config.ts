import { getNodeEnvVar } from '../lib/util/shared'
import { AppMap } from './app.config'
/**
 * 开发模式时本地的代理配置
 */
export default {
  ...(() => {
    switch (getNodeEnvVar('NODE_VIEW')) {
      case AppMap.TL.NODE_VIEW:
        return ['/api'].reduce((pre, cur) => {
          pre[cur] = {
            target: {
              [AppMap.TL.NODE_SERVICE.test]: 'https://test-tl.cg6.co/',
              [AppMap.TL.NODE_SERVICE.try]: 'https://tl.cg7.co/',
              [AppMap.TL.NODE_SERVICE.prod]: 'https://www.tl.com/'
            }[getNodeEnvVar('NODE_SERVICE') || AppMap.TL.NODE_SERVICE.prod],
            changeOrigin: true
          }
          return pre
        }, {})
      default:
        break
    }
  })()
}
