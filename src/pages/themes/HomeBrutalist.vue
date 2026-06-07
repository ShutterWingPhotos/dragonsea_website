<template>
  <div class="home">

    <!-- ═══ HERO ═══ -->
    <section class="hero">
      <div class="hero__content container">
        <div class="hero__eyebrow">// MINECRAFT SERVER //</div>
        <h1 class="hero__title">
          DRAGON<span class="hero__title-sea">SEA</span>
        </h1>
        <div class="hero__rule"></div>
        <p class="hero__subtitle">{{ t('subtitle') }}</p>
      </div>
      <div class="hero__statusbar">
        <div class="hero__statusbar-inner container">
          <div class="hero__stat">
            <span class="hero__stat-label">{{ t('status-online') }}</span>
            <span v-if="loading" class="hero__stat-val">—</span>
            <span v-else-if="hasError" class="hero__stat-val s-offline">{{ t('error') }}</span>
            <span v-else class="hero__stat-val" :class="online ? 's-online' : 's-offline'">
              <span class="hero__dot" :class="online ? 'hero__dot--on' : 'hero__dot--off'"></span>
              {{ online ? 'ONLINE' : 'OFFLINE' }}
            </span>
          </div>
          <span class="hero__stat-sep">│</span>
          <div class="hero__stat" :title="onlineNamesTitle">
            <span class="hero__stat-label">{{ t('status-players') }}</span>
            <span class="hero__stat-val">{{ loading ? '—' : userCount }}<span class="hero__stat-dim">/128</span></span>
            <span v-if="!hasError && users.length > 0" class="hero__stat-names">{{ users.join(', ') }}</span>
          </div>
          <span class="hero__stat-sep">│</span>
          <div class="hero__stat">
            <span class="hero__stat-label">{{ t('status-latency') }}</span>
            <span class="hero__stat-val" :class="latencyClass">{{ loading ? '—' : latency }}<span class="hero__stat-dim">ms</span></span>
          </div>
          <span class="hero__stat-sep hero__stat-sep--push">│</span>
          <div class="hero__stat hero__stat--addr" @click="copyAddress">
            <span class="hero__stat-label">MC ADDR</span>
            <span class="hero__stat-val hero__stat-val--copy">
              59.110.15.64:25565
              <span class="hero__copy-badge" :class="{ 'hero__copy-badge--show': copied }">{{ t('copied') }}</span>
            </span>
          </div>
        </div>
      </div>
    </section>

    <hr class="divider">

    <!-- ═══ QUICK ACTIONS ═══ -->
    <section class="section">
      <div class="container">
        <div class="sec-header">
          <span class="sec-label">01 — JOIN</span>
          <h2 class="sec-title">{{ t('join-title') }}</h2>
          <p class="sec-desc">{{ t('join-desc') }}</p>
        </div>

        <div class="actions-grid">
          <!-- Join / Copy -->
          <div class="action-card card-hover" @click="copyAddress">
            <div class="action-card__icon">◈</div>
            <div class="action-card__title">{{ t('join-btn') }}</div>
            <div class="action-card__addr">59.110.15.64:25565</div>
            <div class="action-card__hint">{{ copied ? t('copied') : t('copy-hint') }}</div>
          </div>

          <!-- Modpack -->
          <a class="action-card card-hover action-card--warn" href="https://mcd.shutterwingphotos.cn/" target="_blank">
            <div class="action-card__icon">⬇</div>
            <div class="action-card__title">{{ t('modpack-btn') }}</div>
            <div class="action-card__desc">{{ t('modpack-desc') }}</div>
            <div class="action-card__badge">REQUIRED</div>
          </a>

          <!-- Dynmap -->
          <a class="action-card card-hover" href="http://59.110.15.64:8100/" target="_blank">
            <div class="action-card__icon">◉</div>
            <div class="action-card__title">{{ t('dynmap-btn') }}</div>
            <div class="action-card__desc">{{ t('dynmap-desc') }}</div>
          </a>

          <!-- Transit -->
          <a class="action-card card-hover" href="http://59.110.15.64:8888/" target="_blank">
            <div class="action-card__icon">◫</div>
            <div class="action-card__title">{{ t('transit-btn') }}</div>
            <div class="action-card__desc">{{ t('transit-desc') }}</div>
          </a>
        </div>
      </div>
    </section>

    <hr class="divider">

    <!-- ═══ SERVER ADDRESS ═══ -->
    <section class="section">
      <div class="container">
        <div class="sec-header">
          <span class="sec-label">02 — CONNECT</span>
          <h2 class="sec-title">{{ t('server-address') }}</h2>
        </div>

        <div class="addr-board">
          <div class="addr-row addr-row--primary card-hover" @click="copyAddress">
            <div class="addr-row__tag">{{ t('primary') }}</div>
            <div class="addr-row__value">59.110.15.64<span class="addr-port">:25565</span></div>
            <div class="addr-row__action">{{ copied ? '✓ ' + t('copied') : t('copy-hint') }}</div>
          </div>
        </div>
      </div>
    </section>

    <hr class="divider">

    <!-- ═══ SERVER STATUS ═══ -->
    <section class="section">
      <div class="container">
        <div class="sec-header">
          <span class="sec-label">03 — STATUS</span>
          <h2 class="sec-title">{{ t('status-title') }}</h2>
        </div>

        <div v-if="loading" class="status-loading">
          <span class="status-loading__dot"></span>
          {{ t('loading') }}
        </div>

        <div v-else class="status-board">
          <div class="status-board__stats">
            <div class="stat-cell">
              <div class="stat-cell__label">{{ t('status-online') }}</div>
              <div class="stat-cell__val" :class="hasError ? 's-offline' : (online ? 's-online' : 's-offline')">
                <span class="stat-cell__dot" :class="!hasError && online ? 'stat-cell__dot--on' : 'stat-cell__dot--off'"></span>
                {{ hasError ? t('error') : (online ? 'ONLINE' : 'OFFLINE') }}
              </div>
            </div>
            <div class="stat-cell">
              <div class="stat-cell__label">{{ t('status-players') }}</div>
              <div class="stat-cell__val">
                {{ hasError ? '—' : userCount }}<span class="stat-cell__dim">/128</span>
              </div>
            </div>
            <div class="stat-cell">
              <div class="stat-cell__label">{{ t('status-latency') }}</div>
              <div class="stat-cell__val" :class="latencyClass">
                {{ hasError ? '—' : latency }}<span class="stat-cell__dim">ms</span>
              </div>
            </div>
          </div>

          <div v-if="!hasError && users && users.length > 0" class="status-board__users">
            <div class="status-board__users-label">{{ t('online-players') }}</div>
            <div class="status-board__users-list">
              <span class="user-tag" v-for="user in users" :key="user">{{ user }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <hr class="divider">

    <!-- ═══ SCREENSHOTS PREVIEW ═══ -->
    <section class="section">
      <div class="container">
        <div class="sec-header">
          <span class="sec-label">04 — WORLD</span>
          <h2 class="sec-title">{{ t('screenshots-title') }}</h2>
          <p class="sec-desc">{{ t('gallery-desc') }}</p>
        </div>

        <div class="preview-grid">
          <RouterLink
            v-for="(item, i) in previewItems"
            :key="i"
            to="/gallery"
            class="preview-card card-hover"
          >
            <div class="preview-card__img" :style="{ background: item.bg }">
              <div class="preview-card__overlay">
                <span>VIEW GALLERY →</span>
              </div>
            </div>
            <div class="preview-card__label">SCREENSHOT {{ String(i + 1).padStart(2, '0') }}</div>
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
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useServerStatus } from '../../composables/useServerStatus.js'
import { copyText } from '../../composables/useClipboard.js'

const { t } = useI18n()
const { online, userCount, latency, users, loading, hasError, latencyClass } = useServerStatus()

const onlineNamesTitle = computed(() =>
  !hasError.value && users.value.length > 0 ? users.value.join(', ') : ''
)

const copied = ref(false)
const showCopyToast = ref(false)
const SERVER_ADDRESS = '59.110.15.64:25565'

function copyAddress() {
  copyText(SERVER_ADDRESS).then(() => {
    copied.value = true
    showCopyToast.value = true
    setTimeout(() => { copied.value = false }, 2000)
    setTimeout(() => { showCopyToast.value = false }, 2400)
  })
}

const previewItems = [
  { bg: 'linear-gradient(135deg, #0a2016 0%, #153a24 60%, #081510 100%)' },
  { bg: 'linear-gradient(135deg, #0a1520 0%, #152a3a 60%, #080f15 100%)' },
  { bg: 'linear-gradient(135deg, #1a0a0a 0%, #2e1212 60%, #120808 100%)' },
]
</script>

<style scoped>
/* ── Hero ─────────────────────────────────── */
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
  border: 1px solid var(--accent);
  z-index: 200;
}
.copy-toast__icon { color: var(--accent); font-weight: 700; }
.copy-toast-enter-active, .copy-toast-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.copy-toast-enter-from, .copy-toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(10px); }

.hero {
  min-height: calc(100vh - var(--nav-h));
  display: grid;
  grid-template-rows: 1fr auto;
}

.hero__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5rem 2rem 3rem;
}

.hero__eyebrow {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  color: var(--accent);
  margin-bottom: 1.5rem;
  opacity: 0;
  animation: fadeInUp 0.5s ease 0.1s forwards;
}

.hero__title {
  font-family: var(--font-head);
  font-size: clamp(5rem, 15vw, 12rem);
  font-weight: 700;
  line-height: 0.88;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  color: var(--text);
  opacity: 0;
  animation: fadeInUp 0.5s ease 0.2s forwards;
}

.hero__title-sea {
  color: var(--accent);
}

.hero__rule {
  width: 100%;
  height: 2px;
  background: var(--accent);
  margin: 2rem 0 1.5rem;
  transform-origin: left;
  transform: scaleX(0);
  opacity: 0;
  animation: expandX 0.6s ease 0.4s forwards;
}

.hero__subtitle {
  font-family: var(--font-mono);
  font-size: clamp(0.85rem, 2vw, 1.1rem);
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--text-muted);
  opacity: 0;
  animation: fadeInUp 0.5s ease 0.55s forwards;
}

/* Hero status bar */
.hero__statusbar {
  border-top: 1px solid #1e1e1e;
  background: rgba(13, 13, 13, 0.85);
  backdrop-filter: blur(4px);
  opacity: 0;
  animation: fadeInUp 0.5s ease 0.7s forwards;
}

.hero__statusbar-inner {
  padding: 0.75rem 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.hero__stat {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.78rem;
}

.hero__stat--addr {
  cursor: pointer;
  transition: color 0.12s;
}

.hero__stat--addr:hover {
  color: var(--accent);
}

.hero__stat-label {
  color: var(--text-muted);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.hero__stat-val {
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  position: relative;
}

.hero__stat-val--copy {
  cursor: pointer;
}

.hero__stat-dim {
  color: var(--text-muted);
  font-size: 0.7rem;
}

.hero__stat-names {
  color: var(--text-muted);
  font-size: 0.65rem;
  letter-spacing: 0.02em;
  max-width: 12rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 720px) {
  .hero__stat-names { display: none; }
}

.hero__stat-sep {
  color: #252525;
  font-size: 0.9rem;
}

.hero__stat-sep--push {
  margin-left: auto;
}

.hero__dot {
  width: 6px;
  height: 6px;
  display: inline-block;
  flex-shrink: 0;
}

.hero__dot--on {
  background: var(--accent);
  animation: pulseDot 2s ease-in-out infinite;
}

.hero__dot--off {
  background: var(--accent-red);
}

.hero__copy-badge {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: var(--accent);
  color: var(--bg);
  font-size: 0.65rem;
  padding: 1px 6px;
  font-weight: 700;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s;
  white-space: nowrap;
}

.hero__copy-badge--show {
  opacity: 1;
}

/* ── Actions grid ─────────────────────────── */
.sec-header {
  margin-bottom: 2rem;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border: var(--border-accent);
}

.action-card {
  padding: 1.75rem 1.5rem;
  border-right: 2px solid var(--accent);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  color: var(--text);
  background: var(--bg);
}

.action-card:last-child {
  border-right: none;
}

.action-card__icon {
  font-size: 1.6rem;
  color: var(--accent);
  line-height: 1;
  margin-bottom: 0.25rem;
}

.action-card__title {
  font-family: var(--font-head);
  font-size: 0.95rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.action-card__desc,
.action-card__hint {
  font-family: var(--font-mono);
  font-size: 0.73rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.action-card__addr {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--accent);
  letter-spacing: 0.02em;
}

.action-card__badge {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.15em;
  font-weight: 700;
  padding: 2px 6px;
  background: var(--accent-red);
  color: var(--bg);
  display: inline-block;
  margin-top: auto;
  align-self: flex-start;
}

.action-card--warn {
  border-top: 3px solid var(--accent-red);
}

/* ── Server Address ───────────────────────── */
.addr-board {
  border: var(--border-accent);
}

.addr-row {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #1e1e1e;
}

.addr-row:last-child {
  border-bottom: none;
}

.addr-row--primary {
  cursor: pointer;
  background: var(--bg-2);
}

.addr-row__tag {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  border: 1px solid #282828;
  padding: 2px 7px;
  white-space: nowrap;
  flex-shrink: 0;
}

.addr-row__value {
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: 500;
  color: var(--text);
  flex: 1;
}

.addr-port {
  color: var(--text-muted);
}

.addr-row__action {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  white-space: nowrap;
}


/* ── Status board ─────────────────────────── */
.status-loading {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  padding: 1.5rem 0;
}

.status-loading__dot {
  width: 6px;
  height: 6px;
  background: var(--accent);
  animation: pulseDot 1s ease-in-out infinite;
}

.status-board {
  border: var(--border-accent);
}

.status-board__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: 2px solid var(--accent);
}

.stat-cell {
  padding: 1.5rem 2rem;
  border-right: 2px solid var(--accent);
}

.stat-cell:last-child {
  border-right: none;
}

.stat-cell__label {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.stat-cell__val {
  font-family: var(--font-mono);
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stat-cell__dim {
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--text-muted);
}

.stat-cell__dot {
  width: 8px;
  height: 8px;
  flex-shrink: 0;
}

.stat-cell__dot--on {
  background: var(--accent);
  animation: pulseDot 2s ease-in-out infinite;
}

.stat-cell__dot--off {
  background: var(--accent-red);
}

.status-board__users {
  padding: 1.25rem 1.5rem;
}

.status-board__users-label {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
}

.status-board__users-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

/* ── Screenshots preview ─────────────────── */
.preview-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
}

.preview-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: var(--text);
  overflow: hidden;
}

.preview-card__img {
  aspect-ratio: 16/10;
  position: relative;
  overflow: hidden;
}

.preview-card__overlay {
  position: absolute;
  inset: 0;
  background: rgba(13, 13, 13, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: var(--accent);
  opacity: 0;
  transition: opacity 0.15s;
}

.preview-card:hover .preview-card__overlay {
  opacity: 1;
}

.preview-card__label {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
  padding: 0.5rem 0.75rem;
  border: 1px solid #1a1a1a;
  border-top: 2px solid var(--accent);
  background: var(--bg-2);
}

/* ── Responsive ───────────────────────────── */
@media (max-width: 900px) {
  .actions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .action-card:nth-child(odd) {
    border-right: 2px solid var(--accent);
  }
  .action-card:nth-child(even) {
    border-right: none;
  }
  .action-card:nth-child(-n+2) {
    border-bottom: 2px solid var(--accent);
  }
  .status-board__stats {
    grid-template-columns: 1fr 1fr;
  }
  .stat-cell:nth-child(2) {
    border-right: none;
  }
  .stat-cell:nth-child(3) {
    grid-column: span 2;
    border-right: none;
    border-top: 2px solid var(--accent);
  }
  .hero__stat-sep--push,
  .hero__stat--addr {
    display: none;
  }
  .preview-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .hero__content {
    padding: 3rem 1rem 2rem;
  }
  .hero__title {
    font-size: clamp(3.2rem, 17vw, 5.5rem);
  }
  .hero__eyebrow {
    font-size: 0.6rem;
    letter-spacing: 0.12em;
  }
  .hero__subtitle {
    font-size: 0.78rem;
    letter-spacing: 0.15em;
  }
  .hero__statusbar-inner {
    padding: 0.65rem 1rem;
    gap: 1rem;
  }
  .hero__stat-sep {
    display: none;
  }
  .hero__stat {
    font-size: 0.72rem;
    gap: 0.4rem;
  }

  .actions-grid {
    grid-template-columns: 1fr;
  }
  .action-card {
    border-right: none !important;
    border-bottom: 2px solid var(--accent);
  }
  .action-card:last-child {
    border-bottom: none;
  }

  .addr-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
    padding: 1rem;
  }
  .addr-row__value {
    font-size: 0.88rem;
    word-break: break-all;
  }
  .addr-row__action {
    font-size: 0.65rem;
  }

  .status-board__stats {
    grid-template-columns: 1fr;
  }
  .stat-cell {
    border-right: none !important;
    border-bottom: 2px solid var(--accent);
    padding: 1rem 1.25rem;
  }
  .stat-cell:last-child {
    border-bottom: none;
  }
  .stat-cell:nth-child(3) {
    grid-column: span 1;
    border-top: none;
  }
  .stat-cell__val {
    font-size: 1.25rem;
  }

  .preview-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 380px) {
  .hero__title {
    font-size: clamp(2.8rem, 16vw, 4rem);
  }
  .hero__eyebrow {
    letter-spacing: 0.06em;
  }
}
</style>
