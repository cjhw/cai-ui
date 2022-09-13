import Theme from 'vitepress/theme'
import Test from '../../../src/components/Test'
import 'vitepress-theme-demoblock/theme/styles/index.css'
import '../../../src/index.scss'
import '../caiui-theme/styles/index.scss'
import { registerComponents } from './register-components'
import CaiUI from '../../../src/cai-ui'

export default {
  ...Theme,
  // 扩展应用程序实例
  enhanceApp({ app }) {
    // 注册组件
    app.component('Test', Test)
    registerComponents(app)
    app.use(CaiUI)
  }
}
