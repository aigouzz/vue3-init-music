<template>
    <div class="playList" :class="{view: songList.length > 0}">
        <div class="fixed-title">
            <van-nav-bar>
            <template #left>
              <van-icon name='arrow-left' size=".6rem" @click="back"/>
            </template>
            <template #title>
              <div class="play-title">
                <div class="play-name"><span>{{fname}}</span></div>
              </div>
            </template>
          </van-nav-bar>
        </div>
        <div class="playlist-info">
            <div class="info-wrapper">
                <div class="info-gallery">
                    <span>{{formatCount(playCount)}}</span>
                    <img :src="creator.backgroundUrl" alt="">
                </div>
                <div class="info-title">
                    <p class="titile">{{name}}</p>
                    <p class="author" v-if="creator.avatarUrl">
                      <img :src="creator.avatarUrl" />
                      <span>{{creator.nickname}}</span>
                    </p>
                </div>
            </div>
            <div class="bg-mask"></div>
            <div class="bg-player" id="backImg" :style="{'background-image':'url(' + coverImgUrl + '?param=300y300)'}" ></div>
        </div>
        <div class="playlist-holder">
          <div class="add-all">
            <van-icon name="add-o" size=".5rem"></van-icon>
            <van-button class="demo-flat-button" icon="add_circle_outline" @click="playAll">播放全部</van-button>
          </div>
          <div>
          <van-list :loading="isloading" :finished="finished" finishedText="没有更多了" @load="loadMore">
              <van-cell v-for="(item, index) in list" :key="item.id" @click="playAudio(item)">
                  <span class="list-left">{{index + 1}}</span>
                  <span class="list-right">{{item.name}} - {{item.ar ? item.ar[0].name : ''}}</span>
              </van-cell>
          </van-list>
        </div>
      </div>
    </div>
</template>
<script>
import api from '../api'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      coverImgUrl: require('../static/default_cover.png'),
      name: '歌单标题',
      id: 0,
      fname: '歌单',
      playCount: 0,
      description: '描述描述',
      creator: {
        'avatarUrl': require('../static/user-default.png'),
        'nickname': '昵称',
        backgroundUrl: require('../static/default_cover.png')
      },
      list: [],
      value: 0,
      isloading: false,
      finished: false
    }
  },
  created() {
    this.offset = 0
    this.ids = ''
  },
  // 解除keep-alive的缓存
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      // 根据传过来的ID是否一样，判断加载
      if (parseInt(to.params.id) !== parseInt(vm.id)) {
        vm.offset = 0
        vm.ids = ''
        vm.list = []
        vm.finished = false
        vm.getData()
      }
      // 判断过来的路由是否带有对应的参数信息
      if (to.params.coverImg) {
         // 获取songList传入的数据
        vm.coverImgUrl = vm.$route.params.coverImg
        vm.name = vm.$route.params.name
        vm.description = vm.$route.params.desc
        vm.playCount = vm.$route.params.count
        vm.creator = vm.$route.params.creator
        vm.id = vm.$route.params.id
      }
      window.onscroll = () => {
        var opa = window.pageYOffset / 150
        if (opa > 0.5) {
          vm.fname = vm.name
        } else {
          vm.fname = '歌单'
        }
      }
    })
  },
  // 路由离开时清除onscroll事件
  beforeRouteLeave: (to, from, next) => {
    window.onscroll = null
    next()
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    getData () {
      api.getPlayListDetail(this.$route.params.id).then((data) => {
        this.coverImgUrl = data.playlist.coverImgUrl
        this.playCount = data.playlist.playCount
        this.name = data.playlist.name
        this.creator = {
          avatarUrl: data.playlist.creator.avatarUrl,
          nickname: data.playlist.creator.nickname,
          backgroundUrl: data.playlist.creator.backgroundUrl,
        }
        data.playlist.trackIds.forEach((item, index) => {
          if (index === 0 && !this.ids) {
            this.ids += `${item.id}`
          } else {
            this.ids += `,${item.id}`
          }
        })
      })
      this.loadMore()
    },
    loadMore() {
      this.isloading = true
      api.getPlayListAll({id: this.$route.params.id, offset: this.offset, limit: 10}).then(data => {
        this.list.push(...data.songs)
        this.offset += 10
        if(this.offset >= this.ids.split(',').length) {
          this.finished = true
        }
        this.isloading = false
      }).catch((error) => {
        console.log('获取歌单信息出错:' + error)
      })
    },
    change (val) {
      this.value = val
    },
    playAudio (song) {
      document.getElementById('audioPlay').pause()
      this.$store.commit('pause')
      this.$store.dispatch('getSong', song.id)
    },
    // 播放全部
    playAll () {
      // 添加专辑内所有歌曲到一个新数组
      this.$store.dispatch('getSong', this.ids)
    },
    formatCount (v) {
      if (v < 9999) {
        return v
      } else {
        return (v / 10000).toFixed(0) + '万'
      }
    }
  },
  computed: {
    ...mapGetters([
      'songList'
    ])
  }
}
</script>

<style lang="less" scoped>
    .fixed-title {
        position: fixed;
        top: 0;
        width: 100%;
        height: 56px;
        left: 0;
        z-index: 15;
        transition: opacity .1s;
    }
    .play-name{
      color: #fff;
    }

     // 修改默认的bar样式
    .mu-appbar {
      background-color: transparent;
    }
    .bar-line {
      display: block;
      bottom: 0 ;
      left: 0;
      display: block;
      width: 100%;
      height: 0.05rem;
      background: radial-gradient(#d3d3d3 -90%, transparent 100%);
    }
    .mu-paper-1 {
      box-shadow: none;
      > .mu-appbar-title {
        text-align: center;
        font-size: 14px;
      }
    }
    // 歌单信息
    .playlist-info {
        position: relative;
        padding: 60px .5rem 0 ;
        height: 6rem;
    }

    .info-wrapper {
        position: relative;
        z-index: 10;
        color: #fff;
        .info-gallery {
            position: relative;
            float: left;
            width: 4rem;
            overflow: hidden;
            span {
                position: absolute;
                display: block;
                padding-right: 5px;
                width: 100%;
                left: 0;
                top: 0;
                font-size: 12px;
                text-align: right;
                background: rgba(0,0,0,.35);
                z-index: 11;
            }
            img {
                max-width: 100%;
                height: auto;
            }
        }

        .info-title {
            float: left;
            width: 4rem;
            margin-left: .625rem;
            .title {
                font-size: 16px;
                word-wrap: wrapper;
            }
            .author {
                span {
                    overflow: hidden;
                    display: inline-block;
                    height: 30px;
                    text-overflow: ellipsis;
                    width: 3.4rem;
                    white-space: nowrap;
                    font-size: 14px;
                    vertical-align: top;
                    line-height: 30px;
                }
                img{
                  width: 1rem;
                }
            }
        }
    }

    .playlist-holder {
      position: relative;
      background: #fff;
      z-index: 3;
      padding-bottom: 1.4rem;
      .add-all {
          padding-left: .4rem;
          width: 3rem;
          i{
            vertical-align: middle;
          }
          button{
            padding-left: 0;
          }
      }
    }

    // 列表样式
    .list-left {
      padding-left: 10px;
      font-size: 14px;
      font-weight: bolder;
      display: inline-block;
      vertical-align: middle;
    }
    .list-right{
      margin-left: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: inline-block;
      max-width: 8rem;
      vertical-align: middle;
    }
    .bg-player {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: bottom right;
        filter: blur(40px);
        -webkit-filter: blur(40px);
        z-index: 1;
    }
    .bg-mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #292a2b;
        background-color: rgba(0,0,0,.35);
        z-index: 2;
    }
    .center {
      display: block !important;
      margin: 10% auto 0;
    }
    .view {
      width:100%;
      margin-bottom:2.3rem;
    }
    .mu-item-title {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: 1.5;
    }
    .demo-flat-button{
      border: none;
      &::before{
        border: none;
      }
    }
</style>
