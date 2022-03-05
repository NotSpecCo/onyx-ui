import type { ThemeConfig } from './lib/models';
import { themes as baseThemes } from './lib/themes';

export const themes: ThemeConfig[] = [
  ...baseThemes,
  {
    id: 'dim',
    values: {
      cardColorH: 240,
      cardColorS: 10,
      cardColorL: 44,

      accentColorH: 22,
      accentColorS: 41,
      accentColorL: 88,

      textColorH: 0,
      textColorS: 0,
      textColorL: 100,

      focusColorA: 20,
      dividerColorA: 10,
    },
  },
];
