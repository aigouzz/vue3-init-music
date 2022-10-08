<template>
    <div>
      <Loading :isloading="isloading"></Loading>
      <div class="container" v-show="!isloading">
      <div id="slider">
        <Swiper :pagination="{clickable: true}" :modules="modules">
          <Swiper-slide v-for="item in bannerList" :key="item.imageUrl"><img :src="item.imageUrl" class="banner-item"  alt=""></Swiper-slide>
          <div class="swiper-pagination"></div>
        </Swiper>
      </div>
      <div class="wrapper">
      <div class="g-title song-list">推荐歌单 <router-link :to="{path: '/index/songList'}">更多></router-link></div>
      <van-list class="box">
        <van-cell class="item" :key="item.id" v-for="item in playList">
          <router-link :to="{name: 'playListDetail',params: { id: item.id, name: item.name, coverImg: item.picUrl, creator: item.copywriter, count: item.playCount, desc: item.description }}">
            <div class="bar">{{formatCount(item.playCount)}}</div>
            <img class="item-img img-response" :src="item.picUrl" lazy="loading">
            <span class="item-name">{{item.name}}</span>
          </router-link>
        </van-cell>
      </van-list>
      <div class="g-title mv">推荐MV <router-link :to="{}">更多></router-link></div>
      <van-list wrap="wrap" justify="space-between" class="box" :gutter="0">
        <van-cell basis="48%" class="mv-item" v-for="item in mvList" :key="item.artistId">
          <div class="mv-img">
            <img class="img-response" :src="item.picUrl" />
          </div>
          <div class="mv-name">{{item.name}}</div>
          <div class="mv-author">{{item.artistName}}</div>
        </van-cell>
      </van-list>
    </div>
  </div>
</div>
</template>
<script>
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import api from '../api'
import Loading from '../components/common/commonLoading.vue'
export default {
  data () {
    return {
      modules: [Pagination],
      isloading: true,
      bannerList: [],
      playList: [],
      mvList: []
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    Loading
  },
  created () {
    this.loadData()
  },
  methods: {
    /**
     * 加载所有数据
     * @author javaSwing
     */
    loadData () {
      let personSongList = api.getPersonalized()
      let bannerList = api.getBannerList()
      let personMVList = api.getPersonalizedMV()
      Promise.all([personSongList, bannerList, personMVList]).then(data => {
        this.playList = data[0].result.length > 6 && data[0].result.slice(0, 6)
        this.bannerList = data[1].banners
        this.mvList = data[2].result.length > 6 ? data[2].result.slice(0, 6) : data[2].result
        this.isloading = false
      }).catch((err) => {
        this.$toast(err, {
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
      })
    },
    formatCount (v) {
      if (v < 9999) {
        return v
      } else {
        return (v / 10000).toFixed(0) + '万'
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .img-response {
    max-width: 100%;
    height: auto;
  }
  .wrapper {
    padding: 0 5px;
  }
  // 通用的标题样式
  .g-title {
    padding-left: 25px;
    color: #333;
    height: 35px;
    line-height: 35px;
    font-size: 16px;
    a {
      float: right;
      font-size: 12px;
      color: #666;
    }
  }
  // banner样式
  .banner-item {
    width: 100%;
    height: 4.8rem;
    background: url('../static/banner-item-load.png') no-repeat;
    background-size: cover;
  }

  // 推荐歌单
  .song-list {
    background: url("../static/aei.png") no-repeat left center;
    background-size: 20px 20px;
  }
  .item {
    position: relative;
    margin: 0 5px 5px;
    padding: 0;
    width: 4.6rem;
    display: inline-block;
    a {
      color: rgba(0, 0, 0, 0.87);
      display: inline-block;
    }
    .bar {
      position: absolute;
      top: 0;
      right: 0;
      color: #fff;
      width: 100%;
      text-align: right;
      padding: 2px 5px;
      background-color: rgba(0,0,0,.2);
    }

    &-img {
      min-width: 3.1rem;
      min-height: 3.1rem;
      display: inline-block;
    }

    &-img[lazy=loading] {
      background: url('../static/default_cover.png') no-repeat;
      background-size: cover;
    }

    &-name {
      display: inline-block;
      overflow : hidden;
      font-size: 12px;
      height: 1.1rem;
      line-height: 0.55rem;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  .mv {
    background: url("../static/aee.png") no-repeat left center;
    background-size: 20px 20px;
    &-name {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    &-item {
      position: relative;
      width: 4.6rem;
      display: inline-block;
      margin: 0 5px 5px;
      padding: 0;
    }
    &-author {
      font-size: 12px;
      color: #666;
    }
  }
  .mv-img{
    width: 100%;
    height: 2.9rem;
    overflow: hidden;
    img{
      width: 100%;
    }
  }
  .mv-name {
    width: 100%;
    height: 21px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  @keyframes rotating {
      0%{
        transform: rotate(0deg);
      }
      100%{
        transform: rotate(360deg);
      }
  }
  .van-cell::after{
    border: none;
  }
</style>
