import typography from '@tailwindcss/typography';
import scrollbarHide from 'tailwind-scrollbar-hide';
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['pretendard'],
        duggeunmo: ['duggeunmo']
      }
    }
  },
  plugins: [typography, scrollbarHide]
};

export default config;
