import { App } from 'vue'
import VirtualList from './src/virtualList'
import { installComponent } from '../install'
import type { CaiUIOptions } from '../_utils/global-config'
// 具名导出
export { VirtualList }
// 导出插件
export default {
  install(app: App, options?: CaiUIOptions) {
    installComponent(app, VirtualList, options)
  }
}
