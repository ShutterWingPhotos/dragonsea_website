<template>
  <component :is="page" />
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme.js'
import AboutBrutalist from './themes/AboutBrutalist.vue'
import AboutMetro     from './themes/AboutMetro.vue'
import AboutFids      from './themes/AboutFids.vue'
import AboutSurvey    from './themes/AboutSurvey.vue'

const { theme } = useTheme()
const pages = { brutalist: AboutBrutalist, metro: AboutMetro, fids: AboutFids, survey: AboutSurvey }
const page = computed(() => pages[theme.value] ?? AboutBrutalist)
</script>
