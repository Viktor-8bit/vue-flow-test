import './assets/main.css'

import { useRoute, useRouter } from 'vue-router'
import { createApp } from 'vue'
import App from './App.vue'
import ui from '@nuxt/ui/vue-plugin'

import { createPinia } from 'pinia'

const router = useRouter()

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(ui)

app.mount('#app')
