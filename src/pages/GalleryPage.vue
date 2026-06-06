<template>
  <component :is="page" />
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme.js'
import GalleryBrutalist from './themes/GalleryBrutalist.vue'
import GalleryMetro     from './themes/GalleryMetro.vue'
import GalleryFids      from './themes/GalleryFids.vue'
import GallerySurvey    from './themes/GallerySurvey.vue'

const { theme } = useTheme()
const pages = { brutalist: GalleryBrutalist, metro: GalleryMetro, fids: GalleryFids, survey: GallerySurvey }
const page = computed(() => pages[theme.value] ?? GalleryBrutalist)
</script>
