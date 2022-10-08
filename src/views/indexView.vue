<template>
    <div>
      <div class="fixed-bar">
      <van-nav-bar>
        <template #left>
          <RouterLink class="banner-logo" to="/index/home"></RouterLink>
        </template>
        <template #right>
          <RouterLink class="banner-search" to="/search">
            <van-icon name="search"></van-icon>
          </RouterLink>
        </template>
      </van-nav-bar>
      <van-tabs :value="activeTab" @change="handleTabChange" class="view-tabs">
        <van-tab name="homeView" title="时下流行"/>
        <van-tab name="songList" title="歌单"/>
        <van-tab name="leaderBoard" title="排行榜"/>
        <van-tab name="hotSinger" title="热门歌手"/>
      </van-tabs>
      </div>
      <div class="default-view" :class="{view: songList.length > 0}">
        <RouterView v-slot="{ Component }">
          <keep-alive>
            <component :is="Component"></component>
          </keep-alive>
        </RouterView>
      </div>
    </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { RouterLink, RouterView } from 'vue-router'
  export default {
    components: {
      RouterLink,
      RouterView
    },
    data () {
      return {
        activeTab: 'homeView'
      }
    },
    created () {
      // 当created函数时监测路由信息,防止页面刷新tab高亮错误
      var tmpArr = this.$route.path.split('/')
      if (tmpArr[1] === 'index') {
        this.handleTabChange(tmpArr[2])
      }
    },
    // watch函数监测路由的变化,保持tab面板的高亮位置正确
    watch: {
      '$route' (to) {
        const path = to.path
        var tmpArr = path.split('/')
        if (tmpArr[1] === 'index') {
          this.handleTabChange(tmpArr[2])
        }
      }
    },
    methods: {
      handleTabChange (val) {
        this.activeTab = val
        this.$router.push({ path: '/index/' + val })
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
  @import "../assets/theme.less";
  .banner-logo {
    width: 150px;
    height: 48px;
    background: url("../static/logo.png") no-repeat;
    background-size: 150px 48px;
    display: block;
    float: left;
  }
  .banner-search{
    display: block;
    float: right;
    height: 100%;
    color: white;
  }
  .view-tabs {
    background-color: #fff;
    color: rgba(0,0,0,.87);
    >.mu-tab-link {
      color: rgba(102,102,102,1);
    }
    >.mu-tab-active{
      color: @primaryColor;
    }
  }

  .fixed-bar {
    position: fixed;
    width: 100%;
    top:0;
    left: 0;
    z-index: 15;
  }
  .default-view {
    margin-top: 104px;
  }
  .view {
    margin-bottom: 2.3rem;
  }
</style>
