import { Theme } from './enums';
import type { BaseSettings } from './models';

export type ThemeConfig = {
  id: Theme;
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

    drawerTextColorH: number;
    drawerTextColorS: number;
    drawerTextColorL: number;

    focusColorA: number;
  };
};

export const themes: ThemeConfig[] = [
  {
    id: Theme.Light,
    values: {
      textColorH: 0,
      textColorS: 0,
      textColorL: 0,

      accentColorH: 218,
      accentColorS: 52,
      accentColorL: 65,

      cardColorH: 210,
      cardColorS: 13,
      cardColorL: 99,

      drawerColorH: 0,
      drawerColorS: 0,
      drawerColorL: 0,

      drawerTextColorH: 0,
      drawerTextColorS: 0,
      drawerTextColorL: 100,

      focusColorA: 20,
    },
  },
  {
    id: Theme.Warm,
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

      drawerTextColorH: 0,
      drawerTextColorS: 0,
      drawerTextColorL: 100,

      focusColorA: 20,
    },
  },
  {
    id: Theme.Dark,
    values: {
      textColorH: 0,
      textColorS: 0,
      textColorL: 100,

      accentColorH: 341,
      accentColorS: 100,
      accentColorL: 75,

      cardColorH: 0,
      cardColorS: 0,
      cardColorL: 8,

      drawerColorH: 0,
      drawerColorS: 0,
      drawerColorL: 0,

      drawerTextColorH: 0,
      drawerTextColorS: 0,
      drawerTextColorL: 100,

      focusColorA: 90,
    },
  },
];

export function applyTheme(settings: BaseSettings) {
  document.documentElement.style.setProperty('--card-color-h', `${settings.cardColorH}`);
  document.documentElement.style.setProperty('--card-color-s', `${settings.cardColorS}%`);
  document.documentElement.style.setProperty('--card-color-l', `${settings.cardColorL}%`);

  document.documentElement.style.setProperty('--accent-color-h', `${settings.accentColorH}`);
  document.documentElement.style.setProperty('--accent-color-s', `${settings.accentColorS}%`);
  document.documentElement.style.setProperty('--accent-color-l', `${settings.accentColorL}%`);

  document.documentElement.style.setProperty('--text-color-h', `${settings.textColorH}`);
  document.documentElement.style.setProperty('--text-color-s', `${settings.textColorS}%`);
  document.documentElement.style.setProperty('--text-color-l', `${settings.textColorL}%`);

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

  document.documentElement.style.setProperty('--focus-color-a', `${settings.focusColorA}%`);
}
