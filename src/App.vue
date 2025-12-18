<script setup>
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { usePaletteStore } from '@/composables/usePaletteStore';

const { initStore } = usePaletteStore();

onMounted(() => {
  initStore();
});
</script>

<template>
  <div class="retro-wrapper">
    <div class="grid-bg"></div>
    
    <header class="retro-header">
      <div class="brand">
        <span class="pixel-icon">💾</span> 
        <h1>PALETTE_GEN_v1.0</h1>
      </div>
      <nav>
        <RouterLink to="/">[ GENERATOR ]</RouterLink>
        <RouterLink to="/library">[ LIBRARY ]</RouterLink>
      </nav>
    </header>

    <main class="crt-container">
      <RouterView />
    </main>
  </div>
</template>

<style>
/* Подключаем шрифт "Press Start 2P" или используем Courier */
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

:root {
  --bg-color: #1a1a2e;
  --neon-pink: #ff00ff;
  --neon-cyan: #00ffff;
  --neon-yellow: #f1c40f;
  --retro-border: 2px solid #000;
  --retro-shadow: 4px 4px 0px #000;
}

body {
  margin: 0;
  background-color: var(--bg-color);
  font-family: 'VT323', 'Courier New', monospace; /* Ретро шрифт */
  font-size: 18px;
  color: var(--neon-cyan);
  overflow-x: hidden;
}

/* Эффект сетки на фоне */
.grid-bg {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background-image: 
    linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
  z-index: -1;
  pointer-events: none;
}

.retro-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: #000;
  border-bottom: 2px solid var(--neon-pink);
}

.brand { display: flex; align-items: center; gap: 15px; }
.brand h1 { margin: 0; font-size: 1.8rem; letter-spacing: 2px; color: var(--neon-pink); text-shadow: 2px 2px 0px #fff; }
.pixel-icon { font-size: 2rem; }

nav a {
  color: var(--neon-cyan);
  text-decoration: none;
  margin-left: 20px;
  font-size: 1.4rem;
  text-transform: uppercase;
  transition: 0.2s;
}

nav a:hover { color: #fff; text-shadow: 0 0 10px var(--neon-cyan); }
nav a.router-link-active { color: var(--neon-yellow); text-decoration: underline; }

.crt-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
}
</style>