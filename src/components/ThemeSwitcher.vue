<template>
  <!-- Floating trigger -->
  <button class="ts-trigger" :class="{ 'ts-trigger--open': open }" @click="open = !open" title="Vote for a design">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="5" height="5" fill="currentColor"/>
      <rect x="8" y="1" width="5" height="5" fill="currentColor" opacity="0.5"/>
      <rect x="1" y="8" width="5" height="5" fill="currentColor" opacity="0.5"/>
      <rect x="8" y="8" width="5" height="5" fill="currentColor"/>
    </svg>
    <span>THEME</span>
  </button>

  <!-- Panel -->
  <Teleport to="body">
    <Transition name="ts-panel">
      <div v-if="open" class="ts-backdrop" @click.self="open = false">
        <div class="ts-panel">
          <!-- Header -->
          <div class="ts-header">
            <div>
              <div class="ts-header-title">VOTE YOUR DESIGN</div>
              <div class="ts-header-sub">Hover to preview · click to vote</div>
            </div>
            <button class="ts-close" @click="open = false">✕</button>
          </div>

          <!-- Theme cards -->
          <div class="ts-grid">
            <button
              v-for="t in themes"
              :key="t.id"
              class="ts-card"
              :class="{ 'ts-card--active': theme === t.id }"
              @mouseenter="previewTheme(t.id)"
              @mouseleave="clearPreview"
              @click="choose(t.id)"
            >
              <!-- Color swatch strip -->
              <div class="ts-swatches">
                <div
                  v-for="(s, i) in t.swatches"
                  :key="i"
                  class="ts-swatch"
                  :style="{ background: s }"
                ></div>
              </div>
              <div class="ts-card-name">{{ t.name }}</div>
              <div class="ts-card-desc">{{ t.desc }}</div>
              <div v-if="theme === t.id" class="ts-card-badge">YOUR VOTE</div>
            </button>
          </div>

          <!-- Footer -->
          <div class="ts-footer">
            Share your pick in Discord — majority wins!
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { useTheme } from '../composables/useTheme.js'

const { theme, themes, setTheme, previewTheme, clearPreview } = useTheme()
const open = ref(false)

function choose(id) {
  setTheme(id)
  open.value = false
}
</script>

<style scoped>
/* ── Trigger button ──────────────────────────────── */
.ts-trigger {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 200;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.85rem;
  background: var(--accent);
  color: var(--bg);
  border: none;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  cursor: pointer;
  transition: opacity 0.15s, transform 0.15s;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.ts-trigger:hover { opacity: 0.88; transform: translateY(-1px); }
.ts-trigger--open { opacity: 0.6; }

/* ── Backdrop ────────────────────────────────────── */
.ts-backdrop {
  position: fixed;
  inset: 0;
  z-index: 300;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
}

/* ── Panel ───────────────────────────────────────── */
.ts-panel {
  width: 100%;
  max-width: 480px;
  background: var(--bg-2);
  border: var(--border-accent);
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow: hidden;
}

/* ── Header ──────────────────────────────────────── */
.ts-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1.25rem 1.5rem 1rem;
  border-bottom: var(--border-dim);
}

.ts-header-title {
  font-family: var(--font-head);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text);
}

.ts-header-sub {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--text-muted);
  letter-spacing: 0.06em;
  margin-top: 0.2rem;
}

.ts-close {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 0.8rem;
  cursor: pointer;
  padding: 0.1rem 0.2rem;
  line-height: 1;
  transition: color 0.12s;
  font-family: var(--font-mono);
}
.ts-close:hover { color: var(--accent); }

/* ── Theme grid ──────────────────────────────────── */
.ts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}

/* ── Theme card ──────────────────────────────────── */
.ts-card {
  padding: 1rem 1.25rem;
  background: var(--bg);
  border: none;
  border-right: var(--border-dim);
  border-bottom: var(--border-dim);
  cursor: pointer;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  transition: background 0.12s;
  position: relative;
}

.ts-card:nth-child(2n) { border-right: none; }
.ts-card:nth-child(3),
.ts-card:nth-child(4) { border-bottom: none; }

.ts-card:hover { background: var(--bg-2); }
.ts-card--active { background: var(--accent-dim); }
.ts-card--active .ts-card-name { color: var(--accent); }

/* ── Swatches ────────────────────────────────────── */
.ts-swatches {
  display: flex;
  gap: 3px;
  margin-bottom: 0.1rem;
}

.ts-swatch {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  outline: 1px solid rgba(128, 128, 128, 0.2);
}

/* ── Card text ───────────────────────────────────── */
.ts-card-name {
  font-family: var(--font-head);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text);
  line-height: 1.2;
}

.ts-card-desc {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.ts-card-badge {
  font-family: var(--font-mono);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--bg);
  background: var(--accent);
  padding: 1px 5px;
  display: inline-block;
  align-self: flex-start;
  margin-top: 0.1rem;
}

/* ── Footer ──────────────────────────────────────── */
.ts-footer {
  padding: 0.75rem 1.5rem;
  border-top: var(--border-dim);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--text-muted);
  letter-spacing: 0.04em;
}

/* ── Transition ──────────────────────────────────── */
.ts-panel-enter-active { transition: transform 0.2s ease, opacity 0.2s ease; }
.ts-panel-leave-active { transition: transform 0.15s ease, opacity 0.15s ease; }
.ts-panel-enter-from  { transform: translateY(12px); opacity: 0; }
.ts-panel-leave-to    { transform: translateY(8px); opacity: 0; }

/* ── Mobile ──────────────────────────────────────── */
@media (max-width: 520px) {
  .ts-backdrop { padding: 0; align-items: flex-end; }
  .ts-panel { max-width: 100%; }
  .ts-grid { grid-template-columns: 1fr 1fr; }
}
</style>
