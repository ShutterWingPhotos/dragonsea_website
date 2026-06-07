<template>
  <footer class="footer">
    <div class="footer__inner container">
      <div class="footer__left">
        <span class="footer__logo">▶ DRAGONSEA.MC</span>
        <span class="footer__sep">|</span>
        <span class="footer__copy">{{ t('footer') }}</span>
      </div>
      <div class="footer__right">
        <a href="https://mcd.shutterwingphotos.cn/" target="_blank" class="footer__link">Official Site</a>
        <a href="http://59.110.15.64:8100/" target="_blank" class="footer__link">BlueMap</a>
        <a href="http://59.110.15.64:8888/" target="_blank" class="footer__link">MTR Transit</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
.footer {
  border-top: 1px dashed #1e1e1e;
  padding: 1.25rem 0;
  margin-top: auto;
}

.footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer__left {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-muted);
}

.footer__logo {
  font-family: var(--font-head);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--accent);
}

.footer__sep {
  color: #282828;
}

.footer__right {
  display: flex;
  gap: 0;
}

.footer__link {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  padding: 0.25rem 0.75rem;
  border: 1px solid #1a1a1a;
  margin-left: -1px;
  transition: color 0.12s, background 0.12s;
}

.footer__link:hover {
  color: var(--accent);
  background: #111;
}
</style>
