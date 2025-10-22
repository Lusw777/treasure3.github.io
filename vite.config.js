import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  // 关键：添加 base 配置，路径必须与仓库名一致（包含前后斜杠）
  base: '/treasure3.github.io/',  // 仓库名是 treasure3.github.io，所以填这个路径
  build: {
    outDir: 'dist',  // 打包输出目录（保持不变）
    assetsDir: 'assets'  // 静态资源目录（保持不变）
  },
  server: {
    port: 8080,  // 本地开发端口（保持不变）
    open: true  // 启动时自动打开浏览器（保持不变）
  }
})