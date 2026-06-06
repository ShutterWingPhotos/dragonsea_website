import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import i18n from './i18n.js'
import './style.css'
import './themes/theme-metro.css'
import './themes/theme-fids.css'
import './themes/theme-survey.css'

// Apply theme from env (dev mode) or localStorage (user preference)
const envTheme = import.meta.env.VITE_THEME
const savedTheme = localStorage.getItem('ds-theme')
const activeTheme = envTheme || savedTheme || 'brutalist'
document.documentElement.setAttribute('data-theme', activeTheme)
if (envTheme) localStorage.setItem('ds-theme', envTheme)

createApp(App).use(router).use(i18n).mount('#app')
