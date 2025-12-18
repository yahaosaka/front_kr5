<script setup>
import { ref } from 'vue';
import { usePaletteStore } from '@/composables/usePaletteStore';
import ColorCard from '@/components/ColorCard.vue';
import PalettePreview from '@/components/PalettePreview.vue'; // <--- Импорт

const { colors, generatePalette, toggleLock, savePalette } = usePaletteStore();

const paletteName = ref('');
const selectedMode = ref('random');
const paletteSize = ref(5);

const handleGenerate = () => {
  generatePalette(Number(paletteSize.value), selectedMode.value);
};

const copyColor = (hex) => {
  navigator.clipboard.writeText(hex);
};
</script>

<template>
  <div class="generator-layout">
    
    <div class="retro-panel">
      <div class="panel-header">/// CONTROL_SYSTEM ///</div>
      <div class="controls">
        <div class="input-group">
          <label>MODE:</label>
          <select v-model="selectedMode">
             <option value="random">RND (Random)</option>
             <option value="analogous">ALG (Analog)</option>
             <option value="monochromatic">MON (Mono)</option>
             <option value="triad">TRI (Triad)</option>
          </select>
        </div>
        <div class="input-group">
          <label>COUNT:</label>
          <select v-model="paletteSize">
             <option :value="3">03_UNITS</option>
             <option :value="5">05_UNITS</option>
             <option :value="7">07_UNITS</option>
          </select>
        </div>
        <button class="retro-btn primary" @click="handleGenerate">EXECUTE</button>
        <div class="save-box">
           <input v-model="paletteName" placeholder="NAME..." />
           <button class="retro-btn" @click="savePalette(paletteName)">SAVE</button>
        </div>
      </div>
    </div>

    <div class="palette-viewport">
      <ColorCard 
        v-for="(color, idx) in colors" 
        :key="color.id" 
        :color="color"
        @lock="toggleLock(idx)"
        @click="copyColor(color.hex)"
      />
    </div>

    <PalettePreview :colors="colors" v-if="colors.length > 0" />

  </div>
</template>

<style scoped>
/* Стили генератора из предыдущего ответа остаются без изменений */
.generator-layout { display: flex; flex-direction: column; gap: 30px; padding-bottom: 50px; }
.retro-panel { background: #000; border: 2px solid var(--neon-cyan); box-shadow: 6px 6px 0px rgba(0, 255, 255, 0.3); padding: 5px; }
.panel-header { background: var(--neon-cyan); color: #000; padding: 5px 10px; font-weight: bold; font-size: 1.2rem; margin-bottom: 20px; }
.controls { display: flex; gap: 20px; flex-wrap: wrap; align-items: flex-end; padding: 10px 20px 20px 20px; }
.input-group { display: flex; flex-direction: column; gap: 5px; }
.input-group label { color: var(--neon-cyan); font-size: 1rem; }
select, input { background: #000; border: 2px solid var(--neon-pink); color: #fff; padding: 10px; font-family: 'VT323', monospace; font-size: 1.2rem; outline: none; box-shadow: 4px 4px 0px var(--neon-pink); }
.retro-btn { background: #000; border: 2px solid #fff; color: #fff; padding: 10px 20px; font-family: 'VT323', monospace; font-size: 1.3rem; cursor: pointer; box-shadow: 4px 4px 0px #fff; text-transform: uppercase; }
.retro-btn:active { transform: translate(4px, 4px); box-shadow: none; }
.retro-btn.primary { border-color: var(--neon-yellow); color: var(--neon-yellow); box-shadow: 4px 4px 0px var(--neon-yellow); }
.save-box { margin-left: auto; display: flex; gap: 10px; }
.palette-viewport { height: 40vh; border: 4px solid #fff; box-shadow: 8px 8px 0px rgba(255,255,255,0.2); display: flex; background: #000; }
</style>