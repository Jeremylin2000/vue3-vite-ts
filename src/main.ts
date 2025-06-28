import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import mydirective from './directive/mydirective'

const app = createApp(App)
// const directives = {
    
// }
app.directive('mydirective', mydirective)
app.config.errorHandler = (err, vm, info) => {
    console.error('全局错误:', err, vm, info)
}

app.use(router).mount('#app')
