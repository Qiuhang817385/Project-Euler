module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    // 按需加载vant
    ['import', {
      "libraryName": 'vant',
      "libraryDirectory": 'es',
      style: true
    }, 'vant'],
    // 按需加载antd
    ["import", {
      "libraryName": "ant-design-vue",
      "libraryDirectory": "es",
      "style": "css"
    }
    ]
  ]
}
