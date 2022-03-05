import type { ThemeConfig } from './lib/models';
import { themes as baseThemes } from './lib/themes';
import type { Theme } from './models/Theme';

export const themes: ThemeConfig<Theme>[] = [
  ...baseThemes,
  {
    id: 'dim',
    values: {
      // Global
      accentColorH: 22,
      accentColorS: 41,
      accentColorL: 88,

      // Card
      cardColorH: 240,
      cardColorS: 10,
      cardColorL: 44,
      textColorH: 0,
      textColorS: 0,
      textColorL: 100,
      focusColorA: 20,
    },
  },
];
