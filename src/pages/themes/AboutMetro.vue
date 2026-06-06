<template>
  <div class="about-metro">

    <!-- ═══ SYSTEM INFO HERO ═══ -->
    <section class="am-hero">
      <div class="container">
        <div class="am-hero-tag">
          <span class="am-line-tag line-a">A</span>
          <span class="am-hero-route">{{ t('nav-about').toUpperCase() }}</span>
          <span class="am-line-tag line-b">B</span>
        </div>
        <h1 class="am-hero-title">{{ t('about-title') }}</h1>
        <p class="am-hero-sub">{{ t('about-subtitle') }}</p>
        <p class="am-hero-desc">{{ t('about-desc') }}</p>
      </div>
    </section>

    <!-- ═══ SERVICE FEATURES ═══ -->
    <section class="am-section">
      <div class="container">
        <div class="am-sec-hdr">
          <div class="am-station-dot" style="color:#D22B2B">⬤</div>
          <h2 class="am-sec-title">SERVICES</h2>
          <div class="am-line-dec" style="background:#D22B2B"></div>
        </div>
        <div class="am-services">
          <div class="am-service" v-for="(f, i) in features" :key="i">
            <div class="am-service__line" :style="{ background: lineColors[i] }"></div>
            <div class="am-service__body">
              <div class="am-service__num">{{ String(i + 1).padStart(2, '0') }}</div>
              <h3 class="am-service__title">{{ t(f.titleKey) }}</h3>
              <p class="am-service__desc">{{ t(f.descKey) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ LINE HISTORY (Timeline) ═══ -->
    <section class="am-section">
      <div class="container">
        <div class="am-sec-hdr">
          <div class="am-station-dot" style="color:#1A56DB">⬤</div>
          <h2 class="am-sec-title">{{ t('roadmap-title') }}</h2>
          <div class="am-line-dec" style="background:#1A56DB"></div>
        </div>
        <div class="am-timeline">
          <div class="am-timeline-track" :style="{ background: 'linear-gradient(to bottom, #1A56DB 0%, rgba(26,86,219,0.1) 100%)' }"></div>
          <div class="am-timeline-item" v-for="(item, i) in roadmap" :key="i">
            <div class="am-tl-dot" :class="i % 3 === 0 ? 'dot--a' : i % 3 === 1 ? 'dot--b' : 'dot--c'"></div>
            <div class="am-tl-content">
              <div class="am-tl-num">DS-{{ String(i + 1).padStart(2, '0') }}</div>
              <div class="am-tl-title">{{ t(item.titleKey) }}</div>
              <div class="am-tl-desc">{{ t(item.descKey) }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ OPERATIONS TEAM ═══ -->
    <section class="am-section">
      <div class="container">
        <div class="am-sec-hdr">
          <div class="am-station-dot" style="color:#1A7C3A">⬤</div>
          <h2 class="am-sec-title">{{ t('team-title') }}</h2>
          <div class="am-line-dec" style="background:#1A7C3A"></div>
        </div>
        <div class="am-team">
          <div class="am-team-card" v-for="(m, i) in team" :key="i">
            <div class="am-team-card__avatar" :style="{ background: teamColors[i] }">{{ m.initial }}</div>
            <div class="am-team-card__info">
              <div class="am-team-card__name">{{ t(m.nameKey) }}</div>
              <div class="am-team-card__role">{{ t(m.roleKey) }}</div>
            </div>
            <div class="am-team-card__line" :style="{ background: lineColors[i] }"></div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const lineColors = ['#D22B2B', '#1A56DB', '#1A7C3A']
const teamColors = ['#D22B2B', '#1A56DB']
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
.about-metro { min-height: 100vh; }

.am-hero { padding: 4rem 0 3rem; border-bottom: 3px solid var(--accent); }

.am-hero-tag {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.am-line-tag {
  width: 1.8rem; height: 1.8rem;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-head); font-size: 0.8rem; font-weight: 700; color: #fff;
}
.line-a { background: #D22B2B; }
.line-b { background: #1A56DB; }

.am-hero-route {
  font-family: var(--font-mono);
  font-size: 0.65rem; letter-spacing: 0.2em; color: var(--text-muted);
}

.am-hero-title {
  font-family: var(--font-head);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.02em; color: var(--text);
  margin-bottom: 0.75rem;
}

.am-hero-sub {
  font-family: var(--font-mono); font-size: 0.82rem;
  letter-spacing: 0.1em; color: var(--accent);
  text-transform: uppercase;
  border-left: 3px solid var(--accent);
  padding-left: 1rem; margin-bottom: 1.25rem;
}

.am-hero-desc {
  font-family: var(--font-mono); font-size: 0.85rem;
  color: var(--text-muted); max-width: 680px; line-height: 1.8;
}

.am-section { padding: 3rem 0; border-bottom: 1px solid var(--border-dim); }

.am-sec-hdr {
  display: flex; align-items: center; gap: 0.75rem; margin-bottom: 2rem;
}
.am-station-dot { font-size: 0.7rem; flex-shrink: 0; }
.am-sec-title {
  font-family: var(--font-head); font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em;
  color: var(--text); white-space: nowrap;
}
.am-line-dec { flex: 1; height: 3px; opacity: 0.25; }

/* Services */
.am-services {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px;
}

.am-service {
  display: flex; flex-direction: row; overflow: hidden;
  background: var(--bg-2); border: 1px solid var(--border-dim);
  transition: transform 0.12s, box-shadow 0.12s;
}
.am-service:hover { transform: translateY(-3px); box-shadow: 0 6px 20px rgba(0,0,0,0.1); }

.am-service__line { width: 5px; flex-shrink: 0; }

.am-service__body { padding: 1.5rem 1.25rem; display: flex; flex-direction: column; gap: 0.4rem; }

.am-service__num { font-family: var(--font-mono); font-size: 0.6rem; letter-spacing: 0.2em; color: var(--text-muted); }
.am-service__title { font-family: var(--font-head); font-size: 0.95rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text); }
.am-service__desc { font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-muted); line-height: 1.7; }

/* Timeline */
.am-timeline { position: relative; padding-left: 3rem; }

.am-timeline-track {
  position: absolute; left: 0.6rem; top: 0.5rem; bottom: 0.5rem; width: 3px;
}

.am-timeline-item {
  position: relative; padding-bottom: 2rem; display: flex; gap: 1.5rem;
}
.am-timeline-item:last-child { padding-bottom: 0; }

.am-tl-dot {
  position: absolute; left: -2.4rem; top: 0.1rem;
  width: 1rem; height: 1rem;
  border: 2px solid; background: var(--bg);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.dot--a { border-color: #D22B2B; }
.dot--b { border-color: #1A56DB; }
.dot--c { border-color: #1A7C3A; }

.am-tl-content { flex: 1; }
.am-tl-num { font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.15em; color: var(--accent); text-transform: uppercase; margin-bottom: 0.25rem; }
.am-tl-title { font-family: var(--font-head); font-size: 0.95rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text); margin-bottom: 0.3rem; }
.am-tl-desc { font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-muted); line-height: 1.65; }

/* Team */
.am-team { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2px; }

.am-team-card {
  display: flex; align-items: center; gap: 1.25rem;
  padding: 1.5rem; background: var(--bg-2); border: 1px solid var(--border-dim);
  position: relative; overflow: hidden;
  transition: transform 0.12s, box-shadow 0.12s;
}
.am-team-card:hover { transform: translateY(-3px); box-shadow: 0 6px 20px rgba(0,0,0,0.1); }

.am-team-card__avatar {
  width: 3rem; height: 3rem; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-head); font-size: 1.2rem; font-weight: 700; color: #fff;
  flex-shrink: 0;
}

.am-team-card__name { font-family: var(--font-mono); font-size: 0.9rem; font-weight: 700; color: var(--text); margin-bottom: 0.2rem; }
.am-team-card__role { font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-muted); }

.am-team-card__line {
  position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
}

@media (max-width: 768px) {
  .am-services { grid-template-columns: 1fr; }
}
</style>
