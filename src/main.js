import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router/router'
import vant from 'vant'

let app = createApp(App)
app.use(store).use(router).use(vant)
app.mount('#app')
