<template>
  <div>
    <van-popup :show="bottomSheet" position="bottom" @close="closeBottomSheet ">
      <div class="title-wrapper">
        播放列表({{songList.length}})
      </div>
      <hr class="mu-divider"> 
      <div class="list-wrapper">
        <div class="list-item" v-for="(item, index) in songList" :class="{'on': item.id === audio.id}" :key="item.id">
          <div class="left" @click="play(index)">
            <span class="list-name">{{item.name}}</span> <span class="list-singer">&nbsp;-{{item.singer}}&nbsp;</span>
          </div>
          <span class="list-btn" @click="remove(index)">x</span>
          <hr class="mu-divider">
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'songLists',
  data () {
    return {
      bottomSheet: false
    }
  },
  methods: {
    closeBottomSheet () {
      this.bottomSheet = false
      if (document.querySelector('.playList')) {
        document.querySelector('.playList').style.position = 'static'
      }
    },
    show () {
      this.bottomSheet = true
      if (document.querySelector('.playList')) {
        document.querySelector('.playList').style.position = 'fixed'
      }
    },
    play (index) {
      this.$store.commit('setAudioIndex', index)
    },
    remove (index) {
      console.log(index)
      this.$store.commit('removeAudio', index)
    }
  },
  computed: {
    ...mapState([
      'songList',
      'audio'
    ])
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/theme.less";
.title-wrapper {
  font-size: 16px;
  height: 1.25rem;
  line-height: 1.25rem;
  color: rgba(0,0,0,.87);
  text-align: center;
  .right-btn {
    line-height: 1.28rem;
    font-size: 12px;
    color: #828080;
    float: right;
    padding-right: 10px;
  }
}
.list-wrapper {
  height: 6.5rem;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.list-item {
  padding: 0 10px;
  height: 1.25rem;
  line-height: 1.25rem;
  .left {
    max-width: 92%;
    float: left;
    height: 1.25rem;
    overflow: hidden;
  }
}
.list-name {
  float: left;
  max-width: 72%;
  height: 1.25rem;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.list-singer {
  color: #737171;
  font-size: 12px;
}
.list-btn {
  width: 32px;
  text-align: center;
  float: right;
  color: #737171;
}
.on {
  color: @primaryColor;
  .list-singer {
    color: @primaryColor;
  }
}
.mu-divider{
  display: block;
  height: 0;
  width: 100%;
  border-top: .5px solid #eee;
}

</style>

