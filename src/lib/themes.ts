import kebabcase from 'lodash.kebabcase';
import { Theme } from './enums';
import type { BaseSettings } from './models';

export type ThemeConfig = {
  id: Theme;
  accentColor: {
    hue: number;
    saturation: number;
    lightness: number;
    alpha: number;
    alphaFocus: number;
  };
  values: {
    [key: string]: string;
    // Drawer
    drawerBgColor: string;
    drawerAccentColor: string;
    drawerPrimaryTextColor: string;
    drawerSecondaryTextColor: string;
    drawerAccentTextColor: string;
    drawerHighlightBgColor: string;
    drawerHighlightTextColor: string;
    drawerDividerColor: string;
    // Card
    cardBgColor: string;
    cardBorderColor: string;
    cardAccentColor: string;
    cardPrimaryTextColor: string;
    cardSecondaryTextColor: string;
    cardAccentTextColor: string;
    cardHighlightBgColor: string;
    cardHighlightTextColor: string;
    cardDividerColor: string;
    // Card Stack
    cardStackBgColor: string;
    cardStackBorderColor: string;
    cardStackFocusBgColor: string;
    cardStackFocusTextColor: string;
    // Other
    scrimColor: string;
  };
};

export const themes: ThemeConfig[] = [
  {
    id: Theme.Light,
    accentColor: {
      hue: 222,
      saturation: 17,
      lightness: 52,
      alpha: 100,
      alphaFocus: 20,
    },
    values: {
      // Drawer
      drawerBgColor: '#000000',
      drawerAccentColor: '#707C99',
      drawerPrimaryTextColor: 'rgba(255, 255, 255, 0.88)',
      drawerSecondaryTextColor: 'rgba(255, 255, 255, 0.5)',
      drawerAccentTextColor: '#707C99',
      drawerHighlightBgColor: 'rgba(255, 255, 255, 0.1)',
      drawerHighlightTextColor: 'rgba(255, 255, 255, 0.88)',
      drawerDividerColor: 'rgba(255, 255, 255, 0.1)',
      // Card
      cardBgColor: '#ffffff',
      cardBorderColor: '#aaa',
      cardAccentColor: '#707C99',
      cardPrimaryTextColor: 'rgba(0, 0, 0, 0.88)',
      cardSecondaryTextColor: 'rgba(0, 0, 0, 0.5)',
      cardAccentTextColor: '#707C99',
      cardHighlightBgColor: 'rgba(0, 0, 0, 0.1)',
      cardHighlightTextColor: 'rgba(0, 0, 0, 0.88)',
      cardDividerColor: 'rgba(0, 0, 0, 0.1)',
      // Card Stack
      cardStackBgColor: '#eaeaea',
      cardStackBorderColor: '#aaa',
      cardStackFocusBgColor: '#ffffff',
      cardStackFocusTextColor: 'rgba(0,0,0, 0.88)',
      // Other
      scrimColor: 'rgba(0, 0, 0, 0.7)',
    },
  },
  {
    id: Theme.Warm,
    accentColor: {
      hue: 26,
      saturation: 85,
      lightness: 48,
      alpha: 100,
      alphaFocus: 20,
    },
    values: {
      // Drawer
      drawerBgColor: '#000000',
      drawerAccentColor: '#EE8434',
      drawerPrimaryTextColor: 'rgba(255, 255, 255, 0.88)',
      drawerSecondaryTextColor: 'rgba(255, 255, 255, 0.5)',
      drawerAccentTextColor: '#EE8434',
      drawerHighlightBgColor: 'rgba(255, 255, 255, 0.2)',
      drawerHighlightTextColor: 'rgba(255, 255, 255, 0.88)',
      drawerDividerColor: 'rgba(255, 255, 255, 0.1)',
      // Card
      cardBgColor: '#FBF5EF',
      cardBorderColor: '#aaa',
      cardAccentColor: '#E26D12',
      cardPrimaryTextColor: 'rgba(0, 0, 0, 0.88)',
      cardSecondaryTextColor: 'rgba(0, 0, 0, 0.5)',
      cardAccentTextColor: '#E26D12',
      cardHighlightBgColor: 'rgba(0, 0, 0, 0.1)',
      cardHighlightTextColor: 'rgba(0, 0, 0, 0.88)',
      cardDividerColor: 'rgba(0, 0, 0, 0.1)',
      // Card Stack
      cardStackBgColor: '#F3E1CE',
      cardStackBorderColor: '#aaa',
      cardStackFocusBgColor: '#FBF5EF',
      cardStackFocusTextColor: 'rgba(0,0,0, 0.88)',
      // Other
      scrimColor: 'rgba(0, 0, 0, 0.7)',
    },
  },
  {
    id: Theme.Dim,
    accentColor: {
      hue: 201,
      saturation: 51,
      lightness: 69,
      alpha: 100,
      alphaFocus: 20,
    },
    values: {
      // Drawer
      drawerBgColor: '#353945',
      drawerAccentColor: '#86BBD8',
      drawerPrimaryTextColor: 'rgba(255, 255, 255, 0.88)',
      drawerSecondaryTextColor: 'rgba(255, 255, 255, 0.5)',
      drawerAccentTextColor: '#86BBD8',
      drawerHighlightBgColor: 'rgba(255, 255, 255, 0.1)',
      drawerHighlightTextColor: 'rgba(255, 255, 255, 0.88)',
      drawerDividerColor: 'rgba(255, 255, 255, 0.1)',
      // Card
      cardBgColor: '#505668',
      cardBorderColor: '#6A728A',
      cardAccentColor: '#86BBD8',
      cardPrimaryTextColor: 'rgba(255,255,255, 0.88)',
      cardSecondaryTextColor: 'rgba(255,255,255, 0.5)',
      cardAccentTextColor: '#86BBD8',
      cardHighlightBgColor: 'rgba(0, 0, 0, 0.1)',
      cardHighlightTextColor: 'rgba(255,255,255, 0.88)',
      cardDividerColor: 'rgba(255,255,255, 0.1)',
      // Card Stack
      cardStackBgColor: '#3E4351',
      cardStackBorderColor: '#6A728A',
      cardStackFocusBgColor: '#505668',
      cardStackFocusTextColor: 'rgba(255,255,255, 0.88)',
      // Other
      scrimColor: 'rgba(0, 0, 0, 0.7)',
    },
  },
  {
    id: Theme.Dark,
    accentColor: {
      hue: 207,
      saturation: 59,
      lightness: 48,
      alpha: 100,
      alphaFocus: 20,
    },
    values: {
      // Drawer
      drawerBgColor: '#111318',
      drawerAccentColor: '#3282C3',
      drawerPrimaryTextColor: 'rgba(255, 255, 255, 0.88)',
      drawerSecondaryTextColor: 'rgba(255, 255, 255, 0.5)',
      drawerAccentTextColor: '#3282C3',
      drawerHighlightBgColor: 'rgba(255, 255, 255, 0.1)',
      drawerHighlightTextColor: 'rgba(255, 255, 255, 0.88)',
      drawerDividerColor: 'rgba(255, 255, 255, 0.1)',
      // Card
      cardBgColor: '#3E4351',
      cardBorderColor: '#3D4351',
      cardAccentColor: '#3282C3',
      cardPrimaryTextColor: 'rgba(255,255,255, 0.88)',
      cardSecondaryTextColor: 'rgba(255,255,255, 0.5)',
      cardAccentTextColor: '#3282C3',
      cardHighlightBgColor: 'rgba(255, 255, 255, 0.1)',
      cardHighlightTextColor: 'rgba(255,255,255, 0.88)',
      cardDividerColor: 'rgba(255,255,255, 0.1)',
      // Card Stack
      cardStackBgColor: '#2C303A',
      cardStackBorderColor: '#3D4351',
      cardStackFocusBgColor: '#3E4351',
      cardStackFocusTextColor: 'rgba(255,255,255, 0.88)',
      // Other
      scrimColor: 'rgba(0, 0, 0, 0.7)',
    },
  },
  {
    id: Theme.Darkest,
    accentColor: {
      hue: 15,
      saturation: 61,
      lightness: 51,
      alpha: 100,
      alphaFocus: 50,
    },
    values: {
      // Drawer
      drawerBgColor: '#000000',
      drawerAccentColor: '#CF5C36',
      drawerPrimaryTextColor: 'rgba(255, 255, 255, 0.88)',
      drawerSecondaryTextColor: 'rgba(255, 255, 255, 0.5)',
      drawerAccentTextColor: '#CF5C36',
      drawerHighlightBgColor: 'rgba(255, 255, 255, 0.2)',
      drawerHighlightTextColor: 'rgba(255, 255, 255, 0.88)',
      drawerDividerColor: 'rgba(255, 255, 255, 0.1)',
      // Card
      cardBgColor: '#1f1f1f',
      cardBorderColor: '#525252',
      cardAccentColor: '#CF5C36',
      cardPrimaryTextColor: 'rgba(255,255,255, 0.88)',
      cardSecondaryTextColor: 'rgba(255,255,255, 0.5)',
      cardAccentTextColor: '#CF5C36',
      cardHighlightBgColor: 'rgba(255, 255, 255, 0.2)',
      cardHighlightTextColor: 'rgba(255,255,255, 0.88)',
      cardDividerColor: 'rgba(255,255,255, 0.1)',
      // Card Stack
      cardStackBgColor: '#000',
      cardStackBorderColor: '#525252',
      cardStackFocusBgColor: '#333',
      cardStackFocusTextColor: 'rgba(255,255,255, 0.88)',
      // Other
      scrimColor: 'rgba(0, 0, 0, 0.7)',
    },
  },
];

export function applyTheme(settings: BaseSettings) {
  const baseTheme = themes.find((a) => a.id === settings.theme) || themes[0];
  const theme: ThemeConfig = JSON.parse(JSON.stringify(baseTheme));

  const accentColor = new HSLA(settings.accentColorH, settings.accentColorS, settings.accentColorL);

  theme.values.drawerAccentColor = accentColor.withAlpha(settings.accentColorA);
  theme.values.drawerAccentTextColor = accentColor.withAlpha(settings.accentColorA);
  theme.values.drawerHighlightBgColor = accentColor.withAlpha(settings.accentColorAFocus);

  theme.values.cardAccentColor = accentColor.withAlpha(settings.accentColorA);
  theme.values.cardAccentTextColor = accentColor.withAlpha(settings.accentColorA);
  theme.values.cardHighlightBgColor = accentColor.withAlpha(settings.accentColorAFocus);

  theme.values.cardStackFocusBgColor = accentColor.withAlpha(settings.accentColorAFocus);

  for (const id in theme.values) {
    document.documentElement.style.setProperty(`--${kebabcase(id)}`, theme.values[id]);
  }
}

class HSLA {
  h: number;
  s: number;
  l: number;

  constructor(h: number, s: number, l: number) {
    this.h = h;
    this.s = s;
    this.l = l;
  }

  withAlpha(alpha: number) {
    return `hsla(${this.h}, ${this.s}%, ${this.l}%, ${alpha}%`;
  }
}
