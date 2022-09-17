import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './index.scss'

// 使用全量导出
// @ts-ignore
import CaiUi from '../build/'

const app = createApp(App)

app.use(CaiUi)

app.mount('#app')
