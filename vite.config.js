import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'

export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            imports: ['vue', 'vue-router'],
        }),
        Components({
            resolvers: [VantResolver()],
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    server: {
        host: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000',
                changeOrigin: true
            }
        }
    }
})