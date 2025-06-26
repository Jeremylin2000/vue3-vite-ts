import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { fileURLToPath, URL } from 'node:url'
// import { resolve } from 'path'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
      // '@': resolve(__dirname, 'src')
    },
  },
  // server：代表是要做服务相关的配置
  server: {
    //proxy: 指的是要配置一些代理
    proxy: {
      //获取路径中包含了/api的请求，这里的'/api'是指：请求路径中，是否有带/api这部分的路径，如果有/api,就对其进行处理
      '/api': {

        target: 'http://127.0.0.1:3000/', //target：指的是，如果要更换源，要更换成谁，就写谁，这里写的是后台服务所在的源

        changeOrigin: true, //changeOrigin：指的是，是否要更换换源

        secure: false, // 如果目标服务器无 HTTPS，需关闭安全验证

        rewrite: (path) => path.replace(/^\/api/, ''), // rewrite：是路径的重写，这里把/api替换为''
      }
    }
  }
})
