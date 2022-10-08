import { createApp, h } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router/router'
import vant from 'vant'
import 'lib-flexible/flexible'
import 'vant/lib/index.css'
import './assets/common.css'

let app = createApp(App)
app.use(store).use(router).use(vant)
app.mount('#app')
