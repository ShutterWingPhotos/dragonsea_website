import { ref } from 'vue'

const mode = ref(
  (typeof localStorage !== 'undefined' && localStorage.getItem('ds-mode')) || 'light'
)

export function useColorMode() {
  function setMode(id) {
    mode.value = id
    document.documentElement.setAttribute('data-mode', id)
    localStorage.setItem('ds-mode', id)
  }

  function toggleMode() {
    setMode(mode.value === 'dark' ? 'light' : 'dark')
  }

  return { mode, setMode, toggleMode }
}
