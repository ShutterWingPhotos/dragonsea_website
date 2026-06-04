<template>
  <div class="gallery">

    <!-- ═══ HEADER ═══ -->
    <section class="gallery-hero">
      <div class="container">
        <span class="sec-label">GALLERY</span>
        <h1 class="gallery-hero__title">{{ t('gallery-title') }}</h1>
        <p class="gallery-hero__desc">{{ t('gallery-desc') }}</p>
      </div>
    </section>

    <hr class="divider">

    <!-- ═══ GRID ═══ -->
    <section class="section">
      <div class="container">
        <div class="gallery-grid">

          <div
            v-for="(item, i) in galleryItems"
            :key="i"
            class="gallery-item card-hover"
            :class="item.span"
          >
            <div class="gallery-item__inner" :style="{ background: item.bg }">
              <div class="gallery-item__num">{{ String(i + 1).padStart(2, '0') }}</div>
              <div class="gallery-item__label">{{ item.label }}</div>
              <div class="gallery-item__overlay">
                <span class="gallery-item__overlay-text">COMING SOON</span>
              </div>
            </div>
          </div>

        </div>

        <div class="gallery-note">
          <span class="gallery-note__icon">◈</span>
          Screenshots will be uploaded as the server builds.
          <span class="gallery-note__sep">—</span>
          图库将随服务器建设持续更新。
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const galleryItems = [
  {
    bg: 'linear-gradient(140deg, #091a0e 0%, #122d18 50%, #071008 100%)',
    label: 'City Center',
    span: 'gallery-item--tall'
  },
  {
    bg: 'linear-gradient(140deg, #0a1520 0%, #122338 50%, #060e18 100%)',
    label: 'Metro Line 1',
    span: ''
  },
  {
    bg: 'linear-gradient(140deg, #1a0a0a 0%, #2e1515 50%, #100808 100%)',
    label: 'Airport Express',
    span: ''
  },
  {
    bg: 'linear-gradient(140deg, #0e0e0a 0%, #1e1e12 50%, #0a0a07 100%)',
    label: 'Downtown',
    span: 'gallery-item--wide'
  },
  {
    bg: 'linear-gradient(140deg, #150a1a 0%, #261535 50%, #0d0812 100%)',
    label: 'Transit Hub',
    span: ''
  },
  {
    bg: 'linear-gradient(140deg, #0a1a18 0%, #12302c 50%, #071412 100%)',
    label: 'Suburbs',
    span: ''
  },
  {
    bg: 'linear-gradient(140deg, #1a100a 0%, #2e1e12 50%, #120c07 100%)',
    label: 'Architecture',
    span: 'gallery-item--tall'
  },
  {
    bg: 'linear-gradient(140deg, #0a0f1a 0%, #121e38 50%, #060810 100%)',
    label: 'Night View',
    span: ''
  },
]
</script>

<style scoped>
/* ── Gallery Hero ─────────────────────────── */
.gallery-hero {
  padding: 4rem 0 3rem;
}

.gallery-hero__title {
  font-family: var(--font-head);
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text);
  margin: 0.75rem 0 0.75rem;
  line-height: 1;
}

.gallery-hero__desc {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--text-muted);
  letter-spacing: 0.08em;
}

/* ── Gallery Grid ─────────────────────────── */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 220px;
  gap: 2px;
}

.gallery-item {
  overflow: hidden;
  position: relative;
}

.gallery-item--tall {
  grid-row: span 2;
}

.gallery-item--wide {
  grid-column: span 2;
}

.gallery-item__inner {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
  border: 1px solid #141414;
}

.gallery-item__inner::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(13, 13, 13, 0.8) 0%, transparent 50%);
  pointer-events: none;
}

.gallery-item__num {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.15em;
  color: rgba(92, 255, 138, 0.4);
  z-index: 2;
}

.gallery-item__label {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
  position: relative;
  z-index: 2;
}

.gallery-item__overlay {
  position: absolute;
  inset: 0;
  background: rgba(13, 13, 13, 0.82);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.15s ease;
  z-index: 3;
  border: 2px solid var(--accent);
}

.gallery-item:hover .gallery-item__overlay {
  opacity: 1;
}

.gallery-item__overlay-text {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--accent);
}

/* ── Note ─────────────────────────────────── */
.gallery-note {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 1.5rem;
  padding: 0.75rem 1rem;
  border: 1px dashed #222;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.gallery-note__icon {
  color: var(--accent);
}

.gallery-note__sep {
  color: #333;
}

/* ── Responsive ───────────────────────────── */
@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 170px;
  }
  .gallery-item--tall {
    grid-row: span 1;
  }
  .gallery-item--wide {
    grid-column: span 2;
  }
  .gallery-hero__title {
    font-size: clamp(2rem, 8vw, 3rem);
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: 190px;
  }
  .gallery-item--wide,
  .gallery-item--tall {
    grid-column: span 1;
    grid-row: span 1;
  }
  .gallery-note {
    font-size: 0.68rem;
    flex-direction: column;
    gap: 0.25rem;
  }
  .gallery-note__sep {
    display: none;
  }
}
</style>
