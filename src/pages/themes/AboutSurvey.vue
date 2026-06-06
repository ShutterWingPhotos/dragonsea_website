<template>
  <div class="about-survey">

    <!-- ═══ PROJECT BRIEF HEADER ═══ -->
    <section class="as-hero">
      <div class="container">
        <div class="as-doc-ref">
          <span>DOCUMENT: DS-ABOUT-001</span>
          <span class="as-sep">·</span>
          <span>{{ t('survey-project-brief') }}</span>
          <span class="as-sep">·</span>
          <span>REV. A</span>
        </div>
        <div class="as-hero-body">
          <div class="as-hero-text">
            <div class="as-annot">{{ t('survey-project-overview') }}</div>
            <h1 class="as-hero-title">{{ t('about-title') }}</h1>
            <p class="as-hero-sub">{{ t('about-subtitle') }}</p>
            <p class="as-hero-desc">{{ t('about-desc') }}</p>
          </div>
          <div class="as-hero-stamp">
            <div class="as-stamp">
              <div class="as-stamp-text">{{ t('survey-stamp') }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ ZONE SPECIFICATIONS (Features) ═══ -->
    <section class="as-section">
      <div class="container">
        <div class="as-sec-hdr">
          <span class="as-zone-ref">{{ t('survey-zone') }} A</span>
          <h2 class="as-sec-title">{{ t('survey-zone-specs') }}</h2>
        </div>
        <div class="as-specs">
          <div class="as-spec" v-for="(f, i) in features" :key="i">
            <div class="as-spec__brackets">
              <span class="brk brk--tl"></span><span class="brk brk--tr"></span>
              <span class="brk brk--bl"></span><span class="brk brk--br"></span>
            </div>
            <div class="as-spec__ref">SPEC-{{ String(i + 1).padStart(2, '0') }}</div>
            <h3 class="as-spec__title">{{ t(f.titleKey) }}</h3>
            <p class="as-spec__desc">{{ t(f.descKey) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ DEVELOPMENT LOG (Timeline) ═══ -->
    <section class="as-section">
      <div class="container">
        <div class="as-sec-hdr">
          <span class="as-zone-ref">{{ t('survey-zone') }} B</span>
          <h2 class="as-sec-title">{{ t('roadmap-title') }}</h2>
        </div>
        <div class="as-log">
          <div class="as-log-hdr">
            <span>{{ t('survey-log-entry') }}</span><span>{{ t('survey-log-title') }}</span><span>{{ t('survey-log-notes') }}</span><span class="as-log-col-status">{{ t('survey-log-status') }}</span>
          </div>
          <div class="as-log-row" v-for="(item, i) in roadmap" :key="i">
            <span class="as-log-entry">REF-{{ String(i + 1).padStart(3, '0') }}</span>
            <span class="as-log-title">{{ t(item.titleKey) }}</span>
            <span class="as-log-notes">{{ t(item.descKey) }}</span>
            <span class="as-log-col-status as-badge">{{ t('survey-complete') }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ FIELD TEAM (Team) ═══ -->
    <section class="as-section">
      <div class="container">
        <div class="as-sec-hdr">
          <span class="as-zone-ref">{{ t('survey-zone') }} C</span>
          <h2 class="as-sec-title">{{ t('team-title') }}</h2>
        </div>
        <div class="as-team">
          <div class="as-team-card" v-for="(m, i) in team" :key="i">
            <div class="as-team-card__id">{{ m.initial }}</div>
            <div class="as-team-card__info">
              <div class="as-team-card__name">{{ t(m.nameKey) }}</div>
              <div class="as-team-card__role">{{ t(m.roleKey) }}</div>
            </div>
            <div class="as-team-card__field">
              <div class="as-annot-label">{{ t('survey-clearance') }}</div>
              <div class="as-annot-val">{{ t('survey-admin') }}</div>
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
.about-survey { min-height: 100vh; font-family: var(--font-mono); }

.as-hero { padding: 2.5rem 0; border-bottom: 2px solid var(--accent); }

.as-doc-ref {
  display: flex; align-items: center; gap: 0.75rem;
  font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--text-muted); padding: 0.4rem 0.75rem;
  border: 1px solid var(--border-dim); background: var(--bg-2);
  margin-bottom: 2rem; width: fit-content;
}
.as-sep { color: var(--border-dim); }

.as-hero-body { display: flex; gap: 3rem; align-items: flex-start; }
.as-hero-text { flex: 1; }

.as-annot { font-size: 0.72rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem; }

.as-hero-title {
  font-family: var(--font-head); font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700; text-transform: uppercase; letter-spacing: 0.02em;
  color: var(--accent); margin-bottom: 0.75rem;
}

.as-hero-sub {
  font-size: 0.92rem; letter-spacing: 0.08em; color: var(--accent-red);
  text-transform: uppercase; border-left: 2px solid var(--accent-red);
  padding-left: 1rem; margin-bottom: 1.25rem;
}

.as-hero-desc {
  font-size: 0.93rem; color: var(--text-muted); max-width: 680px; line-height: 1.8;
}

.as-stamp {
  width: 6rem; height: 6rem;
  border: 3px solid var(--accent-red);
  display: flex; align-items: center; justify-content: center;
  padding: 0.5rem; transform: rotate(-8deg);
  color: var(--accent-red); opacity: 0.7; flex-shrink: 0;
}

.as-stamp-text {
  font-family: var(--font-head); font-size: 0.65rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.08em; text-align: center; line-height: 1.4;
}

.as-section { padding: 3rem 0; border-bottom: 1px dashed var(--border-dim); }

.as-sec-hdr { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; }

.as-zone-ref {
  font-size: 0.72rem; letter-spacing: 0.2em; padding: 2px 7px;
  border: 1px solid var(--accent); color: var(--accent); white-space: nowrap;
}

.as-sec-title {
  font-family: var(--font-head); font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text);
}

/* Specs */
.as-specs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }

.as-spec {
  position: relative; padding: 1.5rem 1.25rem;
  background: var(--bg-2); display: flex; flex-direction: column; gap: 0.5rem;
}

.as-spec__brackets { position: absolute; inset: 0; pointer-events: none; }
.brk { position: absolute; width: 10px; height: 10px; border-color: var(--accent); border-style: solid; }
.brk--tl { top: 0; left: 0; border-width: 2px 0 0 2px; }
.brk--tr { top: 0; right: 0; border-width: 2px 2px 0 0; }
.brk--bl { bottom: 0; left: 0; border-width: 0 0 2px 2px; }
.brk--br { bottom: 0; right: 0; border-width: 0 2px 2px 0; }

.as-spec__ref { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent-red); }
.as-spec__title { font-family: var(--font-head); font-size: 1.05rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text); }
.as-spec__desc { font-size: 0.88rem; color: var(--text-muted); line-height: 1.7; }

/* Log */
.as-log { border: 2px solid var(--accent); overflow: hidden; }

.as-log-hdr {
  display: grid; grid-template-columns: 90px 1fr 2fr 90px;
  padding: 0.5rem 1.25rem;
  font-size: 0.72rem; letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--text-muted); background: var(--accent);
  color: #F5F1E8;
}

.as-log-row {
  display: grid; grid-template-columns: 90px 1fr 2fr 90px;
  padding: 0.85rem 1.25rem; align-items: center;
  border-bottom: 1px dashed var(--border-dim); font-size: 0.78rem;
}
.as-log-row:last-child { border-bottom: none; }

.as-log-entry { font-size: 0.8rem; letter-spacing: 0.1em; color: var(--accent); }
.as-log-title { font-family: var(--font-head); font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; font-size: 0.92rem; }
.as-log-notes { font-size: 0.82rem; color: var(--text-muted); }
.as-log-col-status { text-align: right; }

.as-badge {
  font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; padding: 2px 6px;
  border: 1px solid #2D6A4F; color: #2D6A4F;
}

/* Team */
.as-team { display: flex; flex-direction: column; gap: 1.5rem; }

.as-team-card {
  display: flex; align-items: center; gap: 1.5rem;
  padding: 1.5rem; background: var(--bg-2);
  border: 1px solid var(--border-dim); border-left: 3px solid var(--accent);
}

.as-team-card__id {
  width: 2.75rem; height: 2.75rem;
  background: var(--accent); color: #F5F1E8;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-head); font-size: 1.2rem; font-weight: 700; flex-shrink: 0;
}

.as-team-card__name { font-family: var(--font-head); font-size: 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text); margin-bottom: 0.25rem; }
.as-team-card__role { font-size: 0.82rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-muted); }

.as-team-card__field {
  margin-left: auto; text-align: right;
}

.as-annot-label { font-size: 0.68rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--text-muted); }
.as-annot-val { font-family: var(--font-head); font-size: 0.92rem; font-weight: 700; text-transform: uppercase; color: var(--accent); }

@media (max-width: 768px) {
  .as-hero-body { flex-direction: column; gap: 1.5rem; }
  .as-stamp { display: none; }
  .as-specs { grid-template-columns: 1fr; }
  .as-log-hdr, .as-log-row { grid-template-columns: 70px 1fr 70px; }
  .as-log-notes { display: none; }
}
</style>
