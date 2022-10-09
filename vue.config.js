const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/music',
  outputDir: '../aigouzz.github.io/music',
  chainWebpack: (config) => {
    // console.log(config.resolve)
  }
})
