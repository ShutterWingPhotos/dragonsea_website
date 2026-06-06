<template>
  <div class="gf">
    <section class="gf-hero">
      <div class="container">
        <div class="gf-hero-board">
          <div class="gf-board-hdr">
            <span>PHOTO ARCHIVE — DRAGONSEA METROPOLITAN TERMINAL</span>
            <span class="gf-board-hdr__sub">{{ t('gallery-desc') }}</span>
          </div>
          <div class="gf-hero-title">{{ t('gallery-title') }}</div>
        </div>
      </div>
    </section>
    <section class="gf-section">
      <div class="container">
        <div class="gf-manifest-hdr">
          <span>REF</span><span>LOCATION</span><span>TYPE</span><span class="gf-col-status">STATUS</span>
        </div>
        <div class="gf-manifest-row" v-for="(item, i) in galleryItems" :key="i" :style="{ '--d': (i * 0.08) + 's' }">
          <span class="gf-ref">REF-{{ String(i + 1).padStart(3, '0') }}</span>
          <div class="gf-row-img">
            <div class="gf-row-thumb" :style="{ background: item.bg }"></div>
            <span class="gf-row-label">{{ item.label }}</span>
          </div>
          <span class="gf-type">PHOTOGRAPH</span>
          <span class="gf-col-status gf-badge">PENDING</span>
        </div>
        <div class="gf-note">
          <span class="gf-note__dot"></span>
          Screenshots will be uploaded as the server builds. · 图库将随服务器建设持续更新。
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const galleryItems = [
  { bg: 'linear-gradient(140deg, #091a0e, #122d18)', label: 'City Center' },
  { bg: 'linear-gradient(140deg, #0a1520, #122338)', label: 'Metro Line 1' },
  { bg: 'linear-gradient(140deg, #1a0a0a, #2e1515)', label: 'Airport Express' },
  { bg: 'linear-gradient(140deg, #0e0e0a, #1e1e12)', label: 'Downtown' },
  { bg: 'linear-gradient(140deg, #150a1a, #261535)', label: 'Transit Hub' },
  { bg: 'linear-gradient(140deg, #0a1a18, #12302c)', label: 'Suburbs' },
  { bg: 'linear-gradient(140deg, #1a100a, #2e1e12)', label: 'Architecture' },
  { bg: 'linear-gradient(140deg, #0a0f1a, #121e38)', label: 'Night View' },
]
</script>

<style scoped>
.gf { min-height: 100vh; font-family: var(--font-mono); }
.gf-hero { padding: 2.5rem 0; border-bottom: 1px solid var(--border-dim); }
.gf-hero-board { border: var(--border-accent); overflow: hidden; }
.gf-board-hdr {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0.6rem 1.25rem; background: var(--accent); color: var(--bg);
  font-family: var(--font-head); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
  flex-wrap: wrap; gap: 0.5rem;
}
.gf-board-hdr__sub { font-weight: 400; opacity: 0.7; font-size: 0.65rem; }
.gf-hero-title { font-family: var(--font-head); font-size: clamp(2.5rem, 7vw, 5rem); font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--text); padding: 1.5rem 1.25rem; }
.gf-section { padding: 2.5rem 0; }
.gf-manifest-hdr {
  display: grid; grid-template-columns: 80px 1fr 120px 90px;
  padding: 0.5rem 1.25rem; font-size: 0.6rem; letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--text-muted); background: var(--bg-2); border: var(--border-accent); margin-bottom: 2px;
}
.gf-manifest-row {
  display: grid; grid-template-columns: 80px 1fr 120px 90px;
  padding: 0.75rem 1.25rem; align-items: center;
  border: 1px solid var(--border-dim); border-top: none; font-size: 0.78rem;
  opacity: 0; animation: fids-in 0.25s ease forwards; animation-delay: var(--d, 0s);
}
@keyframes fids-in { from { opacity: 0; transform: translateX(6px); } to { opacity: 1; transform: none; } }
.gf-ref { font-weight: 700; color: var(--accent); font-size: 0.72rem; letter-spacing: 0.08em; }
.gf-row-img { display: flex; align-items: center; gap: 0.75rem; }
.gf-row-thumb { width: 48px; height: 32px; flex-shrink: 0; border: 1px solid var(--border-dim); }
.gf-row-label { font-family: var(--font-head); font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; font-size: 0.85rem; }
.gf-type { color: var(--text-muted); font-size: 0.68rem; }
.gf-col-status { text-align: right; }
.gf-badge { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.12em; padding: 2px 6px; background: rgba(245,161,0,0.1); color: var(--accent); }
.gf-note { display: flex; align-items: center; gap: 0.75rem; margin-top: 1.5rem; padding: 0.75rem 1rem; border: 1px solid var(--border-dim); font-size: 0.72rem; color: var(--text-muted); }
.gf-note__dot { width: 6px; height: 6px; background: var(--accent); flex-shrink: 0; animation: pulse 2s ease-in-out infinite; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
@media (max-width: 640px) {
  .gf-manifest-hdr, .gf-manifest-row { grid-template-columns: 70px 1fr 70px; }
  .gf-type { display: none; }
}
</style>
