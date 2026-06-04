<template>
  <div class="app">
    <NavBar />
    <main class="app__main">
      <RouterView v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/Footer.vue'

const { t, locale } = useI18n()
watch(locale, () => { document.title = t('page-title') }, { immediate: true })
</script>

<style>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app__main {
  flex: 1;
  padding-top: var(--nav-h);
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.15s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
