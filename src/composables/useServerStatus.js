import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useServerStatus() {
  const online = ref(false)
  const userCount = ref(0)
  const latency = ref(0)
  const users = ref([])
  const loading = ref(true)
  const hasError = ref(false)

  async function fetchStatus() {
    try {
      const res = await fetch('https://shutterwingphotos.cn/api/mcstatus')
      if (!res.ok) throw new Error('HTTP ' + res.status)
      const data = await res.json()
      online.value = !!data.online
      userCount.value = data.user_count ?? 0
      latency.value = Number(data.latency) || 0
      users.value = Array.isArray(data.users) ? data.users : []
      hasError.value = false
    } catch {
      hasError.value = true
      online.value = false
    } finally {
      loading.value = false
    }
  }

  const latencyClass = computed(() => {
    if (loading.value || hasError.value) return ''
    if (latency.value < 110) return 'lat-green'
    if (latency.value < 250) return 'lat-yellow'
    return 'lat-red'
  })

  let interval
  onMounted(() => {
    fetchStatus()
    interval = setInterval(fetchStatus, 30000)
  })
  onUnmounted(() => clearInterval(interval))

  return { online, userCount, latency, users, loading, hasError, latencyClass, fetchStatus }
}
