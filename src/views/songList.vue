<template>
    <div class="wrapper playList">
      <Loading :isloading="loading"></Loading>
      <div class="content" v-if="!loading">
        <div class="title">全部歌单 </div>
        <van-list v-model:loading="listLoading" :finished="finished" finished-text="没有更多了" class="box">
          <van-cell class="list-item" :key="item.id" v-for="item in playList">
            <router-link :to="{name: 'playListDetail',params: { id: item.id, name: item.name, coverImg: item.coverImgUrl, creator: item.creator, count: item.playCount, desc: item.description }}">
            <div class="list-bar">{{formatCount(item.playCount)}}</div>
            <img class="list-img img-response" :src="item.coverImgUrl + '?param=300y300'" lazy="loading">
            <div class="list-name">{{item.name}}</div>
            </router-link>
          </van-cell>
        </van-list>
      </div>
      <div class="list-last" ref="lastNode"></div>
    </div>
</template>
<script>
import api from '../api'
import Loading from '../components/common/commonLoading.vue'
export default {
  components: {
    Loading
  },
  data () {
    return {
      lastNode: null,
      playList: [],
      offset: 0,
      loading: false,
      listLoading: false,
      finished: false
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    this.lastNode = this.$refs.lastNode
    let observer = new IntersectionObserver((ioes) => {
      let ratio = ioes[0].intersectionRatio
      console.log(ratio)
      if(ratio > 0) {
        this.getData();
      }
    })
    observer.observe(this.lastNode)
  },
  methods: {
    getData () {
      this.offset === 0 ? (this.loading = true) : ''
      this.listLoading = true
      api.getPlayListByWhere(this.offset, 6).then((data) => {
        var total = data.total
        var list = (data.playlists)
        for (let i = 0; i < list.length; i++) {
          this.playList.push(list[i])
        }
        this.offset = this.offset + 6
        if (this.offset > total) this.offset = total
        this.loading = false
        this.listLoading = false
      })
    },
    loadMore () {
      console.log(this.offset)
      this.offset += 6
      this.getData()
    },
    formatCount (v) {
      if (v < 100000) {
        return v
      } else {
        return (v / 10000).toFixed(0) + '万'
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import "../assets/theme.less";
.img-response {
    max-width: 100%;
    height: auto;
}
.wrapper {
    padding:0 10px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}
.title {
    margin: .2rem 0 .3rem 0;
    padding-left: .2rem;
    border-left: .15rem solid @primaryColor;
}
.list {
    &-bar {
      position: absolute;
      top: 0;
      right: 0;
      color: #fff;
      width: 100%;
      text-align: right;
      padding: 2px 5px;
      background-color: rgba(0,0,0,.2);
    }
    &-item {
        position: relative;
        width: 4.5rem;
        display: inline-block;
        padding: 0;
        margin: 0 5px 5px;
        a {
          color:rgba(0,0,0,.87);
        }
    }
    &-img {
      width: 4.6rem;
      height: 4.6rem;
    }
    &-img[lazy=loading] {
      background: url('../static/default_cover.png') no-repeat;
      background-size: cover;
    }

    &-name {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &-last{
      height: 0.01rem
    }
}
</style>
