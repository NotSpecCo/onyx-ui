import { Theme } from './enums';
import type { BaseSettings } from './models';

export type ThemeConfig = {
  id: Theme;
  values: {
    // Global
    accentColorH: number;
    accentColorS: number;
    accentColorL: number;

    // Card
    cardColorH: number;
    cardColorS: number;
    cardColorL: number;
    textColorH: number;
    textColorS: number;
    textColorL: number;
    focusColorA: number;

    // Drawer
    drawerColorH: number;
    drawerColorS: number;
    drawerColorL: number;
    drawerTextColorH: number;
    drawerTextColorS: number;
    drawerTextColorL: number;
    drawerFocusColorA: number;
  };
};

export const themes: ThemeConfig[] = [
  {
    id: Theme.Light,
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

      // Drawer
      drawerColorH: 0,
      drawerColorS: 0,
      drawerColorL: 0,
      drawerTextColorH: 0,
      drawerTextColorS: 0,
      drawerTextColorL: 100,
      drawerFocusColorA: 10,
    },
  },
  {
    id: Theme.Dark,
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

      // Drawer
      drawerColorH: 0,
      drawerColorS: 0,
      drawerColorL: 0,
      drawerTextColorH: 0,
      drawerTextColorS: 0,
      drawerTextColorL: 100,
      drawerFocusColorA: 20,
    },
  },
];

export function applyTheme(settings: BaseSettings) {
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

  // Drawer
  document.documentElement.style.setProperty('--drawer-color-h', `${settings.drawerColorH}`);
  document.documentElement.style.setProperty('--drawer-color-s', `${settings.drawerColorS}%`);
  document.documentElement.style.setProperty('--drawer-color-l', `${settings.drawerColorL}%`);
  document.documentElement.style.setProperty(
    '--drawer-text-color-h',
    `${settings.drawerTextColorH}`
  );
  document.documentElement.style.setProperty(
    '--drawer-text-color-s',
    `${settings.drawerTextColorS}%`
  );
  document.documentElement.style.setProperty(
    '--drawer-text-color-l',
    `${settings.drawerTextColorL}%`
  );
  document.documentElement.style.setProperty(
    '--drawer-focus-color-a',
    `${settings.drawerFocusColorA}%`
  );
}
