import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.config.errorHandler = (err, vm, info) => {
    console.error('全局错误:', err, info)
}

app.use(router).mount('#app')
