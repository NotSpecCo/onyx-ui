import type { ThemeConfig, ThemeSettings } from './models';

export const themes: ThemeConfig[] = [
  {
    id: 'light',
    values: {
      // Global
      accentColorH: 0,
      accentColorS: 0,
      accentColorL: 4,

      // Card
      cardColorH: 0,
      cardColorS: 0,
      cardColorL: 100,
      textColorH: 0,
      textColorS: 0,
      textColorL: 0,
      focusColorA: 10,
    },
  },
  {
    id: 'dark',
    values: {
      // Global
      accentColorH: 0,
      accentColorS: 0,
      accentColorL: 90,

      // Card
      cardColorH: 0,
      cardColorS: 0,
      cardColorL: 15,
      textColorH: 0,
      textColorS: 0,
      textColorL: 100,
      focusColorA: 20,
    },
  },
];

export function applyTheme(settings: ThemeSettings) {
  // Global
  document.documentElement.style.setProperty('--accent-color-h', `${settings.accentColorH}`);
  document.documentElement.style.setProperty('--accent-color-s', `${settings.accentColorS}%`);
  document.documentElement.style.setProperty('--accent-color-l', `${settings.accentColorL}%`);

  // Card
  document.documentElement.style.setProperty('--card-color-h', `${settings.cardColorH}`);
  document.documentElement.style.setProperty('--card-color-s', `${settings.cardColorS}%`);
  document.documentElement.style.setProperty('--card-color-l', `${settings.cardColorL}%`);
  document.documentElement.style.setProperty('--text-color-h', `${settings.textColorH}`);
  document.documentElement.style.setProperty('--text-color-s', `${settings.textColorS}%`);
  document.documentElement.style.setProperty('--text-color-l', `${settings.textColorL}%`);
  document.documentElement.style.setProperty('--focus-color-a', `${settings.focusColorA}%`);
}
