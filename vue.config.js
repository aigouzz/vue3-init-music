const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const SkeletonPlugin = require('vue-skeleton-webpack-plugin')
// const MultiEntryPlugin = require('webpack')
// console.log(typeof SkeletonPlugin)

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/music',
  outputDir: '../aigouzz.github.io/music',
  configureWebpack: {
    plugins: [
      // new SkeletonPlugin({
      //   webpackConfig: {
      //     entry: {
      //       app: path.resolve(__dirname, './src/Skeleton.js')
      //     }
      //   },
      //   minimize: true,
      //   quiet: true,
      //   router: {
      //     mode: 'history',
      //     routes: [
      //       {
      //         path: '/index/homeView',
      //         skeletonId: 'homeSkeleton',
      //       },
      //       {
      //         path: '/index/songList',
      //         skeletonId: 'listSkeleton',
      //       },
      //       {
      //         path: '/index/leaderBoard',
      //         skeletonId: 'leaderSkeleton',
      //       },
      //       {
      //         path: '/index/hotSinger',
      //         skeletonId: 'hotSkeleton',
      //       },
      //     ]
      //   }
      // })
    ],
  },
  chainWebpack: (config) => {
    // console.log(config)
    if(process.env.NODE_ENV === 'production') {
      // console.log(typeof config.plugins)
      config.plugin('WebpackBundleAnalyzer').use(WebpackBundleAnalyzer)
    } else if(process.env.NODE_ENV === 'developement') {
      config.devServer.open = true
      config.devServer.hot = true
    }
    return config
  }
})
