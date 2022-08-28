//引入的是一个名为createApp的工厂函数
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from './plugs/axios'
import store from './store'


const app = createApp(App)

let BASE_API_URL="http://www.localhost:8089/"
app.config.globalProperties.$http = axios
app.config.globalProperties.BASE_API_URL=BASE_API_URL



app.use(router).use(store)
app.mount('#app')





