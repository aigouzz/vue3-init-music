/**
 * 整个app的路由设置
 */
import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/index',
      component: require('../views/indexView.vue'),
      children: [
        {
          path: 'home',
          component: require('../views/homeView.vue')
        },
        {
          path: 'songList',
          component: require('../views/songList.vue')
        },
        {
          path: 'leaderBoard',
          component: require('../views/leaderBoard.vue')
        },
        {
          path: 'hotSinger',
          component: require('../views/hotSinger.vue')
        }
      ]
    },
    {
      name: 'playerDetail',
      path: '/playerDetail/:id',
      component: require('../views/playerDetail.vue')
    },
    {
      path: '/playListDetail/:id',
      name: 'playListDetail',
      component: require('../views/playListDetail.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: require('../views/searchView.vue')
    },
    {
      path: '/:w+',
      name: 'all',
      redirect: '/index/homeView.vue'
    }]
})

export default router
