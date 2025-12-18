<script setup>
import { usePaletteStore } from '@/composables/usePaletteStore';
const { savedPalettes, deletePalette } = usePaletteStore();

const copyCss = (palette) => {
  let css = `:root {\n`;
  palette.colors.forEach((hex, i) => css += `  --color-${i+1}: ${hex};\n`);
  css += `}`;
  navigator.clipboard.writeText(css);
  alert('CSS COPIED TO CLIPBOARD');
};
</script>

<template>
  <div class="library-container">
    <h2 class="retro-title">&lt; PALETTE_DATABASE /&gt;</h2>
    
    <div v-if="savedPalettes.length === 0" class="empty-state">
      [ ERROR: DATABASE EMPTY ]<br>
      PLEASE GENERATE AND SAVE DATA.
    </div>
    
    <div class="grid">
      <div v-for="p in savedPalettes" :key="p.id" class="retro-lib-card">
        
        <div class="card-header">
          <span class="p-name">{{ p.name }}</span>
          <span class="p-date">{{ p.date }}</span>
        </div>

        <div class="palette-strip-mini">
          <div 
            v-for="c in p.colors" 
            :key="c" 
            class="color-block"
            :style="{background: c}"
            :title="c"
          ></div>
        </div>
        
        <div class="card-actions">
          <button @click="copyCss(p)" class="retro-btn-small copy">
            COPY CSS
          </button>
          <button @click="deletePalette(p.id)" class="retro-btn-small delete">
            DELETE
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.library-container { padding-bottom: 50px; }

.retro-title {
  text-align: center;
  font-size: 2.5rem;
  color: var(--neon-cyan);
  text-shadow: 3px 3px 0 #000;
  margin-bottom: 40px;
}

.empty-state {
  text-align: center;
  font-size: 1.5rem;
  color: #ff0000;
  border: 2px dashed #ff0000;
  padding: 40px;
  background: rgba(0,0,0,0.5);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

/* СТИЛЬ КАРТОЧКИ RETRO */
.retro-lib-card {
  background: #000;
  border: 2px solid #fff;
  padding: 15px;
  box-shadow: 6px 6px 0px rgba(255, 255, 255, 0.3);
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.retro-lib-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0px var(--neon-pink);
  border-color: var(--neon-pink);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #333;
  padding-bottom: 10px;
}

.p-name {
  font-weight: bold;
  font-size: 1.2rem;
  color: var(--neon-yellow);
}

.p-date {
  font-size: 0.9rem;
  opacity: 0.7;
}

.palette-strip-mini {
  display: flex;
  height: 80px;
  border: 2px solid #333;
}

.color-block {
  flex: 1;
  height: 100%;
  transition: width 0.2s;
}
.color-block:hover { width: 120%; }

.card-actions {
  display: flex;
  gap: 10px;
}

/* КНОПКИ */
.retro-btn-small {
  flex: 1;
  border: 2px solid #fff;
  background: #000;
  color: #fff;
  padding: 8px;
  font-family: inherit;
  font-size: 1rem;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  transition: all 0.1s;
  box-shadow: 3px 3px 0 #fff;
}

.retro-btn-small:active {
  transform: translate(3px, 3px);
  box-shadow: none;
}

.retro-btn-small.copy:hover {
  background: var(--neon-cyan);
  color: #000;
  border-color: var(--neon-cyan);
  box-shadow: 3px 3px 0 var(--neon-cyan);
}

.retro-btn-small.delete:hover {
  background: #ff0055; /* Красный неон */
  color: #fff;
  border-color: #ff0055;
  box-shadow: 3px 3px 0 #ff0055;
}
</style>