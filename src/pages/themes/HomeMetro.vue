<template>
  <div class="metro-home">

    <!-- ═══ STATION HERO ═══ -->
    <section class="metro-hero">
      <!-- Transit lines running through hero (decorative) -->
      <div class="metro-lines" aria-hidden="true">
        <div class="metro-line metro-line--a"></div>
        <div class="metro-line metro-line--b"></div>
        <div class="metro-line metro-line--c"></div>
      </div>

      <div class="container metro-hero__inner">
        <!-- Station sign -->
        <div class="station-sign">
          <div class="station-sign__line-tag line-tag--a">A</div>
          <div class="station-sign__name">
            <span class="station-name-dragon">DRAGON</span><span class="station-name-sea">SEA</span>
          </div>
          <div class="station-sign__line-tag line-tag--b">B</div>
        </div>

        <div class="station-subtitle">{{ t('subtitle') }}</div>

        <!-- Live system status bar -->
        <div class="metro-sysbar">
          <div class="metro-sysbar__label">SYSTEM STATUS</div>
          <div class="metro-sysbar__lines">
            <div class="sysbar-line">
              <span class="sysbar-line__dot" :class="online ? 'sysbar-dot--ok' : 'sysbar-dot--fault'"></span>
              <span class="sysbar-line__id line-color--a">LINE A</span>
              <span class="sysbar-line__status">{{ online ? 'SERVICE NORMAL' : 'NO SERVICE' }}</span>
            </div>
            <div class="sysbar-line">
              <span class="sysbar-line__dot sysbar-dot--ok"></span>
              <span class="sysbar-line__id line-color--b">LINE B</span>
              <span class="sysbar-line__status">DYNMAP LIVE</span>
            </div>
            <div class="sysbar-line">
              <span class="sysbar-line__dot sysbar-dot--ok"></span>
              <span class="sysbar-line__id line-color--c">LINE C</span>
              <span class="sysbar-line__status">TRANSIT GUIDE LIVE</span>
            </div>
          </div>
          <div class="metro-sysbar__right">
            <span class="sysbar-pax">
              <span class="sysbar-pax__num">{{ loading ? '—' : userCount }}</span>
              <span class="sysbar-pax__cap">/128</span>
            </span>
            <span class="sysbar-pax__label">ONLINE NOW</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CONNECTIONS (Join Actions) ═══ -->
    <section class="metro-section">
      <div class="container">
        <div class="metro-sec-hdr">
          <div class="metro-station-dot line-color--a">⬤</div>
          <h2 class="metro-sec-title">CONNECTIONS</h2>
          <div class="metro-sec-line line-color--a"></div>
        </div>

        <div class="metro-connections">
          <!-- Primary: Server Address -->
          <div class="metro-conn-card metro-conn-card--primary" @click="copyAddress">
            <div class="metro-conn-card__line line-bg--a"></div>
            <div class="metro-conn-card__body">
              <div class="metro-conn-card__platform">PLATFORM 1</div>
              <div class="metro-conn-card__dest">{{ t('join-btn') }}</div>
              <div class="metro-conn-card__addr">mc.dragonseamc.com</div>
              <div class="metro-conn-card__action">{{ copied ? t('copied') : t('copy-hint') }}</div>
            </div>
          </div>

          <!-- Modpack -->
          <a class="metro-conn-card" href="https://mcd.shutterwingphotos.cn/" target="_blank">
            <div class="metro-conn-card__line line-bg--red"></div>
            <div class="metro-conn-card__body">
              <div class="metro-conn-card__platform">PLATFORM 2</div>
              <div class="metro-conn-card__dest">{{ t('modpack-btn') }}</div>
              <div class="metro-conn-card__desc">{{ t('modpack-desc') }}</div>
              <div class="metro-conn-badge">REQUIRED</div>
            </div>
          </a>

          <!-- Dynmap -->
          <a class="metro-conn-card" href="http://103.236.71.249:8100/" target="_blank">
            <div class="metro-conn-card__line line-bg--b"></div>
            <div class="metro-conn-card__body">
              <div class="metro-conn-card__platform">LINE B</div>
              <div class="metro-conn-card__dest">{{ t('dynmap-btn') }}</div>
              <div class="metro-conn-card__desc">{{ t('dynmap-desc') }}</div>
            </div>
          </a>

          <!-- Transit -->
          <a class="metro-conn-card" href="http://103.236.71.249:8123/" target="_blank">
            <div class="metro-conn-card__line line-bg--c"></div>
            <div class="metro-conn-card__body">
              <div class="metro-conn-card__platform">LINE C</div>
              <div class="metro-conn-card__dest">{{ t('transit-btn') }}</div>
              <div class="metro-conn-card__desc">{{ t('transit-desc') }}</div>
            </div>
          </a>
        </div>

        <!-- China relay note -->
        <div class="metro-relay">
          <div class="metro-relay__dot">⬤</div>
          <div class="metro-relay__body">
            <span class="metro-relay__label">{{ t('china-relay') }}</span>
            <span class="metro-relay__addr">59.110.15.54<span class="metro-relay__port">:25565</span></span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ LIVE PLATFORM STATUS ═══ -->
    <section class="metro-section">
      <div class="container">
        <div class="metro-sec-hdr">
          <div class="metro-station-dot line-color--b">⬤</div>
          <h2 class="metro-sec-title">{{ t('status-title') }}</h2>
          <div class="metro-sec-line line-color--b"></div>
        </div>

        <div v-if="loading" class="metro-loading">
          <span class="metro-loading__dot"></span> {{ t('loading') }}
        </div>

        <div v-else class="metro-status-board">
          <div class="metro-status-row">
            <span class="metro-status-label">{{ t('status-online') }}</span>
            <span class="metro-status-val" :class="hasError ? 'val--bad' : (online ? 'val--ok' : 'val--bad')">
              <span class="metro-status-dot" :class="!hasError && online ? 'sdot--on' : 'sdot--off'"></span>
              {{ hasError ? t('error') : (online ? 'ONLINE' : 'OFFLINE') }}
            </span>
          </div>
          <div class="metro-status-row">
            <span class="metro-status-label">{{ t('status-players') }}</span>
            <span class="metro-status-val">{{ hasError ? '—' : userCount }}<span class="metro-dim">/128</span></span>
          </div>
          <div class="metro-status-row">
            <span class="metro-status-label">{{ t('status-latency') }}</span>
            <span class="metro-status-val" :class="latencyClass">{{ hasError ? '—' : latency }}<span class="metro-dim"> ms</span></span>
          </div>

          <div v-if="!hasError && users && users.length > 0" class="metro-pax-list">
            <div class="metro-pax-hdr">{{ t('online-players') }}</div>
            <div class="metro-pax-names">
              <span class="metro-pax-tag" v-for="u in users" :key="u">{{ u }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ NETWORK ZONES (Screenshots) ═══ -->
    <section class="metro-section">
      <div class="container">
        <div class="metro-sec-hdr">
          <div class="metro-station-dot line-color--c">⬤</div>
          <h2 class="metro-sec-title">{{ t('screenshots-title') }}</h2>
          <div class="metro-sec-line line-color--c"></div>
        </div>
        <div class="metro-zone-grid">
          <RouterLink
            v-for="(item, i) in previewItems"
            :key="i"
            to="/gallery"
            class="metro-zone"
          >
            <div class="metro-zone__img" :style="{ background: item.bg }">
              <div class="metro-zone__overlay">OPEN GALLERY →</div>
            </div>
            <div class="metro-zone__label">
              <span class="metro-zone__line" :style="{ background: item.lineColor }"></span>
              {{ item.label }}
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useServerStatus } from '../../composables/useServerStatus.js'

const { t } = useI18n()
const { online, userCount, latency, users, loading, hasError, latencyClass } = useServerStatus()
const copied = ref(false)

function copyAddress() {
  navigator.clipboard.writeText('mc.dragonseamc.com').then(() => {
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  })
}

const previewItems = [
  { bg: 'linear-gradient(135deg, #0a2016 0%, #153a24 60%, #081510 100%)', label: 'ZONE A — CENTRAL', lineColor: '#D22B2B' },
  { bg: 'linear-gradient(135deg, #0a1520 0%, #152a3a 60%, #080f15 100%)', label: 'ZONE B — METRO', lineColor: '#1A56DB' },
  { bg: 'linear-gradient(135deg, #1a0a0a 0%, #2e1212 60%, #120808 100%)', label: 'ZONE C — AIRPORT', lineColor: '#1A7C3A' },
]
</script>

<style scoped>
.metro-home { min-height: 100vh; }

/* ── Hero ────────────────────────────────── */
.metro-hero {
  min-height: calc(80vh - var(--nav-h));
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-bottom: 3px solid var(--accent);
}

/* Decorative transit lines */
.metro-lines {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.metro-line {
  position: absolute;
  height: 4px;
  width: 100%;
  opacity: 0.18;
}
.metro-line--a { background: #D22B2B; top: 30%; }
.metro-line--b { background: #1A56DB; top: 55%; }
.metro-line--c { background: #1A7C3A; top: 72%; }

.metro-hero__inner {
  position: relative;
  z-index: 1;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

/* Station sign */
.station-sign {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  animation: fadeInUp 0.5s ease 0.1s both;
}

.station-sign__line-tag {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-head);
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
}

.line-tag--a { background: #D22B2B; }
.line-tag--b { background: #1A56DB; }

.station-sign__name {
  font-family: var(--font-head);
  font-size: clamp(4rem, 12vw, 9rem);
  font-weight: 700;
  line-height: 0.9;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.station-name-dragon { color: var(--text); }
.station-name-sea    { color: var(--accent); }

.station-subtitle {
  font-family: var(--font-mono);
  font-size: clamp(0.7rem, 1.5vw, 0.9rem);
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--text-muted);
  padding-left: 4rem;
  animation: fadeInUp 0.5s ease 0.3s both;
}

/* System status bar */
.metro-sysbar {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1rem 1.25rem;
  background: var(--bg-2);
  border: 1px solid var(--border-dim);
  border-left: 3px solid var(--accent);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  flex-wrap: wrap;
  animation: fadeInUp 0.5s ease 0.5s both;
}

.metro-sysbar__label {
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  white-space: nowrap;
}

.metro-sysbar__lines {
  display: flex;
  gap: 1.25rem;
  flex: 1;
  flex-wrap: wrap;
}

.sysbar-line {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  white-space: nowrap;
}

.sysbar-line__dot {
  width: 7px;
  height: 7px;
  display: inline-block;
  flex-shrink: 0;
}
.sysbar-dot--ok    { background: #1A7C3A; }
.sysbar-dot--fault { background: #D22B2B; }

.sysbar-line__id {
  font-weight: 700;
  font-size: 0.68rem;
  letter-spacing: 0.1em;
}

.sysbar-line__status {
  color: var(--text-muted);
  font-size: 0.65rem;
}

.metro-sysbar__right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.1rem;
}

.sysbar-pax {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text);
  font-family: var(--font-head);
  line-height: 1;
}
.sysbar-pax__cap { color: var(--text-muted); font-size: 0.75rem; font-family: var(--font-mono); }
.sysbar-pax__label { font-size: 0.58rem; letter-spacing: 0.15em; color: var(--text-muted); text-transform: uppercase; }

/* ── Section shared ──────────────────────── */
.metro-section {
  padding: 3rem 0;
  border-bottom: 1px solid var(--border-dim);
}

.metro-sec-hdr {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.metro-station-dot {
  font-size: 0.7rem;
  flex-shrink: 0;
}

.metro-sec-title {
  font-family: var(--font-head);
  font-size: clamp(1.2rem, 2.5vw, 1.6rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text);
  white-space: nowrap;
}

.metro-sec-line {
  flex: 1;
  height: 3px;
  opacity: 0.3;
}

/* Line colors */
.line-color--a { color: #D22B2B; }
.line-color--b { color: #1A56DB; }
.line-color--c { color: #1A7C3A; }
.line-bg--a    { background: #D22B2B; }
.line-bg--b    { background: #1A56DB; }
.line-bg--c    { background: #1A7C3A; }
.line-bg--red  { background: #E8621A; }

/* ── Connection cards ────────────────────── */
.metro-connections {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
}

.metro-conn-card {
  display: flex;
  flex-direction: row;
  background: var(--bg-2);
  border: 1px solid var(--border-dim);
  text-decoration: none;
  color: var(--text);
  cursor: pointer;
  transition: transform 0.12s, box-shadow 0.12s;
  overflow: hidden;
}

.metro-conn-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.metro-conn-card--primary {
  grid-column: span 2;
}

.metro-conn-card__line {
  width: 5px;
  flex-shrink: 0;
  align-self: stretch;
}

.metro-conn-card__body {
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
}

.metro-conn-card__platform {
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.metro-conn-card__dest {
  font-family: var(--font-head);
  font-size: 0.95rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text);
}

.metro-conn-card__addr {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--accent);
}

.metro-conn-card__desc,
.metro-conn-card__action {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.metro-conn-badge {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  padding: 2px 7px;
  background: #E8621A;
  color: #fff;
  align-self: flex-start;
  margin-top: auto;
}

/* China relay strip */
.metro-relay {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 2px;
  padding: 0.75rem 1.25rem;
  background: var(--bg-2);
  border: 1px solid var(--border-dim);
  border-left: 3px dashed var(--text-muted);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.metro-relay__dot { color: var(--text-muted); font-size: 0.5rem; }

.metro-relay__body {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.metro-relay__label { color: var(--text-muted); font-size: 0.7rem; }
.metro-relay__addr  { color: var(--text); font-size: 0.82rem; }
.metro-relay__port  { color: var(--text-muted); }

/* ── Status board ────────────────────────── */
.metro-loading {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-muted);
  padding: 1rem 0;
}

.metro-loading__dot {
  width: 6px; height: 6px;
  background: var(--accent);
  flex-shrink: 0;
  animation: pulse 1s ease-in-out infinite;
}

.metro-status-board {
  border: 1px solid var(--border-dim);
  border-left: 3px solid #1A56DB;
  overflow: hidden;
}

.metro-status-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border-dim);
  font-family: var(--font-mono);
}

.metro-status-row:last-child { border-bottom: none; }

.metro-status-label {
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.metro-status-val {
  font-size: 1.4rem;
  font-weight: 700;
  font-family: var(--font-head);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.metro-status-dot {
  width: 8px; height: 8px; flex-shrink: 0;
}
.sdot--on  { background: #1A7C3A; animation: pulse 2s ease-in-out infinite; }
.sdot--off { background: #D22B2B; }

.metro-dim { font-size: 0.8em; font-weight: 400; color: var(--text-muted); font-family: var(--font-mono); }

.val--ok  { color: #1A7C3A; }
.val--bad { color: #D22B2B; }

.metro-pax-list { padding: 1rem 1.5rem; border-top: 1px solid var(--border-dim); }
.metro-pax-hdr  { font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.75rem; }
.metro-pax-names { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.metro-pax-tag {
  font-family: var(--font-mono); font-size: 0.72rem; padding: 2px 8px;
  border: 1px solid var(--accent); color: var(--accent);
  background: var(--accent-dim);
}

/* ── Zone grid ───────────────────────────── */
.metro-zone-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
}

.metro-zone {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: var(--text);
  overflow: hidden;
  transition: transform 0.12s;
}
.metro-zone:hover { transform: translateY(-2px); }
.metro-zone:hover .metro-zone__overlay { opacity: 1; }

.metro-zone__img {
  aspect-ratio: 16/10;
  position: relative;
  overflow: hidden;
}

.metro-zone__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  color: var(--accent);
  opacity: 0;
  transition: opacity 0.15s;
}

.metro-zone__label {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  background: var(--bg-2);
  border: 1px solid var(--border-dim);
  border-top: none;
}

.metro-zone__line {
  width: 12px;
  height: 3px;
  flex-shrink: 0;
}

/* ── Animations ──────────────────────────── */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}

/* ── Responsive ──────────────────────────── */
@media (max-width: 900px) {
  .metro-connections { grid-template-columns: 1fr 1fr; }
  .metro-conn-card--primary { grid-column: span 2; }
}

@media (max-width: 600px) {
  .station-subtitle { padding-left: 0; }
  .metro-connections { grid-template-columns: 1fr; }
  .metro-conn-card--primary { grid-column: span 1; }
  .metro-sysbar__lines { flex-direction: column; gap: 0.5rem; }
  .metro-zone-grid { grid-template-columns: 1fr 1fr; }
}
</style>
