<template>
  <nav class="navbar">
    <div class="navbar__inner">
      <!-- Logo -->
      <RouterLink to="/" class="navbar__logo" @click="closeMenu">
        <span class="navbar__logo-arrow">▶</span>
        DRAGONSEA<span class="navbar__logo-mc">.MC</span>
      </RouterLink>

      <!-- Desktop nav links -->
      <div class="navbar__links">
        <RouterLink to="/" class="navbar__link">{{ t('nav-home') }}</RouterLink>
        <RouterLink to="/about" class="navbar__link">{{ t('nav-about') }}</RouterLink>
        <RouterLink to="/gallery" class="navbar__link">{{ t('nav-gallery') }}</RouterLink>
      </div>

      <!-- Desktop language switcher -->
      <div class="navbar__lang">
        <button
          class="navbar__lang-btn"
          :class="{ 'navbar__lang-btn--active': locale === 'en' }"
          @click="setLocale('en')"
        >EN</button>
        <button
          class="navbar__lang-btn"
          :class="{ 'navbar__lang-btn--active': locale === 'zh' }"
          @click="setLocale('zh')"
        >ZH</button>
      </div>

      <!-- Mobile burger -->
      <button
        class="navbar__burger"
        :class="{ 'navbar__burger--open': menuOpen }"
        @click="menuOpen = !menuOpen"
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile dropdown -->
    <div class="navbar__mobile" :class="{ 'navbar__mobile--open': menuOpen }">
      <RouterLink to="/" class="navbar__mobile-link" @click="closeMenu">
        <span class="navbar__mobile-num">01</span>{{ t('nav-home') }}
      </RouterLink>
      <RouterLink to="/about" class="navbar__mobile-link" @click="closeMenu">
        <span class="navbar__mobile-num">02</span>{{ t('nav-about') }}
      </RouterLink>
      <RouterLink to="/gallery" class="navbar__mobile-link" @click="closeMenu">
        <span class="navbar__mobile-num">03</span>{{ t('nav-gallery') }}
      </RouterLink>
      <div class="navbar__mobile-footer">
        <button
          class="navbar__lang-btn"
          :class="{ 'navbar__lang-btn--active': locale === 'en' }"
          @click="setLocale('en')"
        >EN</button>
        <button
          class="navbar__lang-btn"
          :class="{ 'navbar__lang-btn--active': locale === 'zh' }"
          @click="setLocale('zh')"
        >ZH</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const menuOpen = ref(false)

function setLocale(lang) {
  locale.value = lang
  localStorage.setItem('locale', lang)
}

function closeMenu() {
  menuOpen.value = false
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(13, 13, 13, 0.97);
  border-bottom: 1px solid #1e1e1e;
  backdrop-filter: blur(8px);
}

.navbar__inner {
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 1.5rem;
  height: var(--nav-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

/* Logo */
.navbar__logo {
  font-family: var(--font-head);
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  white-space: nowrap;
  flex-shrink: 0;
  transition: color 0.12s;
}

.navbar__logo:hover { color: var(--accent); }

.navbar__logo-arrow { color: var(--accent); font-size: 0.65rem; }
.navbar__logo-mc { color: var(--accent); }

/* Desktop links */
.navbar__links {
  display: flex;
  height: var(--nav-h);
  flex: 1;
  justify-content: center;
}

.navbar__link {
  height: 100%;
  padding: 0 1.25rem;
  display: flex;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-muted);
  text-decoration: none;
  border-left: 1px solid #1a1a1a;
  transition: color 0.12s, background 0.12s;
  white-space: nowrap;
}

.navbar__link:last-child { border-right: 1px solid #1a1a1a; }
.navbar__link:hover { color: var(--text); background: #141414; }
.navbar__link.router-link-exact-active {
  color: var(--bg);
  background: var(--accent);
  font-weight: 700;
}

/* Language buttons (shared desktop + mobile) */
.navbar__lang {
  display: flex;
  border: 1px solid #1e1e1e;
  overflow: hidden;
  flex-shrink: 0;
}

.navbar__lang-btn {
  padding: 0.3rem 0.7rem;
  background: none;
  border: none;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.12s;
}

.navbar__lang-btn:first-child { border-right: 1px solid #1e1e1e; }
.navbar__lang-btn:hover { color: var(--text); background: #141414; }
.navbar__lang-btn--active {
  background: var(--accent) !important;
  color: var(--bg) !important;
  font-weight: 700;
}

/* Burger button (hidden on desktop) */
.navbar__burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  padding: 6px;
  background: none;
  border: 1px solid #1e1e1e;
  cursor: pointer;
  flex-shrink: 0;
}

.navbar__burger span {
  display: block;
  height: 2px;
  background: var(--text-muted);
  transition: transform 0.2s ease, opacity 0.2s ease, background 0.12s;
  transform-origin: center;
}

.navbar__burger:hover span { background: var(--accent); }

.navbar__burger--open span:nth-child(1) { transform: translateY(7px) rotate(45deg); background: var(--accent); }
.navbar__burger--open span:nth-child(2) { opacity: 0; }
.navbar__burger--open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); background: var(--accent); }

/* Mobile dropdown */
.navbar__mobile {
  display: none;
  flex-direction: column;
  background: var(--bg);
  border-top: 1px solid #1e1e1e;
  border-bottom: 2px solid var(--accent);
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.25s ease;
}

.navbar__mobile--open {
  max-height: 400px;
}

.navbar__mobile-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
  text-decoration: none;
  border-bottom: 1px solid #141414;
  transition: color 0.12s, background 0.12s;
}

.navbar__mobile-link:hover { color: var(--text); background: #111; }
.navbar__mobile-link.router-link-exact-active { color: var(--accent); background: rgba(92,255,138,0.05); }

.navbar__mobile-num {
  font-size: 0.62rem;
  color: var(--accent);
  letter-spacing: 0.1em;
}

.navbar__mobile-footer {
  display: flex;
  padding: 0.75rem 1.5rem;
  gap: 0;
}

.navbar__mobile-footer .navbar__lang-btn {
  padding: 0.4rem 1rem;
  border: 1px solid #1e1e1e;
  font-size: 0.75rem;
}

/* ── Mobile breakpoint ──────────────────── */
@media (max-width: 768px) {
  .navbar__links,
  .navbar__lang {
    display: none;
  }

  .navbar__burger {
    display: flex;
  }

  .navbar__mobile {
    display: flex;
  }
}
</style>
