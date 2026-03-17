import typography from '@tailwindcss/typography';
import scrollbarHide from 'tailwind-scrollbar-hide';
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        duggeunmo: ['duggeunmo'],
        pretendard: ['pretendard']
      }
    }
  },
  plugins: [typography, scrollbarHide]
};

export default config;
