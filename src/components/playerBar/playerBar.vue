<template>
  <div class="foot">
    <div class="player-mini">
      <div class="mini-content">
        <audio :src="audio.location" @timeupdate="updateTime" @canplay="canPlaySong" @error="loadError" @ended="next" id="audioPlay" />
        <div class="cover" @click="showDetail">
          <van-progress v-show="loading" :percentage="30"/>
          <img class="xmplogo" :src="audio.albumPic" v-show="!loading" :alt="audio.name">
        </div>
        <div class="info">
          <div class="name xmpname">{{audio.name}}</div>
          <div class="artist xmpartist">{{audio.singer}}</div>
        </div>
        <div class="control">
          <van-button class="mini-btn player-list" @click="showList"/>
          <van-button class="mini-btn player" :class="{pause: playing}" @click="toggleStatus"/>
          <van-button class="mini-btn next" @click="next"/>
        </div>
        <div class="pro">
          <div class="pro-load proload" :style="{'-webkit-transform':'translateX(' + prBufferedTime +'%)' }"></div>
          <div class="pro-play proplay" :style="{'-webkit-transform':'translateX(' + prCurrentTime +'%)' }"></div> 
        </div>
      </div>
    </div>
    <BottomSheet ref="bottomSheet"></BottomSheet>
  </div>
</template>
<script>
import { mapMutations, mapState, mapGetters } from 'vuex'
import BottomSheet from './songLists.vue'
export default {
  data () {
    return {
      loadedTime: 0,
      playerTime: 0
    }
  },
  components: {
    BottomSheet
  },
  methods: {
    showDetail () {
      this.$router.push({name: 'playerDetail', params: {id: this.audio.id}})
      this.$store.commit('toggleDetail')
    },
    showList () {
      this.$refs.bottomSheet.show()
    },
    ...mapMutations([
      'play',
      'pause',
      'playNext'
    ]),
    canPlaySong () {
      this.$store.commit('closeLoading')
      this.$store.commit('play')
      document.getElementById('audioPlay').play()
    },
    toggleStatus () {
      if (this.playing) {
        document.getElementById('audioPlay').pause()
        this.$store.commit('pause')
      } else {
        document.getElementById('audioPlay').play()
        this.$store.commit('play')
      }
    },
    // ??????????????????
    loadError () {
      // ???????????????????????????????????????????????????????????????????????????src????????????
      if (document.getElementById('audioPlay').currentSrc) {
        // this.$refs.toast.show('????????????????????????')
        this.loading = false
        this.$store.commit('closeLoading')
        // ?????????playbar????????? TODO
      } else {
        console.log('APP ?????????????????????')
      }
    },
    next () {
      this.toggleStatus()
      this.$store.commit('playNext')
    },
    // ?????????????????????
    updateTime () {
      var vm = this
      var myaudio = document.getElementById('audioPlay')
      var time = parseInt(myaudio.currentTime)
      // ???????????????????????????????????????????????????
      // Failed to execute 'end' on 'TimeRanges':
      // ???onprogress ????????? onsuspend??????????????????http://www.cnblogs.com/tianma3798/p/6038908.html
      myaudio.onsuspend = function () {
        var timeRange = myaudio.buffered
        if (timeRange.length > 0 && myaudio.duration > 0) {
          vm.$store.commit('updateBufferedTime', parseInt(myaudio.buffered.end(0)))
        }
      }
      vm.$store.commit('updateDurationTime', parseInt(myaudio.duration))
      if (this.change) {
        myaudio.currentTime = this.tmpCurrentTime
        this.$store.commit('setChange', false)
      } else {
        this.$store.commit('updateCurrentTime', time)
      }
    }
  },
  computed: {
    ...mapState([
      'audio',
      'change',
      'playing',
      'loading',
      'currentTime',
      'tmpCurrentTime'
    ]),
    ...mapGetters([
      'prBufferedTime',
      'prCurrentTime'
    ])
  }
}
</script>
<style lang="less" scopoed>
  @import "../../assets/theme.less";
  .foot {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 998;
  }
  .player-mini {
    width: 100%;
    height: 1.5rem;
    position: relative;
    background-color: rgba(255,255,255,.9);
    color: #333333;
  }
  .player-mini .mini-content .cover {
    width: 1.25rem;
    height: 1.25rem;
    overflow: hidden;
    float: left;
    padding-left: 0.125rem;
    padding-top: 0.125rem;
    background: ur('../../static/player-bar.png') no-repeat;
    background-size: cover;
  }
  .player-mini .mini-content .cover img {
    width: 100%;
    height: 100%;
  }
  .player-mini .mini-content .info {
    overflow: hidden;
    position: relative;
    width: 4rem;
    float: left;
    padding-top: 0.125rem;
    padding-left: .19rem;
  }
  .player-mini .mini-content .info .name {
    font-size: .45rem;
    line-height: .65rem;
  }
  .player-mini .mini-content .info .name, .player-mini .mini-content .info .artist {
    overflow: hidden;
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .player-mini .mini-content .info .artist {
    color: #8a8a8a;
    font-size: .4rem;
  }
  .player-mini .mini-content .info .name, .player-mini .mini-content .info .artist {
    overflow: hidden;
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  /*??????*/
  .control {
    float: right;
  }
  .control .mini-btn {
    width: 1.25rem;
    height: 1.25rem;
  }
  .player-mini .mini-content .info .control {
    position: absolute;
    height: 100%;
    top: 50%;
    margin-top: -.65rem;
    right: 0;
  }

  /*????????????*/
  .control .player-list {
    background: url("../../static/playbar_btn_playlist.png") no-repeat !important;
    background-size: cover !important;
    border: none;
  }
  .control .player {
    background: url("../../static/playbar_btn_play.png") no-repeat !important;
    background-size: cover !important;
    border: none;
  }
  .control .pause {
    background: url("../../static/playbar_btn_pause.png") no-repeat !important;
    background-size: cover !important;
    border: none;
  }
  .control .next {
    background: url("../../static/playbar_btn_next.png") no-repeat !important;
    background-size: cover !important;
    border: none;
  }


  /*?????????*/
  .player-mini .mini-content .pro {
    width: 100%;
    height: .065rem;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: rgba(255,255,255,.5);
  }
  .player-mini .mini-content .pro-load, .player-mini .mini-content .pro-play {
    width: 100%;
    height: .065rem;
    position: absolute;
    left: -100%;
  }
  .player-mini .mini-content .pro-load {
    background-color: rgba(220, 217, 217, 0.4);
  }
  .player-mini .mini-content .pro-play {
    background-color:  @primaryColor;
  }
  .songlist {
    height: 260px;
    overflow: auto;
  }
  .songlist-title {
    position: fixed;
    background: #fff;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgba(0,0,0,.12);
    text-align: center;
  }
</style>
