import { createApp } from 'vue'

import App from './app.vue'
import { router } from './app.router'
import { store } from './app.store'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#vue-root')
