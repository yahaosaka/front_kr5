<script setup>
import { computed } from 'vue';
import { useColorMath } from '@/composables/useColorMath';

const props = defineProps(['colors']);
const { getContrast } = useColorMath();

// Сравниваем первый (фон) и последний (текст) цвета палитры
const contrast = computed(() => {
  if (props.colors.length < 2) return 0;
  const bg = props.colors[0].hex;
  const fg = props.colors[props.colors.length - 1].hex;
  return getContrast(bg, fg).toFixed(2);
});

const status = computed(() => {
  if (contrast.value >= 7) return 'AAA (Отлично)';
  if (contrast.value >= 4.5) return 'AA (Хорошо)';
  return 'Плохо для текста';
});
</script>

<template>
  <div class="wcag-info">
    <h4>Анализ контраста (Фон vs Текст)</h4>
    <div class="score">
      <span :class="{'bad': contrast < 4.5, 'good': contrast >= 4.5}">
        Ratio: {{ contrast }}:1
      </span>
      <span>{{ status }}</span>
    </div>
  </div>
</template>

<style scoped>
.wcag-info { margin-top: 10px; padding: 10px; background: #fff; border-radius: 8px; }
.score { display: flex; gap: 15px; font-weight: bold; }
.bad { color: #e74c3c; } .good { color: #27ae60; }
</style>