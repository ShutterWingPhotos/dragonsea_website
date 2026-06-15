<template>
  <div class="survey-home">

    <!-- ═══ DOCUMENT HEADER HERO ═══ -->
    <section class="survey-hero">
      <div class="container survey-hero__inner">

        <!-- Engineering doc header bar -->
        <div class="survey-doc-bar">
          <div class="survey-doc-bar__left">
            <span class="survey-doc-ref">PROJECT REF: DS-MC-001</span>
            <span class="survey-doc-sep">·</span>
            <span class="survey-doc-rev">REV. A</span>
          </div>
          <div class="survey-doc-bar__right">
            <span class="survey-doc-date">ISSUED: 2025-01-22</span>
            <span class="survey-doc-sep">·</span>
            <span class="survey-doc-scale">SCALE 1:1000</span>
          </div>
        </div>

        <!-- Title block -->
        <div class="survey-title-block">
          <div class="survey-title-block__annot">{{ t('survey-project-title') }}</div>
          <h1 class="survey-title">
            <span class="survey-title-main">{{ t('survey-title-main') }}</span>
            <span class="survey-title-sub">{{ t('survey-title-sub') }}</span>
          </h1>
          <p class="survey-tagline">{{ t('subtitle') }}</p>

          <!-- Annotation callout -->
          <div class="survey-callout">
            <div class="survey-callout__line"></div>
            <div class="survey-callout__box">
              <span class="survey-callout__label">COORD.</span>
              <span class="survey-callout__val">N 39°54' · E 116°23' · ELEV. 64M</span>
            </div>
          </div>
        </div>

        <!-- Site data table -->
        <div class="survey-data-table">
          <div class="survey-data-cell">
            <div class="survey-data-cell__label">{{ t('survey-network-status') }}</div>
            <div class="survey-data-cell__val" :class="hasError ? 'val--warn' : (online ? 'val--ok' : 'val--warn')">
              {{ loading ? '...' : hasError ? t('error') : (online ? t('survey-operational') : t('survey-offline')) }}
            </div>
          </div>
          <div class="survey-data-cell" :title="onlineNamesTitle">
            <div class="survey-data-cell__label">{{ t('survey-active-residents') }}</div>
            <div class="survey-data-cell__val">
              {{ loading ? '—' : hasError ? '—' : userCount }}<span class="survey-dim"> / 128</span>
            </div>
            <div v-if="!hasError && users.length > 0" class="survey-data-cell__names">{{ users.join(' · ') }}</div>
          </div>
          <div class="survey-data-cell">
            <div class="survey-data-cell__label">{{ t('survey-signal-latency') }}</div>
            <div class="survey-data-cell__val" :class="latencyClass">
              {{ loading ? '—' : hasError ? '—' : latency }}<span class="survey-dim"> ms</span>
            </div>
          </div>
          <a class="survey-data-cell survey-data-cell--addr" href="https://qm.qq.com/q/pmQKzsZJV6" target="_blank">
            <div class="survey-data-cell__label">{{ t('survey-server-address') }}</div>
            <div class="survey-data-cell__val survey-data-cell__val--addr">
              {{ t('survey-invite-only') }}
            </div>
          </a>
        </div>

      </div>

      <!-- SVG skyline rising from the bottom -->
      <svg class="survey-skyline" viewBox="0 0 1400 400" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <defs>
          <!-- All windows grid -->
          <pattern id="win-all" x="0" y="0" width="12" height="16" patternUnits="userSpaceOnUse">
            <rect x="2" y="3"  width="3" height="4" fill="#F5F1E8" opacity="0.28"/>
            <rect x="7" y="3"  width="3" height="4" fill="#F5F1E8" opacity="0.28"/>
            <rect x="2" y="10" width="3" height="4" fill="#F5F1E8" opacity="0.28"/>
            <rect x="7" y="10" width="3" height="4" fill="#F5F1E8" opacity="0.28"/>
          </pattern>
          <!-- Randomly lit windows — warm amber, sparser tile so ~30% are lit -->
          <pattern id="win-lit" x="5" y="8" width="26" height="34" patternUnits="userSpaceOnUse">
            <rect x="2" y="3"  width="3" height="4" fill="#F5C030" opacity="0.75"/>
            <rect x="15" y="18" width="3" height="4" fill="#F5C030" opacity="0.75"/>
          </pattern>
          <!-- Cool-white lit windows — offset for variety -->
          <pattern id="win-lit2" x="12" y="4" width="26" height="34" patternUnits="userSpaceOnUse">
            <rect x="2" y="3"  width="3" height="4" fill="#D8EEF8" opacity="0.65"/>
            <rect x="15" y="18" width="3" height="4" fill="#D8EEF8" opacity="0.65"/>
          </pattern>
        </defs>

        <!-- Each building: base silhouette + window grid + random lit windows -->
        <g class="survey-bld" style="--d:0.05s">
          <rect x="0"    y="310" width="50"  height="90"  fill="var(--accent)" opacity="0.22"/>
          <rect x="0"    y="310" width="50"  height="90"  fill="url(#win-all)"/>
          <rect x="0"    y="310" width="50"  height="90"  fill="url(#win-lit2)"/>
        </g>
        <g class="survey-bld" style="--d:0.08s">
          <rect x="55"   y="250" width="35"  height="150" fill="var(--accent)" opacity="0.22"/>
          <rect x="55"   y="250" width="35"  height="150" fill="url(#win-all)"/>
          <rect x="55"   y="250" width="35"  height="150" fill="url(#win-lit)"/>
        </g>
        <g class="survey-bld" style="--d:0.10s">
          <rect x="95"   y="285" width="60"  height="115" fill="var(--accent)" opacity="0.20"/>
          <rect x="95"   y="285" width="60"  height="115" fill="url(#win-all)"/>
          <rect x="95"   y="285" width="60"  height="115" fill="url(#win-lit2)"/>
        </g>
        <g class="survey-bld" style="--d:0.13s">
          <rect x="160"  y="200" width="40"  height="200" fill="var(--accent)" opacity="0.24"/>
          <rect x="160"  y="200" width="40"  height="200" fill="url(#win-all)"/>
          <rect x="160"  y="200" width="40"  height="200" fill="url(#win-lit)"/>
        </g>
        <g class="survey-bld" style="--d:0.16s">
          <rect x="205"  y="155" width="72"  height="245" fill="var(--accent)" opacity="0.26"/>
          <rect x="205"  y="155" width="72"  height="245" fill="url(#win-all)"/>
          <rect x="205"  y="155" width="72"  height="245" fill="url(#win-lit2)"/>
        </g>
        <g class="survey-bld" style="--d:0.20s">
          <rect x="282"  y="225" width="44"  height="175" fill="var(--accent)" opacity="0.21"/>
          <rect x="282"  y="225" width="44"  height="175" fill="url(#win-all)"/>
          <rect x="282"  y="225" width="44"  height="175" fill="url(#win-lit)"/>
        </g>
        <g class="survey-bld" style="--d:0.22s">
          <rect x="331"  y="275" width="33"  height="125" fill="var(--accent)" opacity="0.19"/>
          <rect x="331"  y="275" width="33"  height="125" fill="url(#win-all)"/>
          <rect x="331"  y="275" width="33"  height="125" fill="url(#win-lit2)"/>
        </g>
        <g class="survey-bld" style="--d:0.25s">
          <rect x="369"  y="115" width="86"  height="285" fill="var(--accent)" opacity="0.28"/>
          <rect x="369"  y="115" width="86"  height="285" fill="url(#win-all)"/>
          <rect x="369"  y="115" width="86"  height="285" fill="url(#win-lit)"/>
        </g>
        <g class="survey-bld" style="--d:0.28s">
          <rect x="460"  y="185" width="50"  height="215" fill="var(--accent)" opacity="0.23"/>
          <rect x="460"  y="185" width="50"  height="215" fill="url(#win-all)"/>
          <rect x="460"  y="185" width="50"  height="215" fill="url(#win-lit2)"/>
        </g>
        <g class="survey-bld" style="--d:0.30s">
          <rect x="515"  y="240" width="40"  height="160" fill="var(--accent)" opacity="0.20"/>
          <rect x="515"  y="240" width="40"  height="160" fill="url(#win-all)"/>
          <rect x="515"  y="240" width="40"  height="160" fill="url(#win-lit)"/>
        </g>
        <g class="survey-bld" style="--d:0.32s">
          <rect x="560"  y="75"  width="56"  height="325" fill="var(--accent)" opacity="0.30"/>
          <rect x="560"  y="75"  width="56"  height="325" fill="url(#win-all)"/>
          <rect x="560"  y="75"  width="56"  height="325" fill="url(#win-lit2)"/>
        </g>
        <g class="survey-bld" style="--d:0.35s">
          <rect x="621"  y="25"  width="112" height="375" fill="var(--accent)" opacity="0.32"/>
          <rect x="621"  y="25"  width="112" height="375" fill="url(#win-all)"/>
          <rect x="621"  y="25"  width="112" height="375" fill="url(#win-lit)"/>
        </g>
        <g class="survey-bld" style="--d:0.35s">
          <rect x="738"  y="55"  width="66"  height="345" fill="var(--accent)" opacity="0.30"/>
          <rect x="738"  y="55"  width="66"  height="345" fill="url(#win-all)"/>
          <rect x="738"  y="55"  width="66"  height="345" fill="url(#win-lit2)"/>
        </g>
        <g class="survey-bld" style="--d:0.38s">
          <rect x="809"  y="195" width="44"  height="205" fill="var(--accent)" opacity="0.22"/>
          <rect x="809"  y="195" width="44"  height="205" fill="url(#win-all)"/>
          <rect x="809"  y="195" width="44"  height="205" fill="url(#win-lit)"/>
        </g>
        <g class="survey-bld" style="--d:0.40s">
          <rect x="858"  y="95"  width="82"  height="305" fill="var(--accent)" opacity="0.28"/>
          <rect x="858"  y="95"  width="82"  height="305" fill="url(#win-all)"/>
          <rect x="858"  y="95"  width="82"  height="305" fill="url(#win-lit2)"/>
        </g>
        <g class="survey-bld" style="--d:0.43s">
          <rect x="945"  y="185" width="44"  height="215" fill="var(--accent)" opacity="0.22"/>
          <rect x="945"  y="185" width="44"  height="215" fill="url(#win-all)"/>
          <rect x="945"  y="185" width="44"  height="215" fill="url(#win-lit)"/>
        </g>
        <g class="survey-bld" style="--d:0.46s">
          <rect x="994"  y="245" width="58"  height="155" fill="var(--accent)" opacity="0.20"/>
          <rect x="994"  y="245" width="58"  height="155" fill="url(#win-all)"/>
          <rect x="994"  y="245" width="58"  height="155" fill="url(#win-lit2)"/>
        </g>
        <g class="survey-bld" style="--d:0.49s">
          <rect x="1057" y="165" width="54"  height="235" fill="var(--accent)" opacity="0.25"/>
          <rect x="1057" y="165" width="54"  height="235" fill="url(#win-all)"/>
          <rect x="1057" y="165" width="54"  height="235" fill="url(#win-lit)"/>
        </g>
        <g class="survey-bld" style="--d:0.52s">
          <rect x="1116" y="235" width="40"  height="165" fill="var(--accent)" opacity="0.21"/>
          <rect x="1116" y="235" width="40"  height="165" fill="url(#win-all)"/>
          <rect x="1116" y="235" width="40"  height="165" fill="url(#win-lit2)"/>
        </g>
        <g class="survey-bld" style="--d:0.55s">
          <rect x="1161" y="195" width="70"  height="205" fill="var(--accent)" opacity="0.24"/>
          <rect x="1161" y="195" width="70"  height="205" fill="url(#win-all)"/>
          <rect x="1161" y="195" width="70"  height="205" fill="url(#win-lit)"/>
        </g>
        <g class="survey-bld" style="--d:0.57s">
          <rect x="1236" y="265" width="44"  height="135" fill="var(--accent)" opacity="0.20"/>
          <rect x="1236" y="265" width="44"  height="135" fill="url(#win-all)"/>
          <rect x="1236" y="265" width="44"  height="135" fill="url(#win-lit2)"/>
        </g>
        <g class="survey-bld" style="--d:0.59s">
          <rect x="1285" y="295" width="55"  height="105" fill="var(--accent)" opacity="0.19"/>
          <rect x="1285" y="295" width="55"  height="105" fill="url(#win-all)"/>
          <rect x="1285" y="295" width="55"  height="105" fill="url(#win-lit)"/>
        </g>
        <g class="survey-bld" style="--d:0.62s">
          <rect x="1345" y="325" width="55"  height="75"  fill="var(--accent)" opacity="0.17"/>
          <rect x="1345" y="325" width="55"  height="75"  fill="url(#win-all)"/>
          <rect x="1345" y="325" width="55"  height="75"  fill="url(#win-lit2)"/>
        </g>
      </svg>
    </section>

    <!-- ═══ LOWER CONTENT — blueprint sketch backdrop ═══ -->
    <div class="survey-lower">
      <svg class="survey-blueprint" viewBox="0 0 1400 1800" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
        <defs>
          <pattern id="bp-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border-dim)" stroke-width="1"/>
          </pattern>
        </defs>
        <rect x="0" y="0" width="1400" height="1800" fill="url(#bp-grid)" opacity="0.5"/>

        <!-- Elevation sketch: low-rise block with grid facade -->
        <g class="bp-sketch" stroke="var(--accent)" stroke-width="2" fill="none" opacity="0.16">
          <rect x="80" y="120" width="260" height="340"/>
          <line x1="80" y1="190" x2="340" y2="190"/>
          <line x1="80" y1="260" x2="340" y2="260"/>
          <line x1="80" y1="330" x2="340" y2="330"/>
          <line x1="80" y1="400" x2="340" y2="400"/>
          <line x1="150" y1="120" x2="150" y2="460"/>
          <line x1="220" y1="120" x2="220" y2="460"/>
          <line x1="290" y1="120" x2="290" y2="460"/>
          <path d="M 80 120 L 210 50 L 340 120 Z"/>
          <line x1="40" y1="460" x2="380" y2="460"/>
        </g>

        <!-- Elevation sketch: tower with dimension lines -->
        <g class="bp-sketch" stroke="var(--accent)" stroke-width="2" fill="none" opacity="0.13">
          <rect x="980" y="60" width="180" height="520"/>
          <line x1="980" y1="140" x2="1160" y2="140"/>
          <line x1="980" y1="220" x2="1160" y2="220"/>
          <line x1="980" y1="300" x2="1160" y2="300"/>
          <line x1="980" y1="380" x2="1160" y2="380"/>
          <line x1="980" y1="460" x2="1160" y2="460"/>
          <line x1="1030" y1="60" x2="1030" y2="580"/>
          <line x1="1080" y1="60" x2="1080" y2="580"/>
          <line x1="1130" y1="60" x2="1130" y2="580"/>
          <!-- dimension markers -->
          <line x1="940" y1="60" x2="940" y2="580" stroke-dasharray="4 6"/>
          <line x1="930" y1="60" x2="950" y2="60"/>
          <line x1="930" y1="580" x2="950" y2="580"/>
          <text x="918" y="320" fill="var(--accent)" stroke="none" font-family="var(--font-mono)" font-size="14" transform="rotate(-90 918 320)">52.0M</text>
        </g>

        <!-- Compass / north arrow annotation -->
        <g class="bp-sketch" stroke="var(--accent)" stroke-width="1.5" fill="none" opacity="0.18">
          <circle cx="1240" cy="780" r="46"/>
          <path d="M 1240 738 L 1252 786 L 1240 774 L 1228 786 Z" fill="var(--accent)" stroke="none"/>
          <text x="1234" y="850" fill="var(--accent)" stroke="none" font-family="var(--font-mono)" font-size="13">N</text>
        </g>

        <!-- Floor plan sketch: simple room outline with door swing -->
        <g class="bp-sketch" stroke="var(--accent)" stroke-width="2" fill="none" opacity="0.14">
          <rect x="120" y="980" width="420" height="300"/>
          <line x1="120" y1="1130" x2="320" y2="1130"/>
          <line x1="320" y1="1130" x2="320" y2="1280"/>
          <path d="M 320 1130 A 90 90 0 0 1 410 1220" stroke-dasharray="3 5"/>
          <circle cx="320" cy="1130" r="3" fill="var(--accent)" stroke="none"/>
          <rect x="450" y="1010" width="60" height="30"/>
          <rect x="450" y="1060" width="60" height="30"/>
        </g>

        <!-- Section / elevation marker callouts -->
        <g class="bp-sketch" stroke="var(--accent)" stroke-width="1.5" fill="none" opacity="0.15">
          <line x1="700" y1="950" x2="1340" y2="950" stroke-dasharray="10 6"/>
          <circle cx="700" cy="950" r="16"/>
          <text x="694" y="955" fill="var(--accent)" stroke="none" font-family="var(--font-mono)" font-size="13">A</text>
          <circle cx="1340" cy="950" r="16"/>
          <text x="1334" y="955" fill="var(--accent)" stroke="none" font-family="var(--font-mono)" font-size="13">A'</text>
        </g>

        <!-- Distant low-rise row, simple gabled outlines -->
        <g class="bp-sketch" stroke="var(--accent)" stroke-width="1.5" fill="none" opacity="0.11">
          <path d="M 620 1480 L 620 1620 L 760 1620 L 760 1480 L 690 1430 Z"/>
          <path d="M 780 1500 L 780 1620 L 900 1620 L 900 1500 L 840 1455 Z"/>
          <path d="M 920 1470 L 920 1620 L 1080 1620 L 1080 1470 L 1000 1420 Z"/>
        </g>
      </svg>

      <!-- ═══ SITE PLOTS (Join actions) ═══ -->
    <section class="survey-section">
      <div class="container">
        <div class="survey-sec-hdr">
          <span class="survey-zone-ref">{{ t('survey-zone') }} A</span>
          <h2 class="survey-sec-title">{{ t('join-title') }}</h2>
          <span class="survey-sec-desc">{{ t('join-desc') }}</span>
        </div>

        <div class="survey-plots">

          <!-- Plot 1: Join -->
          <a class="survey-plot survey-plot--primary" href="https://qm.qq.com/q/pmQKzsZJV6" target="_blank">
            <div class="survey-plot__brackets" aria-hidden="true">
              <span class="brk brk--tl"></span>
              <span class="brk brk--tr"></span>
              <span class="brk brk--bl"></span>
              <span class="brk brk--br"></span>
            </div>
            <div class="survey-plot__ref">{{ t('survey-plot') }} 01</div>
            <div class="survey-plot__title">{{ t('join-btn') }}</div>
            <div class="survey-plot__addr">{{ t('survey-invite-only') }}</div>
            <div class="survey-plot__action">{{ t('survey-apply-via-qq') }}</div>
          </a>

          <!-- Plot 2: Modpack -->
          <a class="survey-plot" href="https://mcd.shutterwingphotos.cn/" target="_blank">
            <div class="survey-plot__brackets" aria-hidden="true">
              <span class="brk brk--tl"></span>
              <span class="brk brk--tr"></span>
              <span class="brk brk--bl"></span>
              <span class="brk brk--br"></span>
            </div>
            <div class="survey-plot__ref">{{ t('survey-plot') }} 02</div>
            <div class="survey-plot__title">{{ t('modpack-btn') }}</div>
            <div class="survey-plot__desc">{{ t('modpack-desc') }}</div>
            <div class="survey-plot__row">
              <span class="survey-plot__tag survey-plot__tag--warn">{{ t('survey-required') }}</span>
              <span class="survey-plot__cta">{{ t('survey-open-link') }}</span>
            </div>
          </a>

          <!-- Plot 3: BlueMap -->
          <a class="survey-plot" href="http://59.110.15.64:8100/" target="_blank">
            <div class="survey-plot__brackets" aria-hidden="true">
              <span class="brk brk--tl"></span>
              <span class="brk brk--tr"></span>
              <span class="brk brk--bl"></span>
              <span class="brk brk--br"></span>
            </div>
            <div class="survey-plot__ref">{{ t('survey-plot') }} 03</div>
            <div class="survey-plot__title">{{ t('dynmap-btn') }}</div>
            <div class="survey-plot__desc">{{ t('dynmap-desc') }}</div>
            <span class="survey-plot__cta">{{ t('survey-open-link') }}</span>
          </a>

          <!-- Plot 4: MTR Transit Map -->
          <a class="survey-plot" href="http://59.110.15.64:8888/" target="_blank">
            <div class="survey-plot__brackets" aria-hidden="true">
              <span class="brk brk--tl"></span>
              <span class="brk brk--tr"></span>
              <span class="brk brk--bl"></span>
              <span class="brk brk--br"></span>
            </div>
            <div class="survey-plot__ref">{{ t('survey-plot') }} 04</div>
            <div class="survey-plot__title">{{ t('transit-btn') }}</div>
            <div class="survey-plot__desc">{{ t('transit-desc') }}</div>
            <span class="survey-plot__cta">{{ t('survey-open-link') }}</span>
          </a>

          <!-- Plot 5: QQ Group -->
          <a class="survey-plot" href="https://qm.qq.com/q/pmQKzsZJV6" target="_blank">
            <div class="survey-plot__brackets" aria-hidden="true">
              <span class="brk brk--tl"></span>
              <span class="brk brk--tr"></span>
              <span class="brk brk--bl"></span>
              <span class="brk brk--br"></span>
            </div>
            <div class="survey-plot__ref">{{ t('survey-plot') }} 05</div>
            <div class="survey-plot__title">{{ t('qq-btn') }}</div>
            <div class="survey-plot__addr">QQ群：1081514596</div>
            <div class="survey-plot__desc">{{ t('qq-desc') }}</div>
            <span class="survey-plot__cta">{{ t('survey-open-link') }}</span>
          </a>

        </div>
      </div>
    </section>

    <!-- ═══ SURVEY DATA (Status) ═══ -->
    <section class="survey-section">
      <div class="container">
        <div class="survey-sec-hdr">
          <span class="survey-zone-ref">{{ t('survey-zone') }} B</span>
          <h2 class="survey-sec-title">{{ t('status-title') }}</h2>
        </div>

        <div v-if="loading" class="survey-loading">
          <span class="survey-loading__dot"></span> {{ t('loading') }}
        </div>

        <div v-else class="survey-readout">
          <div class="survey-readout-row">
            <span class="survey-readout-key">{{ t('survey-field') }} 01 — {{ t('status-online') }}</span>
            <span class="survey-readout-divider">····················</span>
            <span class="survey-readout-val" :class="hasError ? 'val--warn' : (online ? 'val--ok' : 'val--warn')">
              {{ hasError ? t('error') : (online ? t('survey-online') : t('survey-offline')) }}
            </span>
          </div>
          <div class="survey-readout-row">
            <span class="survey-readout-key">{{ t('survey-field') }} 02 — {{ t('status-players') }}</span>
            <span class="survey-readout-divider">····················</span>
            <span class="survey-readout-val">{{ hasError ? '—' : userCount }}<span class="survey-dim"> / 128</span></span>
          </div>
          <div class="survey-readout-row">
            <span class="survey-readout-key">{{ t('survey-field') }} 03 — {{ t('status-latency') }}</span>
            <span class="survey-readout-divider">····················</span>
            <span class="survey-readout-val" :class="latencyClass">{{ hasError ? '—' : latency }}<span class="survey-dim"> ms</span></span>
          </div>

          <div v-if="!hasError && users && users.length > 0" class="survey-personnel">
            <div class="survey-personnel-hdr">{{ t('survey-personnel') }}</div>
            <div class="survey-personnel-list">
              <span class="survey-personnel-tag" v-for="u in users" :key="u">{{ u }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ SITE DOCUMENTATION (Screenshots) ═══ -->
    <section class="survey-section">
      <div class="container">
        <div class="survey-sec-hdr">
          <span class="survey-zone-ref">{{ t('survey-zone') }} C</span>
          <h2 class="survey-sec-title">{{ t('screenshots-title') }}</h2>
          <RouterLink to="/gallery" class="survey-link">{{ t('survey-view-docs') }}</RouterLink>
        </div>
        <div class="survey-docs-grid">
          <RouterLink
            v-for="(item, i) in previewItems"
            :key="i"
            to="/gallery"
            class="survey-doc-card"
          >
            <div class="survey-doc-card__img" :style="{ background: item.img ? undefined : item.bg }">
              <img v-if="item.img" :src="item.img" :alt="t(item.labelKey)" class="survey-doc-card__photo" loading="lazy">
              <div class="survey-doc-card__ref">DOC-{{ String(i + 1).padStart(3, '0') }}</div>
              <div class="survey-doc-card__overlay">{{ t('survey-view-archive') }}</div>
            </div>
            <div class="survey-doc-card__meta">
              <span>{{ t(item.labelKey) }}</span>
              <span class="survey-dim">{{ t('survey-photograph') }}</span>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useServerStatus } from '../../composables/useServerStatus.js'

const { t } = useI18n()
const { online, userCount, latency, users, loading, hasError, latencyClass } = useServerStatus()

const onlineNamesTitle = computed(() =>
  !hasError.value && users.value.length > 0 ? users.value.join(', ') : ''
)

const previewItems = [
  { img: '/gallery/above_ground_subway_station.png', labelKey: 'gallery-above-ground-subway' },
  { img: '/gallery/dragonsea_centralbusinessdistrict_skyscrapers.png', labelKey: 'gallery-cbd-skyscrapers' },
  { img: '/gallery/airport_overview.png', labelKey: 'gallery-airport-overview' },
]
</script>

<style scoped>
.survey-home { min-height: 100vh; font-family: var(--font-mono); }

/* ── Hero ────────────────────────────────── */
.survey-hero {
  padding: 2.5rem 0;
  border-bottom: 2px solid var(--accent);
  position: relative;
  overflow: hidden;
}

.survey-hero__inner {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  position: relative;
  z-index: 1;
}

/* Skyline animation */
.survey-skyline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  max-height: 55%;
  pointer-events: none;
  z-index: 0;
}

.survey-bld {
  transform-box: fill-box;
  transform-origin: 50% 100%;
  animation: surveyBldRise 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--d, 0s);
}

@keyframes surveyBldRise {
  from { transform: translateY(150%); }
  to   { transform: translateY(0); }
}

/* Document header bar */
.survey-doc-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background: var(--accent);
  color: #F5F1E8;
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.survey-doc-bar__left,
.survey-doc-bar__right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.survey-doc-sep { opacity: 0.5; }

/* Title block */
.survey-title-block {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  position: relative;
  animation: fadeInUp 0.5s ease 0.1s both;
}

.survey-title-block__annot {
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--text-muted);
  padding-left: 1px;
}

.survey-title {
  display: flex;
  flex-direction: column;
  gap: 0;
  line-height: 1;
}

.survey-title-main {
  font-family: var(--font-head);
  font-size: clamp(2.4rem, 13vw, 9rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--accent);
  text-transform: uppercase;
  line-height: 0.9;
  overflow-wrap: anywhere;
}

.survey-title-sub {
  font-family: var(--font-head);
  font-size: clamp(0.9rem, 2.5vw, 1.5rem);
  font-weight: 400;
  letter-spacing: 0.15em;
  color: var(--text-muted);
  text-transform: uppercase;
  padding-left: 3px;
}

.survey-tagline {
  font-size: 0.84rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

/* Callout annotation */
.survey-callout {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.25rem;
}

.survey-callout__line {
  width: 3rem;
  height: 1px;
  background: var(--accent-red);
  flex-shrink: 0;
}

.survey-callout__box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.75rem;
  border: 1px solid var(--accent-red);
  background: rgba(232, 98, 26, 0.06);
}

.survey-callout__label {
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent-red);
}

.survey-callout__val {
  font-size: 0.82rem;
  color: var(--text-muted);
  letter-spacing: 0.08em;
}

/* Site data table */
.survey-data-table {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 2px solid var(--accent);
  animation: fadeInUp 0.5s ease 0.3s both;
}

.survey-data-cell {
  padding: 1rem 1.25rem;
  border-right: 1px solid var(--border-dim);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.survey-data-cell:last-child { border-right: none; }

.survey-data-cell--addr {
  cursor: pointer;
  transition: background 0.12s;
  text-decoration: none;
  color: inherit;
}
.survey-data-cell--addr:hover { background: var(--bg-3); }

.survey-data-cell__label {
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.survey-data-cell__val {
  font-family: var(--font-head);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
  position: relative;
}

.survey-data-cell__names {
  margin-top: 0.35rem;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.04em;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.survey-data-cell__val--addr {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 400;
  color: var(--accent);
  letter-spacing: 0.02em;
}

.val--ok   { color: #2D6A4F; }
.val--warn { color: var(--accent-red); }

.survey-dim { font-size: 0.75em; font-weight: 400; color: var(--text-muted); font-family: var(--font-mono); }

/* ── Section shared ──────────────────────── */

.survey-lower {
  position: relative;
  isolation: isolate;
}

.survey-blueprint {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}

.survey-section {
  position: relative;
  padding: 3rem 0;
  border-bottom: 1px dashed var(--border-dim);
}

.survey-sec-hdr {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.survey-zone-ref {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  padding: 2px 7px;
  border: 1px solid var(--accent);
  color: var(--accent);
  white-space: nowrap;
}

.survey-sec-title {
  font-family: var(--font-head);
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text);
}

.survey-sec-desc {
  font-size: 0.84rem;
  color: var(--text-muted);
  letter-spacing: 0.04em;
}

.survey-link {
  font-size: 0.76rem;
  letter-spacing: 0.15em;
  color: var(--accent);
  text-decoration: none;
  margin-left: auto;
  transition: opacity 0.12s;
  white-space: nowrap;
}
.survey-link:hover { opacity: 0.7; }

/* ── Plots (corner-bracket cards) ────────── */
.survey-plots {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.survey-plot {
  position: relative;
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: var(--bg-2);
  text-decoration: none;
  color: var(--text);
  cursor: pointer;
  transition: background 0.15s;
}

.survey-plot:hover { background: var(--bg-3); }

/* Corner brackets via pseudo-elements on child spans */
.survey-plot__brackets { position: absolute; inset: 0; pointer-events: none; }

.brk {
  position: absolute;
  width: 10px;
  height: 10px;
  border-color: var(--accent);
  border-style: solid;
}
.brk--tl { top: 0; left: 0; border-width: 2px 0 0 2px; }
.brk--tr { top: 0; right: 0; border-width: 2px 2px 0 0; }
.brk--bl { bottom: 0; left: 0; border-width: 0 0 2px 2px; }
.brk--br { bottom: 0; right: 0; border-width: 0 2px 2px 0; }

.survey-plot__ref {
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.survey-plot__title {
  font-family: var(--font-head);
  font-size: 1.05rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text);
}

.survey-plot__addr {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--accent);
}

.survey-plot__desc,
.survey-plot__action {
  font-size: 0.82rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.survey-plot__tag {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  padding: 2px 6px;
  align-self: flex-start;
}
.survey-plot__tag--warn { background: var(--accent-red); color: #fff; }

.survey-plot__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: auto;
}

.survey-plot__cta {
  align-self: flex-start;
  margin-top: auto;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  border: 1px solid var(--accent);
  padding: 0.4rem 0.85rem;
  transition: background 0.15s, color 0.15s;
}

.survey-plot:hover .survey-plot__cta {
  background: var(--accent);
  color: var(--bg);
}


/* ── Readout ─────────────────────────────── */
.survey-loading {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.78rem;
  color: var(--text-muted);
  padding: 1rem 0;
}

.survey-loading__dot {
  width: 6px; height: 6px;
  background: var(--accent);
  animation: pulse 1s ease-in-out infinite;
}

.survey-readout { border: 2px solid var(--accent); }

.survey-readout-row {
  display: flex;
  align-items: center;
  padding: 0.9rem 1.25rem;
  gap: 0.75rem;
  border-bottom: 1px dashed var(--border-dim);
  font-size: 0.78rem;
}
.survey-readout-row:last-child { border-bottom: none; }

.survey-readout-key {
  font-size: 0.76rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  white-space: nowrap;
  flex-shrink: 0;
}

.survey-readout-divider {
  flex: 1;
  overflow: hidden;
  color: var(--border-dim);
  letter-spacing: 0.05em;
  white-space: nowrap;
  font-size: 0.7rem;
}

.survey-readout-val {
  font-family: var(--font-head);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
  white-space: nowrap;
}

.survey-personnel { padding: 1rem 1.25rem; border-top: 1px dashed var(--border-dim); }
.survey-personnel-hdr { font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.75rem; }
.survey-personnel-list { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.survey-personnel-tag {
  font-size: 0.72rem; padding: 2px 8px;
  border: 1px solid var(--accent); color: var(--accent);
  background: rgba(27,58,107,0.06);
}

/* ── Documentation grid ──────────────────── */
.survey-docs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.survey-doc-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: var(--text);
  transition: transform 0.12s;
}

.survey-doc-card:hover { transform: translateY(-2px); }
.survey-doc-card:hover .survey-doc-card__overlay { opacity: 1; }

.survey-doc-card__img {
  aspect-ratio: 16/10;
  position: relative;
  overflow: hidden;
  border: 2px solid var(--accent);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0.6rem;
}

.survey-doc-card__photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.survey-doc-card__ref {
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(27,58,107, 0.4);
  font-family: var(--font-mono);
  position: relative;
  z-index: 1;
}

.survey-doc-card__overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: rgba(245, 241, 232, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  opacity: 0;
  transition: opacity 0.15s;
}

.survey-doc-card__meta {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.1rem;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  border-top: none;
}

/* ── Animations ──────────────────────────── */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}

/* ── Responsive ──────────────────────────── */
@media (max-width: 900px) {
  .survey-data-table { grid-template-columns: 1fr 1fr; }
  .survey-data-cell:nth-child(2) { border-right: none; }
  .survey-data-cell:nth-child(3) { border-top: 1px solid var(--border-dim); }
  .survey-plots { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 600px) {
  .survey-data-table { grid-template-columns: 1fr; }
  .survey-data-cell { border-right: none; border-bottom: 1px solid var(--border-dim); }
  .survey-data-cell:last-child { border-bottom: none; }
  .survey-plots { grid-template-columns: 1fr; }
  .survey-docs-grid { grid-template-columns: 1fr 1fr; }
  .survey-readout-divider { display: none; }
}
</style>
