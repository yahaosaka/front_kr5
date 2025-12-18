<script setup>
import { computed } from 'vue';
import { useColorMath } from '@/composables/useColorMath';

const props = defineProps({
  color: Object,
});

defineEmits(['lock']);
const { getSmartTextColor } = useColorMath();

// Вычисляем цвет текста (черный или белый) в зависимости от фона
const textColor = computed(() => getSmartTextColor(props.color.hex));
</script>

<template>
  <div 
    class="retro-card" 
    :style="{ backgroundColor: color.hex }"
    @click="$emit('click')" 
  >
    <div class="card-content" :style="{ color: textColor }">
      
      <button 
        class="retro-lock-btn" 
        @click.stop="$emit('lock')"
        :style="{ borderColor: textColor, color: textColor }"
      >
        {{ color.isLocked ? 'LOCKED' : 'OPEN' }}
      </button>

      <div class="hex-code">
        {{ color.hex }}
        <span class="copy-msg" :style="{ borderColor: textColor }">COPY</span>
      </div>
    </div>
    
    <div class="corner-tl" :style="{ borderTopColor: textColor, borderLeftColor: textColor }"></div>
    <div class="corner-br" :style="{ borderBottomColor: textColor, borderRightColor: textColor }"></div>
  </div>
</template>

<style scoped>
.retro-card {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: flex 0.3s ease;
  border-right: 1px solid rgba(0,0,0,0.1); /* Тонкий разделитель */
}

/* При наведении карточка расширяется */
.retro-card:hover { flex: 1.5; }

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  font-family: 'VT323', monospace;
  z-index: 2;
}

.hex-code {
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
}

/* Сообщение COPY появляется при наведении */
.copy-msg {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1rem;
  border: 1px solid;
  padding: 2px 6px;
  margin-top: 5px;
  opacity: 0;
  transition: opacity 0.2s;
}
.retro-card:hover .copy-msg { opacity: 1; }

.retro-lock-btn {
  background: transparent;
  border: 2px solid;
  padding: 5px 10px;
  font-family: inherit;
  font-size: 1.2rem;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
}
.retro-lock-btn:hover { background: rgba(255,255,255,0.2); }

/* Декор уголков */
.corner-tl, .corner-br {
  position: absolute;
  width: 10px;
  height: 10px;
  border-style: solid;
  border-width: 0;
}
.corner-tl { top: 10px; left: 10px; border-top-width: 3px; border-left-width: 3px; }
.corner-br { bottom: 10px; right: 10px; border-bottom-width: 3px; border-right-width: 3px; }
</style>