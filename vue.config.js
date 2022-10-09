const { defineConfig } = require('@vue/cli-service')
const path = require('path')
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
    // console.log(config.plugins)
  }
})
