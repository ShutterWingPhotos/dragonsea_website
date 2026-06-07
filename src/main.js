import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import i18n from './i18n.js'
import './style.css'
import './themes/theme-survey.css'

// Apply saved light/dark mode preference
const savedMode = localStorage.getItem('ds-mode') || 'light'
document.documentElement.setAttribute('data-mode', savedMode)

createApp(App).use(router).use(i18n).mount('#app')
