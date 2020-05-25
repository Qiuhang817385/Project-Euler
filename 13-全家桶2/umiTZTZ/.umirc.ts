import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // proxy: {
  //   '/api': {
  //     target: 'http://public-api-v1.aspirantzhang.com/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/api': '' },
  //   },
  // },
  // 如果没有 routes 配置，Umi 会进入约定式路由模式，
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
});
