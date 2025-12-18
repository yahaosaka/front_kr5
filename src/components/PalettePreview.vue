<script setup>
import { ref, computed } from 'vue';
import { useColorMath } from '@/composables/useColorMath';

const props = defineProps({
  colors: { type: Array, required: true, default: () => [] }
});

const { getSmartTextColor } = useColorMath();
const isDarkMode = ref(true);

// Безопасное получение цветов (если в палитре всего 3 цвета, а мы хотим 5-й)
const getColor = (idx) => {
  if (!props.colors.length) return '#ccc';
  // Если индекс больше длины массива, берем по кругу или последний
  const safeIndex = idx % props.colors.length;
  return props.colors[safeIndex].hex;
};

// Вычисляем цвет текста для кнопок/шапки, чтобы он был читаемым
const getTextFor = (hex) => getSmartTextColor(hex);
</script>

<template>
  <div class="preview-wrapper">
    
    <div class="preview-controls">
      <span class="section-label">/// UI_SIMULATION_MODE ///</span>
      
      <button class="theme-toggle" @click="isDarkMode = !isDarkMode">
        STATUS: {{ isDarkMode ? '[ DARK_OS ]' : '[ LIGHT_OS ]' }}
      </button>
    </div>

    <div class="monitor-frame" :class="{ 'light-mode': !isDarkMode }">
      
      <div class="retro-window" :style="{ borderColor: getColor(2) }">
        
        <div 
          class="window-header" 
          :style="{ backgroundColor: getColor(0), color: getTextFor(getColor(0)) }"
        >
          <span>AESTHETIC_APP.EXE</span>
          <span class="win-btn">X</span>
        </div>

        <div 
          class="window-body"
          :style="{ backgroundColor: isDarkMode ? '#111' : '#fff' }"
        >
          
          <h3 :style="{ color: getColor(1) }">
            Creative Heading
          </h3>

          <p :style="{ color: isDarkMode ? '#ccc' : '#333' }">
            Analyzing contrast ratios for standard UI components. 
            <span :style="{ color: getColor(3), fontWeight: 'bold' }">
              Highlighted link text.
            </span>
          </p>

          <div 
            class="ui-card" 
            :style="{ 
              backgroundColor: isDarkMode ? '#222' : '#f4f4f4',
              borderLeft: `4px solid ${getColor(4)}`
            }"
          >
            <span :style="{ color: isDarkMode ? '#fff' : '#000' }">Alert Message</span>
          </div>

          <button 
            class="ui-btn"
            :style="{ 
              backgroundColor: getColor(2), 
              color: getTextFor(getColor(2)),
              boxShadow: `4px 4px 0 ${getColor(3)}`
            }"
          >
            CONFIRM ACTION
          </button>

        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.preview-wrapper {
  margin-top: 30px;
  border: 2px solid #333;
  padding: 10px;
  background: #000;
}

.preview-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-family: 'VT323', monospace;
}

.section-label { color: var(--neon-cyan, #0ff); font-size: 1.2rem; }

.theme-toggle {
  background: transparent;
  border: 1px solid var(--neon-cyan, #0ff);
  color: var(--neon-cyan, #0ff);
  padding: 5px 15px;
  cursor: pointer;
  font-family: inherit;
  font-size: 1rem;
}
.theme-toggle:hover { background: rgba(0, 255, 255, 0.1); }

/* Рамка монитора */
.monitor-frame {
  padding: 30px;
  background-color: #0f0f0f; /* Dark background by default */
  background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 20px 20px;
  transition: background 0.3s;
  border: 2px inset #555;
}

.monitor-frame.light-mode {
  background-color: #e0e0e0; /* Classic Windows Grey */
  background-image: none;
}

/* Окно внутри */
.retro-window {
  border: 2px solid;
  background: #000;
  box-shadow: 10px 10px 0 rgba(0,0,0,0.5);
  max-width: 400px;
  margin: 0 auto;
  font-family: 'Courier New', monospace;
}

.window-header {
  padding: 8px 10px;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  border-bottom: 2px solid #000;
  letter-spacing: 1px;
}

.window-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.ui-card {
  padding: 10px;
  font-size: 0.9rem;
}

.ui-btn {
  padding: 10px 20px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  font-family: inherit;
  margin-top: 10px;
  align-self: flex-start;
}
</style>