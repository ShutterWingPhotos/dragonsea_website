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
            <div
              class="gs-item__inner"
              :class="{ 'gs-item__inner--clickable': item.img }"
              :style="{ background: item.img ? undefined : item.bg }"
              @click="item.img && openLightbox(item)"
            >
              <img v-if="item.img" :src="item.img" :alt="t(item.labelKey)" class="gs-item__photo" loading="lazy">
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

    <Teleport to="body">
      <Transition name="gs-lightbox">
        <div v-if="lightboxItem" class="gs-lightbox" @click.self="closeLightbox">
          <button class="gs-lightbox__close" @click="closeLightbox" :aria-label="t('survey-close-archive')">✕</button>
          <figure class="gs-lightbox__frame">
            <img :src="lightboxItem.img" :alt="t(lightboxItem.labelKey)" class="gs-lightbox__img">
            <figcaption class="gs-lightbox__caption">
              <span class="gs-lightbox__ref">DOC-{{ String(lightboxIndex + 1).padStart(3, '0') }}</span>
              {{ t(lightboxItem.labelKey) }}
            </figcaption>
          </figure>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const lightboxItem = ref(null)
const lightboxIndex = ref(-1)

function openLightbox(item) {
  lightboxItem.value = item
  lightboxIndex.value = galleryItems.indexOf(item)
}

function closeLightbox() {
  lightboxItem.value = null
  lightboxIndex.value = -1
}
const galleryItems = [
  { img: '/gallery/above_ground_subway_station.png', labelKey: 'gallery-above-ground-subway', span: 'gs-item--tall' },
  { img: '/gallery/airport_overview.png', labelKey: 'gallery-airport-overview', span: '' },
  { img: '/gallery/airport_subway_station_interior.png', labelKey: 'gallery-airport-subway-interior', span: '' },
  { img: '/gallery/small_airport_overview.png', labelKey: 'gallery-small-airport-overview', span: 'gs-item--wide' },
  { img: '/gallery/dragonsea_centralbusinessdistrict_skyscrapers.png', labelKey: 'gallery-cbd-skyscrapers', span: '' },
  { img: '/gallery/light_rail_line_one.png', labelKey: 'gallery-light-rail-line-one', span: '' },
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
.gs-item__photo { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1; }
.gs-item__inner--clickable { cursor: zoom-in; }
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

/* ── Lightbox ─────────────────────────────── */
.gs-lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4vh 4vw;
  background: rgba(20, 25, 32, 0.88);
  backdrop-filter: blur(4px);
  cursor: zoom-out;
}

.gs-lightbox__frame {
  position: relative;
  max-width: min(1100px, 92vw);
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  cursor: default;
}

.gs-lightbox__img {
  display: block;
  width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border: 2px solid var(--accent);
  background: var(--bg-2);
}

.gs-lightbox__caption {
  margin-top: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #F5F1E8;
}

.gs-lightbox__ref {
  font-weight: 700;
  letter-spacing: 0.16em;
  color: var(--accent-yellow);
}

.gs-lightbox__close {
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  transform: translate(50%, -50%);
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent);
  color: var(--bg);
  border: none;
  font-size: 1rem;
  cursor: pointer;
  z-index: 1;
  transition: background 0.12s, color 0.12s;
}

.gs-lightbox__close:hover {
  background: var(--accent-red);
}

.gs-lightbox-enter-active,
.gs-lightbox-leave-active {
  transition: opacity 0.18s ease;
}
.gs-lightbox-enter-from,
.gs-lightbox-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .gs-lightbox__close {
    top: 0.5rem;
    right: 0.5rem;
    transform: none;
  }
}
</style>
