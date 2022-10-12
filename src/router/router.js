/**
 * 整个app路由设置
 */
import {createRouter, createWebHistory} from 'vue-router'
import IndexView from '../views/indexView'
import HomeView from '../views/homeView'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/index',
      component: IndexView,
      children: [
        {
          path: 'homeView',
          component: HomeView
        },
        {
          path: 'songList',
          component: () => import('../views/songList.vue')
        },
        {
          path: 'leaderBoard',
          component: () => import('../views/leaderBoard.vue')
        },
        {
          path: 'hotSinger',
          component: () => import('../views/hotSinger.vue')
        }
      ]
    },
    {
      name: 'playerDetail',
      path: '/playerDetail/:id',
      component: () => import('../views/playerDetail.vue')
    },
    {
      path: '/playListDetail/:id',
      name: 'playListDetail',
      component: () => import('../views/playListDetail.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/searchView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'all',
      redirect: '/index/homeView'
    }]
})

export default router
