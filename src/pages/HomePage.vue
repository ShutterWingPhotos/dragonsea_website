<template>
  <component :is="page" />
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme.js'
import HomeBrutalist from './themes/HomeBrutalist.vue'
import HomeMetro     from './themes/HomeMetro.vue'
import HomeFids      from './themes/HomeFids.vue'
import HomeSurvey    from './themes/HomeSurvey.vue'

const { theme } = useTheme()
const pages = { brutalist: HomeBrutalist, metro: HomeMetro, fids: HomeFids, survey: HomeSurvey }
const page = computed(() => pages[theme.value] ?? HomeBrutalist)
</script>
