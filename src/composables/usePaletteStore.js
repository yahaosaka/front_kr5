import { ref } from 'vue';
import { useColorMath } from './useColorMath';

const colors = ref([]);
const savedPalettes = ref([]);
const { randomHex, generateHarmony } = useColorMath();

export function usePaletteStore() {

  const initStore = () => {
    const saved = localStorage.getItem('myPalettes');
    if (saved) savedPalettes.value = JSON.parse(saved);
    if (colors.value.length === 0) generatePalette(5);
  };

  const generatePalette = (count = 5, mode = 'random') => {
    const newColors = [];
    
    // 1. Ищем "Якорь" (заблокированный цвет), чтобы строить гармонию от него
    const lockedColorObj = colors.value.find(c => c.isLocked);
    
    // 2. Определяем базовый цвет (HEX):
    // Если есть замок - берем его. 
    // Если нет замка и режим НЕ рандом - генерируем НОВЫЙ случайный цвет, чтобы палитра поменялась.
    let baseHex = lockedColorObj ? lockedColorObj.hex : randomHex();

    // 3. Генерируем массив гармоничных цветов, если нужно
    let harmonyColors = [];
    if (mode !== 'random') {
      harmonyColors = generateHarmony(baseHex, mode, count);
    }

    // 4. Заполняем массив
    for (let i = 0; i < count; i++) {
      // Если старый цвет заблокирован, оставляем его как есть
      if (colors.value[i] && colors.value[i].isLocked) {
        newColors.push(colors.value[i]);
      } else {
        // Иначе берем новый
        let hex;
        if (mode === 'random') {
          hex = randomHex();
        } else {
          // Если гармония: берем цвет из массива. 
          // Важно: если цветов в гармонии меньше (например комплементарная дает 2 цвета),
          // циклически повторяем или генерируем случайный
          hex = harmonyColors[i] || randomHex();
        }

        newColors.push({
          hex: hex,
          isLocked: false,
          id: Date.now() + i + Math.random()
        });
      }
    }
    
    colors.value = newColors;
  };

  // ... (остальные функции toggleLock, savePalette, deletePalette без изменений)
  const toggleLock = (index) => {
    if (colors.value[index]) colors.value[index].isLocked = !colors.value[index].isLocked;
  };

  const savePalette = (name) => {
    savedPalettes.value.push({
      id: Date.now(),
      name: name || `PALETTE_${savedPalettes.value.length + 1}`,
      colors: colors.value.map(c => c.hex),
      date: new Date().toLocaleDateString()
    });
    localStorage.setItem('myPalettes', JSON.stringify(savedPalettes.value));
  };

  const deletePalette = (id) => {
    savedPalettes.value = savedPalettes.value.filter(p => p.id !== id);
    localStorage.setItem('myPalettes', JSON.stringify(savedPalettes.value));
  };

  return {
    colors,
    savedPalettes,
    generatePalette,
    toggleLock,
    savePalette,
    deletePalette,
    initStore
  };
}