<template>
  <div class="gm">
    <section class="gm-hero">
      <div class="container">
        <div class="gm-hero-tag">
          <span class="gm-line-dot" style="background:#D22B2B"></span>
          <span class="gm-line-dot" style="background:#1A56DB"></span>
          <span class="gm-line-dot" style="background:#1A7C3A"></span>
          <span class="gm-hero-route">PHOTO ARCHIVE</span>
        </div>
        <h1 class="gm-hero-title">{{ t('gallery-title') }}</h1>
        <p class="gm-hero-desc">{{ t('gallery-desc') }}</p>
      </div>
    </section>
    <section class="gm-section">
      <div class="container">
        <div class="gm-zones-hdr">
          <span class="gm-zone-label" v-for="(z, i) in zones" :key="i" :style="{ borderColor: z.color, color: z.color }">{{ z.name }}</span>
        </div>
        <div class="gm-grid">
          <div
            v-for="(item, i) in galleryItems"
            :key="i"
            class="gm-item"
            :class="item.span"
          >
            <div class="gm-item__inner" :style="{ background: item.bg }">
              <div class="gm-item__line" :style="{ background: item.lineColor }"></div>
              <div class="gm-item__label">{{ item.label }}</div>
              <div class="gm-item__overlay">COMING SOON</div>
            </div>
          </div>
        </div>
        <div class="gm-note">
          Screenshots will be uploaded as the server builds. · 图库将随服务器建设持续更新。
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const zones = [
  { name: 'ZONE A — RED LINE', color: '#D22B2B' },
  { name: 'ZONE B — BLUE LINE', color: '#1A56DB' },
  { name: 'ZONE C — GREEN LINE', color: '#1A7C3A' },
]
const galleryItems = [
  { bg: 'linear-gradient(140deg, #091a0e, #122d18)', label: 'City Center', lineColor: '#D22B2B', span: 'gm-item--tall' },
  { bg: 'linear-gradient(140deg, #0a1520, #122338)', label: 'Metro Line 1', lineColor: '#1A56DB', span: '' },
  { bg: 'linear-gradient(140deg, #1a0a0a, #2e1515)', label: 'Airport Express', lineColor: '#D22B2B', span: '' },
  { bg: 'linear-gradient(140deg, #0e0e0a, #1e1e12)', label: 'Downtown', lineColor: '#1A7C3A', span: 'gm-item--wide' },
  { bg: 'linear-gradient(140deg, #150a1a, #261535)', label: 'Transit Hub', lineColor: '#1A56DB', span: '' },
  { bg: 'linear-gradient(140deg, #0a1a18, #12302c)', label: 'Suburbs', lineColor: '#1A7C3A', span: '' },
  { bg: 'linear-gradient(140deg, #1a100a, #2e1e12)', label: 'Architecture', lineColor: '#D22B2B', span: 'gm-item--tall' },
  { bg: 'linear-gradient(140deg, #0a0f1a, #121e38)', label: 'Night View', lineColor: '#1A56DB', span: '' },
]
</script>

<style scoped>
.gm { min-height: 100vh; }
.gm-hero { padding: 4rem 0 3rem; border-bottom: 3px solid var(--accent); }
.gm-hero-tag { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.25rem; }
.gm-line-dot { width: 0.9rem; height: 0.9rem; border-radius: 50%; flex-shrink: 0; }
.gm-hero-route { font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.2em; color: var(--text-muted); text-transform: uppercase; }
.gm-hero-title { font-family: var(--font-head); font-size: clamp(2.5rem, 7vw, 5rem); font-weight: 700; text-transform: uppercase; letter-spacing: 0.02em; color: var(--text); margin-bottom: 0.75rem; }
.gm-hero-desc { font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted); }
.gm-section { padding: 3rem 0; }
.gm-zones-hdr { display: flex; gap: 0.75rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
.gm-zone-label { font-family: var(--font-mono); font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 3px 8px; border: 2px solid; }
.gm-grid { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 220px; gap: 3px; }
.gm-item { overflow: hidden; }
.gm-item--tall { grid-row: span 2; }
.gm-item--wide { grid-column: span 2; }
.gm-item__inner {
  width: 100%; height: 100%; position: relative; overflow: hidden;
  display: flex; flex-direction: column; justify-content: flex-end; padding: 0.75rem;
  cursor: pointer;
}
.gm-item__inner:hover .gm-item__overlay { opacity: 1; }
.gm-item__line { position: absolute; left: 0; top: 0; bottom: 0; width: 4px; }
.gm-item__label {
  font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.12em;
  text-transform: uppercase; color: rgba(250,250,248,0.7);
  position: relative; z-index: 2;
  background: rgba(0,0,0,0.4); padding: 2px 6px; display: inline-block;
}
.gm-item__overlay {
  position: absolute; inset: 0; background: rgba(26,26,26,0.75);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--accent); opacity: 0; transition: opacity 0.15s; z-index: 3;
  border: 2px solid var(--accent);
}
.gm-note {
  margin-top: 1.5rem; padding: 0.75rem 1rem; border: 1px solid var(--border-dim);
  font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted);
}
@media (max-width: 768px) {
  .gm-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 170px; }
  .gm-item--tall { grid-row: span 1; }
}
@media (max-width: 480px) {
  .gm-grid { grid-template-columns: 1fr; grid-auto-rows: 190px; }
  .gm-item--wide, .gm-item--tall { grid-column: span 1; grid-row: span 1; }
}
</style>
