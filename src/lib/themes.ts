import { Theme } from './enums';
import type { BaseSettings } from './models';

export type ThemeConfig = {
  id: Theme;
  settings: {
    dimLightness: number;
    disabledAlpha: number;
  };
  values: {
    textColorH: number;
    textColorS: number;
    textColorL: number;

    accentColorH: number;
    accentColorS: number;
    accentColorL: number;

    cardColorH: number;
    cardColorS: number;
    cardColorL: number;

    drawerColorH: number;
    drawerColorS: number;
    drawerColorL: number;
  };
};

export const themes: ThemeConfig[] = [
  {
    id: Theme.Light,
    settings: {
      dimLightness: 80,
      disabledAlpha: 30,
    },
    values: {
      textColorH: 0,
      textColorS: 0,
      textColorL: 0,

      accentColorH: 232,
      accentColorS: 64,
      accentColorL: 54,

      cardColorH: 210,
      cardColorS: 13,
      cardColorL: 99,

      drawerColorH: 0,
      drawerColorS: 0,
      drawerColorL: 0,
    },
  },
  {
    id: Theme.Warm,
    settings: {
      dimLightness: 80,
      disabledAlpha: 30,
    },
    values: {
      textColorH: 0,
      textColorS: 0,
      textColorL: 0,

      accentColorH: 26,
      accentColorS: 85,
      accentColorL: 48,

      cardColorH: 30,
      cardColorS: 60,
      cardColorL: 96,

      drawerColorH: 0,
      drawerColorS: 0,
      drawerColorL: 0,
    },
  },
];

export function applyTheme(settings: BaseSettings) {
  document.documentElement.style.setProperty('--text-color-h', `${settings.textColorH}`);
  document.documentElement.style.setProperty('--text-color-s', `${settings.textColorS}%`);
  document.documentElement.style.setProperty('--text-color-l', `${settings.textColorL}%`);
  document.documentElement.style.setProperty('--accent-color-h', `${settings.accentColorH}`);
  document.documentElement.style.setProperty('--accent-color-s', `${settings.accentColorS}%`);
  document.documentElement.style.setProperty('--accent-color-l', `${settings.accentColorL}%`);
  document.documentElement.style.setProperty('--card-color-h', `${settings.cardColorH}`);
  document.documentElement.style.setProperty('--card-color-s', `${settings.cardColorS}%`);
  document.documentElement.style.setProperty('--card-color-l', `${settings.cardColorL}%`);
  document.documentElement.style.setProperty('--drawer-color-h', `${settings.drawerColorH}`);
  document.documentElement.style.setProperty('--drawer-color-s', `${settings.drawerColorS}%`);
  document.documentElement.style.setProperty('--drawer-color-l', `${settings.drawerColorL}%`);
}
