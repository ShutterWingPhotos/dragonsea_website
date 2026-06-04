<template>
  <div class="about">

    <!-- ═══ HEADER ═══ -->
    <section class="about-hero">
      <div class="container">
        <span class="sec-label">ABOUT</span>
        <h1 class="about-hero__title">{{ t('about-title') }}</h1>
        <p class="about-hero__sub">{{ t('about-subtitle') }}</p>
        <p class="about-hero__desc">{{ t('about-desc') }}</p>
      </div>
    </section>

    <hr class="divider">

    <!-- ═══ FEATURES ═══ -->
    <section class="section">
      <div class="container">
        <span class="sec-label">01 — FEATURES</span>
        <div class="features-grid">

          <div class="feature-card card-hover">
            <div class="feature-card__num">01</div>
            <div class="feature-card__icon">◈</div>
            <h3 class="feature-card__title">{{ t('feature-creative') }}</h3>
            <p class="feature-card__desc">{{ t('feature-creative-desc') }}</p>
          </div>

          <div class="feature-card card-hover">
            <div class="feature-card__num">02</div>
            <div class="feature-card__icon">◉</div>
            <h3 class="feature-card__title">{{ t('feature-community') }}</h3>
            <p class="feature-card__desc">{{ t('feature-community-desc') }}</p>
          </div>

          <div class="feature-card card-hover">
            <div class="feature-card__num">03</div>
            <div class="feature-card__icon">◫</div>
            <h3 class="feature-card__title">{{ t('feature-events') }}</h3>
            <p class="feature-card__desc">{{ t('feature-events-desc') }}</p>
          </div>

        </div>
      </div>
    </section>

    <hr class="divider">

    <!-- ═══ ROADMAP ═══ -->
    <section class="section">
      <div class="container">
        <span class="sec-label">02 — HISTORY</span>
        <h2 class="sec-title">{{ t('roadmap-title') }}</h2>

        <div class="timeline">
          <div
            v-for="(item, i) in roadmap"
            :key="i"
            class="timeline-item"
          >
            <div class="timeline-item__marker">
              <span>{{ String(i + 1).padStart(2, '0') }}</span>
            </div>
            <div class="timeline-item__content">
              <h4 class="timeline-item__title">{{ t(item.titleKey) }}</h4>
              <p class="timeline-item__desc">{{ t(item.descKey) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <hr class="divider">

    <!-- ═══ TEAM ═══ -->
    <section class="section">
      <div class="container">
        <span class="sec-label">03 — TEAM</span>
        <h2 class="sec-title">{{ t('team-title') }}</h2>

        <div class="team-grid">
          <div class="team-card card-hover" v-for="(member, i) in team" :key="i">
            <div class="team-card__avatar" :style="{ background: member.color }">
              {{ member.initial }}
            </div>
            <div class="team-card__info">
              <div class="team-card__name">{{ t(member.nameKey) }}</div>
              <div class="team-card__role">{{ t(member.roleKey) }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const roadmap = [
  { titleKey: 'roadmap-1-title', descKey: 'roadmap-1-desc' },
  { titleKey: 'roadmap-2-title', descKey: 'roadmap-2-desc' },
  { titleKey: 'roadmap-3-title', descKey: 'roadmap-3-desc' },
  { titleKey: 'roadmap-4-title', descKey: 'roadmap-4-desc' },
  { titleKey: 'roadmap-5-title', descKey: 'roadmap-5-desc' },
  { titleKey: 'roadmap-6-title', descKey: 'roadmap-6-desc' },
]

const team = [
  { nameKey: 'team-1-name', roleKey: 'team-1-desc', initial: 'L', color: 'linear-gradient(135deg, #0f2a18, #1a4a2a)' },
  { nameKey: 'team-2-name', roleKey: 'team-2-desc', initial: 'A', color: 'linear-gradient(135deg, #1a1520, #2a1a38)' },
]
</script>

<style scoped>
/* ── About Hero ───────────────────────────── */
.about-hero {
  padding: 4rem 0 3.5rem;
}

.about-hero__title {
  font-family: var(--font-head);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  line-height: 1.05;
  color: var(--text);
  margin: 0.75rem 0 1rem;
}

.about-hero__sub {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.15em;
  color: var(--accent);
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  border-left: 3px solid var(--accent);
  padding-left: 1rem;
}

.about-hero__desc {
  font-family: var(--font-mono);
  font-size: 0.88rem;
  color: var(--text-muted);
  max-width: 680px;
  line-height: 1.8;
}

/* ── Features ─────────────────────────────── */
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: var(--border-accent);
  margin-top: 1.5rem;
}

.feature-card {
  padding: 2rem 1.75rem;
  border-right: 2px solid var(--accent);
  position: relative;
  overflow: hidden;
  background: var(--bg);
}

.feature-card:last-child {
  border-right: none;
}

.feature-card__num {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  color: #282828;
  margin-bottom: 1rem;
}

.feature-card__icon {
  font-size: 1.75rem;
  color: var(--accent);
  margin-bottom: 1rem;
  display: block;
}

.feature-card__title {
  font-family: var(--font-head);
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text);
  margin-bottom: 0.75rem;
}

.feature-card__desc {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-muted);
  line-height: 1.75;
}

/* ── Timeline ─────────────────────────────── */
.timeline {
  position: relative;
  padding-left: 4rem;
  margin-top: 2.5rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 1.1rem;
  top: 1rem;
  bottom: 1rem;
  width: 2px;
  background: linear-gradient(to bottom, var(--accent) 0%, rgba(92, 255, 138, 0.1) 100%);
}

.timeline-item {
  position: relative;
  padding-bottom: 2.5rem;
  display: flex;
  gap: 1.5rem;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-item__marker {
  position: absolute;
  left: -3.1rem;
  top: 0;
  width: 2rem;
  height: 2rem;
  background: var(--bg);
  border: 2px solid var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 700;
  color: var(--accent);
  flex-shrink: 0;
}

.timeline-item__content {
  flex: 1;
  padding-top: 0.2rem;
}

.timeline-item__title {
  font-family: var(--font-head);
  font-size: 0.95rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text);
  margin-bottom: 0.4rem;
}

.timeline-item__desc {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-muted);
  line-height: 1.65;
}

/* ── Team ─────────────────────────────────── */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2px;
  margin-top: 1.5rem;
}

.team-card {
  border: var(--border-accent);
  padding: 1.75rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  background: var(--bg);
}

.team-card__avatar {
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-head);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--accent);
  border: 2px solid var(--accent);
  flex-shrink: 0;
}

.team-card__name {
  font-family: var(--font-mono);
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.25rem;
}

.team-card__role {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}

/* ── Responsive ───────────────────────────── */
@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
  .feature-card {
    border-right: none;
    border-bottom: 2px solid var(--accent);
  }
  .feature-card:last-child {
    border-bottom: none;
  }
  .about-hero__title {
    font-size: clamp(1.75rem, 7vw, 2.5rem);
  }
  .timeline {
    padding-left: 3rem;
  }
  .timeline-item__marker {
    left: -2.4rem;
    width: 1.75rem;
    height: 1.75rem;
  }
}

@media (max-width: 480px) {
  .about-hero {
    padding: 2.5rem 0 2rem;
  }
  .about-hero__sub {
    font-size: 0.75rem;
    letter-spacing: 0.08em;
  }
  .timeline {
    padding-left: 2.5rem;
  }
  .timeline-item__marker {
    left: -2rem;
    width: 1.5rem;
    height: 1.5rem;
    font-size: 0.55rem;
  }
  .team-grid {
    grid-template-columns: 1fr;
  }
}
</style>
