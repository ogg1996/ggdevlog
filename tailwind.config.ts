import typography from '@tailwindcss/typography';
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
  plugins: [typography]
};

export default config;
