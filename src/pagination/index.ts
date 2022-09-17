import { App } from 'vue'
import Pagination from './src/pagination'
import { installComponent } from '../install'
import type { CaiUIOptions } from '../_utils/global-config'
// 具名导出
export { Pagination }
// 导出插件
export default {
  install(app: App, options?: CaiUIOptions) {
    installComponent(app, Pagination, options)
  }
}
