//引入的是一个名为createApp的工厂函数
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from './plugs/axios'
import store from './store'
import directives from "./directives/shake"
import mitt from 'mitt'

import ElementUI from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
// 自定义指令
directives(app)

let BASE_API_URL="http://121.199.17.114:8089/"//服务器ip地址
app.config.globalProperties.$http = axios
app.config.globalProperties.BASE_API_URL=BASE_API_URL
// vue3的全局总线
app.config.globalProperties.bus = new mitt()

app.use(router).use(store).use(ElementUI).mount('#app')







