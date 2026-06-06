<template>
  <div class="about-fids">

    <!-- ═══ FLIGHT MANIFEST HEADER ═══ -->
    <section class="af-hero">
      <div class="container">
        <div class="af-hero-board">
          <div class="af-board-hdr">
            <span>ARRIVALS — CREW INFORMATION</span>
            <span class="af-board-hdr__sub">DRAGONSEA METROPOLITAN TERMINAL</span>
          </div>
          <div class="af-hero-title">{{ t('about-title') }}</div>
          <div class="af-hero-sub">{{ t('about-subtitle') }}</div>
          <p class="af-hero-desc">{{ t('about-desc') }}</p>
        </div>
      </div>
    </section>

    <!-- ═══ GATE INFORMATION (Features) ═══ -->
    <section class="af-section">
      <div class="container">
        <div class="af-sec-hdr">
          <span class="af-sec-label">GATE INFORMATION</span>
        </div>
        <div class="af-gates">
          <div class="af-gate" v-for="(f, i) in features" :key="i" :style="{ '--gate-delay': (i * 0.15) + 's' }">
            <div class="af-gate__num">GATE {{ String(i + 1).padStart(2, '0') }}</div>
            <div class="af-gate__title">{{ t(f.titleKey) }}</div>
            <p class="af-gate__desc">{{ t(f.descKey) }}</p>
            <div class="af-gate__status">OPEN</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ FLIGHT LOG (Timeline/Roadmap) ═══ -->
    <section class="af-section">
      <div class="container">
        <div class="af-sec-hdr">
          <span class="af-sec-label">FLIGHT LOG</span>
          <span class="af-sec-sub">{{ t('roadmap-title') }}</span>
        </div>
        <div class="af-log">
          <div class="af-log-hdr-row">
            <span>FLIGHT</span>
            <span>ROUTE</span>
            <span>DETAILS</span>
            <span class="af-log-col-status">STATUS</span>
          </div>
          <div
            class="af-log-row"
            v-for="(item, i) in roadmap"
            :key="i"
            :style="{ '--log-delay': (i * 0.1) + 's' }"
          >
            <span class="af-log-flight">DS-{{ String(i + 1).padStart(3, '0') }}</span>
            <span class="af-log-route">{{ t(item.titleKey) }}</span>
            <span class="af-log-detail">{{ t(item.descKey) }}</span>
            <span class="af-log-col-status af-log-badge af-badge--done">COMPLETED</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CREW ROSTER (Team) ═══ -->
    <section class="af-section">
      <div class="container">
        <div class="af-sec-hdr">
          <span class="af-sec-label">CREW ROSTER</span>
          <span class="af-sec-sub">{{ t('team-title') }}</span>
        </div>
        <div class="af-crew">
          <div class="af-crew-card" v-for="(m, i) in team" :key="i">
            <div class="af-crew-card__badge">{{ m.initial }}</div>
            <div class="af-crew-card__info">
              <div class="af-crew-card__name">{{ t(m.nameKey) }}</div>
              <div class="af-crew-card__role">{{ t(m.roleKey) }}</div>
            </div>
            <div class="af-crew-card__status">ACTIVE</div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const features = [
  { titleKey: 'feature-creative', descKey: 'feature-creative-desc' },
  { titleKey: 'feature-community', descKey: 'feature-community-desc' },
  { titleKey: 'feature-events', descKey: 'feature-events-desc' },
]
const roadmap = [
  { titleKey: 'roadmap-1-title', descKey: 'roadmap-1-desc' },
  { titleKey: 'roadmap-2-title', descKey: 'roadmap-2-desc' },
  { titleKey: 'roadmap-3-title', descKey: 'roadmap-3-desc' },
  { titleKey: 'roadmap-4-title', descKey: 'roadmap-4-desc' },
  { titleKey: 'roadmap-5-title', descKey: 'roadmap-5-desc' },
  { titleKey: 'roadmap-6-title', descKey: 'roadmap-6-desc' },
]
const team = [
  { nameKey: 'team-1-name', roleKey: 'team-1-desc', initial: 'L' },
  { nameKey: 'team-2-name', roleKey: 'team-2-desc', initial: 'A' },
]
</script>

<style scoped>
.about-fids { min-height: 100vh; font-family: var(--font-mono); }

.af-hero { padding: 2.5rem 0; border-bottom: 1px solid var(--border-dim); }

.af-hero-board {
  border: var(--border-accent);
  overflow: hidden;
}

.af-board-hdr {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 1.25rem;
  background: var(--accent);
  color: var(--bg);
  font-family: var(--font-head);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.af-board-hdr__sub { font-weight: 400; opacity: 0.7; font-size: 0.65rem; }

.af-hero-title {
  font-family: var(--font-head);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text);
  padding: 1.5rem 1.25rem 0.5rem;
}

.af-hero-sub {
  padding: 0 1.25rem;
  font-size: 0.82rem;
  letter-spacing: 0.12em;
  color: var(--accent);
  text-transform: uppercase;
  border-left: 3px solid var(--accent);
  margin: 0 1.25rem 1rem;
}

.af-hero-desc {
  padding: 0 1.25rem 1.5rem;
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.8;
  max-width: 700px;
}

/* Sections */
.af-section { padding: 2.5rem 0; border-bottom: 1px solid var(--border-dim); }

.af-sec-hdr {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.af-sec-label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  background: var(--accent);
  color: var(--bg);
  padding: 2px 8px;
}

.af-sec-sub {
  font-family: var(--font-head);
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text);
}

/* Gates */
.af-gates { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }

.af-gate {
  padding: 1.5rem 1.25rem;
  background: var(--bg-2);
  border: 1px solid var(--border-dim);
  border-top: 3px solid var(--accent);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  opacity: 0;
  animation: fids-in 0.3s ease forwards;
  animation-delay: var(--gate-delay, 0s);
}

.af-gate__num { font-size: 0.6rem; letter-spacing: 0.2em; color: var(--accent); text-transform: uppercase; }
.af-gate__title { font-family: var(--font-head); font-size: 1rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text); }
.af-gate__desc { font-size: 0.78rem; color: var(--text-muted); line-height: 1.7; flex: 1; }
.af-gate__status { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.15em; padding: 2px 7px; background: rgba(0,200,83,0.12); color: #00C853; align-self: flex-start; margin-top: 0.5rem; }

/* Flight log */
.af-log { border: var(--border-accent); overflow: hidden; }

.af-log-hdr-row {
  display: grid;
  grid-template-columns: 90px 1fr 2fr 100px;
  padding: 0.5rem 1.25rem;
  font-size: 0.6rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--text-muted);
  background: var(--bg-2);
  border-bottom: 1px solid var(--border-dim);
}

.af-log-row {
  display: grid;
  grid-template-columns: 90px 1fr 2fr 100px;
  padding: 0.85rem 1.25rem;
  align-items: center;
  border-bottom: 1px solid var(--border-dim);
  font-size: 0.78rem;
  opacity: 0;
  animation: fids-in 0.25s ease forwards;
  animation-delay: var(--log-delay, 0s);
}
.af-log-row:last-child { border-bottom: none; }

.af-log-flight { font-weight: 700; color: var(--accent); font-size: 0.8rem; }
.af-log-route  { font-family: var(--font-head); font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; font-size: 0.85rem; }
.af-log-detail { color: var(--text-muted); font-size: 0.72rem; }
.af-log-col-status { text-align: right; }
.af-log-badge { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.12em; padding: 2px 6px; display: inline-block; }
.af-badge--done { background: rgba(0,200,83,0.1); color: #00C853; }

/* Crew */
.af-crew { display: flex; flex-direction: column; gap: 2px; }

.af-crew-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.25rem 1.5rem;
  background: var(--bg-2);
  border: 1px solid var(--border-dim);
  border-left: 4px solid var(--accent);
}

.af-crew-card__badge {
  width: 2.5rem; height: 2.5rem;
  background: var(--accent);
  color: var(--bg);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-head); font-size: 1.1rem; font-weight: 700;
  flex-shrink: 0;
}

.af-crew-card__name  { font-family: var(--font-head); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
.af-crew-card__role  { font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); margin-top: 0.2rem; }
.af-crew-card__status { margin-left: auto; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.15em; padding: 2px 7px; background: rgba(0,200,83,0.1); color: #00C853; white-space: nowrap; }

@keyframes fids-in {
  from { opacity: 0; transform: translateX(6px); }
  to   { opacity: 1; transform: translateX(0); }
}

@media (max-width: 768px) {
  .af-gates { grid-template-columns: 1fr; }
  .af-log-hdr-row,
  .af-log-row { grid-template-columns: 80px 1fr 80px; }
  .af-log-detail { display: none; }
}
</style>
