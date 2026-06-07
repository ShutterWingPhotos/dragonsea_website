<template>
  <div class="fids-home">

    <!-- ═══ DEPARTURE BOARD HERO ═══ -->
    <section class="fids-hero">
      <div class="fids-board-wrap container">

        <!-- Board header -->
        <div class="fids-board-hdr">
          <span class="fids-board-hdr__airport">DRAGONSEA METROPOLITAN TERMINAL</span>
          <span class="fids-board-hdr__type">DEPARTURES / 出发</span>
          <span class="fids-board-hdr__clock">{{ clock }}</span>
        </div>

        <!-- Column labels -->
        <div class="fids-cols fids-cols--head">
          <span>DESTINATION</span>
          <span>STATUS</span>
          <span class="fids-col-gate">GATE / ADDR</span>
          <span class="fids-col-time">BOARDING</span>
        </div>

        <!-- Main server row — highlighted, with scramble animation -->
        <div class="fids-row fids-row--featured">
          <div class="fids-row__dest">
            <span class="fids-row__arrow">▶</span>
            <span class="fids-row__name">{{ scrambled }}</span>
            <span class="fids-row__sub">{{ locale === 'zh' ? '龙海市中心' : 'CENTRAL DISTRICT' }}</span>
          </div>
          <div class="fids-row__status">
            <span v-if="loading" class="fids-status fids-status--wait">CONNECTING</span>
            <span v-else-if="hasError" class="fids-status fids-status--delay">UNREACHABLE</span>
            <span v-else-if="online" class="fids-status fids-status--ok">BOARDING</span>
            <span v-else class="fids-status fids-status--delay">OFFLINE</span>
          </div>
          <div class="fids-row__gate fids-col-gate">
            59.110.15.64:25565
            <button class="fids-copy" @click="copyAddress">
              {{ copied ? t('copied') : 'COPY' }}
            </button>
          </div>
          <div class="fids-row__time fids-col-time" :title="onlineNamesTitle">
            <span v-if="!loading && !hasError">
              {{ userCount }}<span class="fids-dim">/128</span>
            </span>
            <span v-else>—</span>
            <span v-if="!hasError && users.length > 0" class="fids-row__names">{{ users.join(' · ') }}</span>
          </div>
        </div>

        <!-- Secondary rows -->
        <div class="fids-row fids-row--secondary" style="--row-delay:0.3s">
          <div class="fids-row__dest">
            <span class="fids-row__name fids-dim-name">MODPACK TERMINAL</span>
            <span class="fids-row__sub">{{ locale === 'zh' ? '必须下载' : 'REQUIRED DOWNLOAD' }}</span>
          </div>
          <div class="fids-row__status"><span class="fids-status fids-status--req">REQUIRED</span></div>
          <div class="fids-row__gate fids-col-gate">
            <a href="https://mcd.shutterwingphotos.cn/" target="_blank" class="fids-link">mcd.shutterwingphotos.cn ↗</a>
          </div>
          <div class="fids-row__time fids-col-time">FREE</div>
        </div>

        <div class="fids-row fids-row--secondary" style="--row-delay:0.55s">
          <div class="fids-row__dest">
            <span class="fids-row__name fids-dim-name">LIVE BLUEMAP</span>
            <span class="fids-row__sub">{{ locale === 'zh' ? 'BlueMap 3D 地图' : '3D WORLD VIEWER' }}</span>
          </div>
          <div class="fids-row__status"><span class="fids-status fids-status--ok">LIVE</span></div>
          <div class="fids-row__gate fids-col-gate">
            <a href="http://59.110.15.64:8100/" target="_blank" class="fids-link">PORT 8100 ↗</a>
          </div>
          <div class="fids-row__time fids-col-time">24H</div>
        </div>

        <div class="fids-row fids-row--secondary" style="--row-delay:0.8s">
          <div class="fids-row__dest">
            <span class="fids-row__name fids-dim-name">MTR TRANSIT MAP</span>
            <span class="fids-row__sub">{{ locale === 'zh' ? 'MTR 交通地图' : 'RAIL ROUTE GUIDE' }}</span>
          </div>
          <div class="fids-row__status"><span class="fids-status fids-status--ok">LIVE</span></div>
          <div class="fids-row__gate fids-col-gate">
            <a href="http://59.110.15.64:8888/" target="_blank" class="fids-link">PORT 8888 ↗</a>
          </div>
          <div class="fids-row__time fids-col-time">24H</div>
        </div>

      </div>
    </section>

    <!-- ═══ LIVE STATUS ═══ -->
    <section class="fids-section">
      <div class="container">
        <div class="fids-sec-hdr">
          <span class="fids-sec-label">SERVER TELEMETRY</span>
          <span class="fids-sec-live">
            <span class="fids-dot" :class="online ? 'fids-dot--on' : 'fids-dot--off'"></span>
            LIVE FEED
          </span>
        </div>

        <div v-if="loading" class="fids-loading">
          <span class="fids-dot fids-dot--on"></span> {{ t('loading') }}
        </div>

        <div v-else class="fids-telemetry">
          <div class="fids-tele-row">
            <span class="fids-tele-label">NETWORK STATUS</span>
            <span class="fids-tele-val" :class="hasError ? 'fids-val--bad' : (online ? 'fids-val--ok' : 'fids-val--bad')">
              {{ hasError ? t('error').toUpperCase() : (online ? 'NOMINAL' : 'OFFLINE') }}
            </span>
          </div>
          <div class="fids-tele-divider"></div>
          <div class="fids-tele-row">
            <span class="fids-tele-label">PASSENGERS IN TRANSIT</span>
            <span class="fids-tele-val">{{ hasError ? '—' : userCount }}<span class="fids-dim"> / 128 CAPACITY</span></span>
          </div>
          <div class="fids-tele-divider"></div>
          <div class="fids-tele-row">
            <span class="fids-tele-label">SIGNAL LATENCY</span>
            <span class="fids-tele-val" :class="latencyClass">{{ hasError ? '—' : latency }}<span class="fids-dim"> ms</span></span>
          </div>

          <div v-if="!hasError && users && users.length > 0" class="fids-manifest">
            <div class="fids-manifest-hdr">PASSENGER MANIFEST — CURRENTLY ONLINE</div>
            <div class="fids-manifest-list">
              <span class="fids-passenger" v-for="u in users" :key="u">{{ u }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ PHOTO ARCHIVE ═══ -->
    <section class="fids-section">
      <div class="container">
        <div class="fids-sec-hdr">
          <span class="fids-sec-label">SITE PHOTO ARCHIVE</span>
          <RouterLink to="/gallery" class="fids-sec-link">VIEW ALL RECORDS →</RouterLink>
        </div>
        <div class="fids-filmstrip">
          <RouterLink
            v-for="(item, i) in previewItems"
            :key="i"
            to="/gallery"
            class="fids-film-frame"
          >
            <div class="fids-film-img" :style="{ background: item.bg }">
              <div class="fids-film-hud">{{ item.label }}</div>
            </div>
            <div class="fids-film-meta">
              <span>REF-{{ String(i + 1).padStart(3, '0') }}</span>
              <span>OPEN ↗</span>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <Transition name="copy-toast">
      <div v-if="showCopyToast" class="copy-toast">
        <span class="copy-toast__icon">✓</span>
        {{ t('copy-success') }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useServerStatus } from '../../composables/useServerStatus.js'
import { copyText } from '../../composables/useClipboard.js'

const { t, locale } = useI18n()
const { online, userCount, latency, users, loading, hasError, latencyClass } = useServerStatus()

const onlineNamesTitle = computed(() =>
  !hasError.value && users.value.length > 0 ? users.value.join(', ') : ''
)

const copied = ref(false)
const showCopyToast = ref(false)
const clock = ref('')
const scrambled = ref('##########')
const SERVER_ADDRESS = '59.110.15.64:25565'

function copyAddress() {
  copyText(SERVER_ADDRESS).then(() => {
    copied.value = true
    showCopyToast.value = true
    setTimeout(() => { copied.value = false }, 2000)
    setTimeout(() => { showCopyToast.value = false }, 2400)
  })
}

// Clock
let clockInterval
function updateClock() {
  const now = new Date()
  clock.value = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

// Scramble animation for the title
const FINAL = 'DRAGONSEA'
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&'

function runScramble() {
  let iter = 0
  const interval = setInterval(() => {
    scrambled.value = FINAL.split('').map((ch, idx) => {
      if (idx < iter) return ch
      return CHARS[Math.floor(Math.random() * CHARS.length)]
    }).join('')
    if (++iter > FINAL.length) {
      scrambled.value = FINAL
      clearInterval(interval)
    }
  }, 55)
}

onMounted(() => {
  updateClock()
  clockInterval = setInterval(updateClock, 1000)
  setTimeout(runScramble, 400)
})
onUnmounted(() => clearInterval(clockInterval))

const previewItems = [
  { bg: 'linear-gradient(135deg, #091520 0%, #0d2035 60%, #060e18 100%)', label: 'CITY CENTER' },
  { bg: 'linear-gradient(135deg, #0a1a0e 0%, #112e18 60%, #070f09 100%)', label: 'METRO LINE 1' },
  { bg: 'linear-gradient(135deg, #1a0d09 0%, #2e1812 60%, #100807 100%)', label: 'AIRPORT EXPRESS' },
]
</script>

<style scoped>
.copy-toast {
  position: fixed;
  left: 50%;
  bottom: 2rem;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: var(--text);
  color: var(--bg);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.02em;
  padding: 0.85rem 1.4rem;
  z-index: 200;
}
.copy-toast__icon { color: var(--accent); font-weight: 700; }
.copy-toast-enter-active, .copy-toast-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.copy-toast-enter-from, .copy-toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(10px); }

.fids-home {
  min-height: 100vh;
  font-family: var(--font-mono);
}

/* ── Hero / Departure Board ─────────────────── */
.fids-hero {
  padding: 2.5rem 0 0;
  border-bottom: 1px solid var(--border-dim);
}

.fids-board-wrap {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.fids-board-hdr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.25rem;
  background: var(--accent);
  color: var(--bg);
  font-family: var(--font-head);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.fids-board-hdr__type {
  opacity: 0.75;
  font-weight: 400;
  font-size: 0.68rem;
}

.fids-board-hdr__clock {
  font-family: var(--font-mono);
  font-weight: 700;
  letter-spacing: 0.2em;
}

/* Column header row */
.fids-cols {
  display: grid;
  grid-template-columns: 1fr 130px 1fr 90px;
  padding: 0.5rem 1.25rem;
  font-size: 0.6rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-dim);
  border-left: var(--border-accent);
  border-right: var(--border-accent);
}

.fids-col-gate { text-align: left; }
.fids-col-time { text-align: right; }

/* Individual rows */
.fids-row {
  display: grid;
  grid-template-columns: 1fr 130px 1fr 90px;
  padding: 0.85rem 1.25rem;
  align-items: center;
  border-left: var(--border-accent);
  border-right: var(--border-accent);
  border-bottom: 1px solid var(--border-dim);
  opacity: 0;
  animation: fids-row-in 0.25s ease forwards;
  animation-delay: var(--row-delay, 0s);
}

.fids-row--featured {
  background: rgba(245, 161, 0, 0.05);
  border-left: 4px solid var(--accent);
  padding-left: calc(1.25rem - 2px);
  animation-delay: 0.1s;
}

.fids-row--secondary {
  background: var(--bg-2);
}

@keyframes fids-row-in {
  from { opacity: 0; transform: translateX(6px); }
  to   { opacity: 1; transform: translateX(0); }
}

.fids-row__dest {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.fids-row__arrow {
  color: var(--accent);
  font-size: 0.7rem;
  margin-right: 0.4rem;
}

.fids-row__name {
  font-family: var(--font-head);
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--text);
  text-transform: uppercase;
}

.fids-dim-name {
  font-size: 0.88rem;
  color: var(--text-muted);
  font-weight: 400;
}

.fids-row__sub {
  font-size: 0.62rem;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* Status badges */
.fids-status {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  padding: 3px 8px;
  text-transform: uppercase;
}
.fids-status--ok   { background: rgba(0, 200, 83, 0.15); color: #00C853; }
.fids-status--bad  { background: rgba(255, 59, 48, 0.15); color: #FF3B30; }
.fids-status--wait { color: var(--text-muted); border: 1px solid var(--border-dim); }
.fids-status--req  { background: rgba(245, 161, 0, 0.15); color: var(--accent); }
.fids-status--delay { background: rgba(255, 59, 48, 0.12); color: #FF3B30; }

.fids-row__gate {
  font-size: 0.8rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.fids-row__time {
  text-align: right;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
}

.fids-row__names {
  display: block;
  margin-top: 0.2rem;
  font-size: 0.6rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  color: var(--text-muted);
  max-width: 11rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.fids-copy {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  font-weight: 700;
  padding: 2px 7px;
  background: var(--accent);
  color: var(--bg);
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.12s;
}
.fids-copy:hover { opacity: 0.8; }

.fids-link {
  color: var(--accent);
  text-decoration: none;
  font-size: 0.75rem;
  transition: opacity 0.12s;
}
.fids-link:hover { opacity: 0.7; }

.fids-dim { color: var(--text-muted); font-size: 0.8em; }

/* ── Section shared ──────────────────────── */
.fids-section {
  padding: 2.5rem 0;
  border-bottom: 1px solid var(--border-dim);
}

.fids-sec-hdr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border-dim);
}

.fids-sec-label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--accent);
}

.fids-sec-live {
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.fids-sec-link {
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  color: var(--accent);
  text-decoration: none;
  transition: opacity 0.12s;
}
.fids-sec-link:hover { opacity: 0.7; }

/* ── Status dot ──────────────────────────── */
.fids-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  flex-shrink: 0;
}
.fids-dot--on  { background: #00C853; animation: pulse 2s ease-in-out infinite; }
.fids-dot--off { background: #FF3B30; }

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}

/* ── Telemetry ───────────────────────────── */
.fids-loading {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.78rem;
  color: var(--text-muted);
  letter-spacing: 0.12em;
  padding: 1.5rem 0;
}

.fids-telemetry {
  border: var(--border-accent);
}

.fids-tele-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  gap: 1rem;
}

.fids-tele-divider {
  height: 1px;
  background: var(--border-dim);
  margin: 0 1.5rem;
}

.fids-tele-label {
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.fids-tele-val {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text);
  font-family: var(--font-head);
}

.fids-val--ok  { color: #00C853; }
.fids-val--bad { color: #FF3B30; }

.fids-manifest {
  border-top: 1px solid var(--border-dim);
  padding: 1rem 1.5rem;
}

.fids-manifest-hdr {
  font-size: 0.6rem;
  letter-spacing: 0.25em;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.fids-manifest-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.fids-passenger {
  font-size: 0.72rem;
  padding: 2px 8px;
  border: 1px solid var(--accent);
  color: var(--accent);
  background: rgba(245, 161, 0, 0.05);
  letter-spacing: 0.06em;
}

/* ── Filmstrip gallery preview ───────────── */
.fids-filmstrip {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
}

.fids-film-frame {
  text-decoration: none;
  color: var(--text);
  display: flex;
  flex-direction: column;
  border: var(--border-accent);
  overflow: hidden;
  transition: box-shadow 0.15s;
}

.fids-film-frame:hover {
  box-shadow: 0 0 0 1px var(--accent);
}

.fids-film-img {
  aspect-ratio: 16/9;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 0.6rem;
}

.fids-film-hud {
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(245, 161, 0, 0.6);
}

.fids-film-meta {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  background: var(--bg-2);
  border-top: 1px solid var(--border-dim);
}

/* ── Responsive ──────────────────────────── */
@media (max-width: 768px) {
  .fids-cols,
  .fids-row {
    grid-template-columns: 1fr 90px;
  }
  .fids-col-gate, .fids-row__gate { display: none; }
  .fids-col-time, .fids-row__time { display: none; }
  .fids-board-hdr__type { display: none; }
  .fids-filmstrip { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 480px) {
  .fids-hero { padding: 1.5rem 0 0; }
  .fids-filmstrip { grid-template-columns: 1fr; }
  .fids-tele-row { flex-direction: column; align-items: flex-start; gap: 0.4rem; }
  .fids-tele-val { font-size: 1.1rem; }
}
</style>
