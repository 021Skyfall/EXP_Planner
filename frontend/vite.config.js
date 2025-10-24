import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    proxy: {
      // '/exp'로 시작하는 요청만 8080 서버로 프록시합니다.
      // 뒤에 슬래시(/)를 붙여서 더 명확하게 할 수도 있습니다.
      '/exp/': { 
        target: 'http://localhost:8080',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/exp/, ''), // 필요한 경우 경로 재작성도 고려
      }
    }
    // 중요한 설정: 모든 알 수 없는 경로를 index.html로 폴백하도록 명시적으로 설정
    // historyApiFallback: true, // Vite에서는 기본적으로 처리되지만, 명시해두는 것이 좋습니다.
  }
})
