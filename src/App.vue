<template>
  <div>
    <RouterView v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </RouterView>
    <Player v-show="showBar"></Player>
  </div>
</template>
<script>
  import Player from './components/playerBar/playerBar.vue'
  import { mapState } from 'vuex'
  import { RouterView } from 'vue-router'
  export default {
    data () {
      return {}
    },
    components: {
      Player,
      RouterView
    },
    created () {
      this.$store.dispatch('getSong', 386538)  // 知足 - 五月天
    },
    computed: {
      ...mapState([
        'showBar',
        'audio'
      ])
    }
  }
</script>
