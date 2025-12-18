// Утилиты для преобразования и анализа цветов

export function useColorMath() {
  
  // Генерация случайного HEX
  const randomHex = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
  };

  // HEX -> RGB Object
  const hexToRgbObj = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
  };

  // --- НОВАЯ ФУНКЦИЯ ДЛЯ КОНТРАСТА ТЕКСТА ---
  const getSmartTextColor = (hex) => {
    const { r, g, b } = hexToRgbObj(hex);
    // Формула YIQ для восприятия яркости глазом
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#000000' : '#ffffff';
  };

  // HEX -> HSL Object (для алгоритмов гармонии)
  const hexToHsl = (hex) => {
    let { r, g, b } = hexToRgbObj(hex);
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) { h = s = 0; } 
    else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  // HSL -> HEX
  const hslToHex = (h, s, l) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
  };

  // Расчет яркости (WCAG)
  const getLuminance = (r, g, b) => {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  // Контрастность
  const getContrast = (hex1, hex2) => {
    const rgb1 = hexToRgbObj(hex1);
    const rgb2 = hexToRgbObj(hex2);
    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
  };

  // Генерация гармоний
  const generateHarmony = (baseHex, mode, count) => {
    const { h, s, l } = hexToHsl(baseHex);
    const palette = [];
    
    // Базовый цвет всегда первый
    palette.push(baseHex);

    for (let i = 1; i < count; i++) {
      let newH = h;
      let newS = s;
      let newL = l;

      if (mode === 'analogous') newH = (h + 30 * i) % 360;
      else if (mode === 'monochromatic') { newS = Math.max(0, s - 20 * i); newL = Math.min(95, l + 10 * i); }
      else if (mode === 'triad') newH = (h + 120 * i) % 360;
      else if (mode === 'complementary') newH = (h + 180) % 360; // Только 2 цвета по сути
      else {
         // Случайный режим
         return randomHex();
      }
      
      palette.push(hslToHex(newH, newS, newL));
    }
    return palette; // Возвращает массив HEX строк
  };

  return { randomHex, getContrast, generateHarmony, getSmartTextColor, hexToHsl, hslToHex };
}