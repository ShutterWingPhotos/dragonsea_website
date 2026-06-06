<template>
  <div class="gs">
    <section class="gs-hero">
      <div class="container">
        <div class="gs-doc-ref">
          <span>DOCUMENT: DS-GALLERY-001</span><span class="gs-sep">·</span>
          <span>{{ t('survey-site-doc') }}</span><span class="gs-sep">·</span><span>REV. A</span>
        </div>
        <div class="gs-annot">{{ t('survey-photo-survey') }}</div>
        <h1 class="gs-hero-title">{{ t('gallery-title') }}</h1>
        <p class="gs-hero-desc">{{ t('gallery-desc') }}</p>
      </div>
    </section>
    <section class="gs-section">
      <div class="container">
        <div class="gs-sec-hdr">
          <span class="gs-zone-ref">{{ t('survey-zone') }} A</span>
          <h2 class="gs-sec-title">{{ t('survey-site-photos') }}</h2>
        </div>
        <div class="gs-grid">
          <div
            v-for="(item, i) in galleryItems"
            :key="i"
            class="gs-item"
            :class="item.span"
          >
            <div class="gs-item__inner" :style="{ background: item.bg }">
              <div class="gs-item__ref">DOC-{{ String(i + 1).padStart(3, '0') }}</div>
              <div class="gs-item__label">{{ t(item.labelKey) }}</div>
              <div class="gs-item__overlay">{{ t('survey-view-archive') }}</div>
              <div class="gs-item__brackets">
                <span class="gs-brk gs-brk--tl"></span><span class="gs-brk gs-brk--tr"></span>
                <span class="gs-brk gs-brk--bl"></span><span class="gs-brk gs-brk--br"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="gs-note">
          <span class="gs-note-ref">{{ t('survey-note') }}</span>
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
  { bg: 'linear-gradient(140deg, #091a0e, #122d18)', labelKey: 'gallery-city-center', span: 'gs-item--tall' },
  { bg: 'linear-gradient(140deg, #0a1520, #122338)', labelKey: 'gallery-metro-line-1', span: '' },
  { bg: 'linear-gradient(140deg, #1a0a0a, #2e1515)', labelKey: 'gallery-airport-express', span: '' },
  { bg: 'linear-gradient(140deg, #0e0e0a, #1e1e12)', labelKey: 'gallery-downtown', span: 'gs-item--wide' },
  { bg: 'linear-gradient(140deg, #150a1a, #261535)', labelKey: 'gallery-transit-hub', span: '' },
  { bg: 'linear-gradient(140deg, #0a1a18, #12302c)', labelKey: 'gallery-suburbs', span: '' },
  { bg: 'linear-gradient(140deg, #1a100a, #2e1e12)', labelKey: 'gallery-architecture', span: 'gs-item--tall' },
  { bg: 'linear-gradient(140deg, #0a0f1a, #121e38)', labelKey: 'gallery-night-view', span: '' },
]
</script>

<style scoped>
.gs { min-height: 100vh; font-family: var(--font-mono); }
.gs-hero { padding: 2.5rem 0; border-bottom: 2px solid var(--accent); }
.gs-doc-ref { display: flex; align-items: center; gap: 0.75rem; font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-muted); padding: 0.4rem 0.75rem; border: 1px solid var(--border-dim); background: var(--bg-2); margin-bottom: 2rem; width: fit-content; }
.gs-sep { color: var(--border-dim); }
.gs-annot { font-size: 0.72rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem; }
.gs-hero-title { font-family: var(--font-head); font-size: clamp(2.5rem, 7vw, 5rem); font-weight: 700; text-transform: uppercase; letter-spacing: 0.02em; color: var(--accent); margin-bottom: 0.75rem; }
.gs-hero-desc { font-size: 0.9rem; color: var(--text-muted); letter-spacing: 0.05em; }
.gs-section { padding: 3rem 0; }
.gs-sec-hdr { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; }
.gs-zone-ref { font-size: 0.72rem; letter-spacing: 0.2em; padding: 2px 7px; border: 1px solid var(--accent); color: var(--accent); }
.gs-sec-title { font-family: var(--font-head); font-size: clamp(1.1rem, 2.5vw, 1.5rem); font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text); }
.gs-grid { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 220px; gap: 1rem; }
.gs-item { overflow: hidden; }
.gs-item--tall { grid-row: span 2; }
.gs-item--wide { grid-column: span 2; }
.gs-item__inner {
  width: 100%; height: 100%; position: relative; overflow: hidden;
  display: flex; flex-direction: column; justify-content: space-between; padding: 0.75rem;
  border: 2px solid transparent; transition: border-color 0.15s;
}
.gs-item__inner:hover { border-color: var(--accent); }
.gs-item__inner:hover .gs-item__overlay { opacity: 1; }
.gs-item__ref { font-size: 0.7rem; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(245,241,232,0.35); z-index: 2; position: relative; }
.gs-item__label { font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(245,241,232,0.65); z-index: 2; position: relative; }
.gs-item__overlay { position: absolute; inset: 0; background: rgba(245,241,232,0.8); display: flex; align-items: center; justify-content: center; font-size: 0.82rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); opacity: 0; transition: opacity 0.15s; z-index: 3; }
/* Corner brackets inside the card */
.gs-item__brackets { position: absolute; inset: 4px; pointer-events: none; z-index: 4; }
.gs-brk { position: absolute; width: 8px; height: 8px; border-color: rgba(245,241,232,0.25); border-style: solid; }
.gs-brk--tl { top: 0; left: 0; border-width: 2px 0 0 2px; }
.gs-brk--tr { top: 0; right: 0; border-width: 2px 2px 0 0; }
.gs-brk--bl { bottom: 0; left: 0; border-width: 0 0 2px 2px; }
.gs-brk--br { bottom: 0; right: 0; border-width: 0 2px 2px 0; }
.gs-note { margin-top: 1.5rem; padding: 0.65rem 1rem; border: 1px dashed var(--border-dim); font-size: 0.82rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.75rem; }
.gs-note-ref { font-weight: 700; color: var(--accent-red); letter-spacing: 0.08em; white-space: nowrap; }
@media (max-width: 768px) {
  .gs-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 170px; }
  .gs-item--tall { grid-row: span 1; }
}
@media (max-width: 480px) {
  .gs-grid { grid-template-columns: 1fr; grid-auto-rows: 190px; }
  .gs-item--wide, .gs-item--tall { grid-column: span 1; grid-row: span 1; }
}
</style>
