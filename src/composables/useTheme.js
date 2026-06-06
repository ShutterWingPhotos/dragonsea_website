import { ref } from 'vue'

export const THEMES = [
  {
    id: 'brutalist',
    name: 'Blocky Brutalist',
    desc: 'The original — terminal grid, raw contrast',
    swatches: ['#0D0D0D', '#5CFF8A', '#FF5C5C', '#181818'],
  },
  {
    id: 'metro',
    name: 'Metro Map',
    desc: 'Urban transit — color-coded lines, clean paper',
    swatches: ['#FAFAF8', '#D22B2B', '#1A56DB', '#1A1A1A'],
  },
  {
    id: 'fids',
    name: 'FIDS Board',
    desc: 'Airport departure display — amber on dark',
    swatches: ['#0D1117', '#F5A100', '#00C853', '#161B22'],
  },
  {
    id: 'survey',
    name: 'Urban Survey',
    desc: 'City planning blueprint — warm paper, Prussian blue',
    swatches: ['#F5F1E8', '#1B3A6B', '#E8621A', '#EDE8D8'],
  },
]

const DEFAULT = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_THEME) || 'brutalist'
const theme = ref(
  (typeof localStorage !== 'undefined' && localStorage.getItem('ds-theme')) || DEFAULT
)

export function useTheme() {
  function setTheme(id) {
    theme.value = id
    document.documentElement.setAttribute('data-theme', id)
    localStorage.setItem('ds-theme', id)
  }

  function previewTheme(id) {
    document.documentElement.setAttribute('data-theme', id)
  }

  function clearPreview() {
    document.documentElement.setAttribute('data-theme', theme.value)
  }

  return { theme, themes: THEMES, setTheme, previewTheme, clearPreview }
}
