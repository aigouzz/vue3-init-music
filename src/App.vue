<template>
  <ConfigProvider :theme-vars="themeVars">
    <router-view v-slot="{Component}">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
    <Player v-show="showBar"></Player>
  </ConfigProvider>
</template>
<script>
  import Player from './components/playerBar/playerBar.vue'
  import { mapState } from 'vuex'
  import { RouterView } from 'vue-router'
  import { ConfigProvider } from 'vant'
  export default {
    data () {
      return {
        themeVars: {
          rateIconFullColor: '#07c160',
          sliderBarHeight: '4px',
          sliderButtonWidth: '20px',
          sliderButtonHeight: '20px',
          sliderActiveBackgroundColor: '#07c160',
          buttonPrimaryBorderColor: '#07c160',
          buttonPrimaryBackgroundColor: '#07c160',
          navBarBackgroundColor: '#07c160',
          navBarIconColor: '#fff'
        }
      }
    },
    components: {
      Player,
      RouterView,
      ConfigProvider
    },
    created () {
      this.$store.dispatch('getSong', 386538)  // 知足 - 五月天
      console.log(this)
    },
    computed: {
      ...mapState([
        'showBar',
        'audio'
      ])
    }
  }
</script>
