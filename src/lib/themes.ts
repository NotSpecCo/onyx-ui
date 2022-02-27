import kebabCase from 'lodash.kebabcase';
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

type CompiledTheme = {
  appBgColor: string;
  primaryTextColor: string;
  secondaryTextColor: string;
  dividerColor: string;
  accentColor: string;
  focusColor: string;
  cardPrimaryColor: string;
  cardSecondaryColor: string;
  cardBorderColor: string;
  drawerBgColor: string;
  drawerPrimaryTextColor: string;
  drawerSecondaryTextColor: string;
  drawerDividerColor: string;
};

export function applyTheme(settings: BaseSettings) {
  const theme = themes.find((a) => a.id === settings.theme) ?? themes[0];

  const s = settings;
  const compiledTheme: CompiledTheme = {
    appBgColor: new HSLA(0, 0, 0).withAlpha(1),
    primaryTextColor: new HSLA(s.textColorH, s.textColorS, s.textColorL).withAlpha(0.88),
    secondaryTextColor: new HSLA(s.textColorH, s.textColorS, s.textColorL).withAlpha(0.5),
    dividerColor: new HSLA(s.textColorH, s.textColorS, s.textColorL).withAlpha(0.1),
    accentColor: new HSLA(s.accentColorH, s.accentColorS, s.accentColorL).withAlpha(1),
    focusColor: new HSLA(s.accentColorH, s.accentColorS, s.accentColorL).withAlpha(0.2),
    cardPrimaryColor: new HSLA(s.cardColorH, s.cardColorS, s.cardColorL).withAlpha(1),
    cardSecondaryColor: new HSLA(s.cardColorH, s.cardColorS, s.cardColorL)
      .changeLightness(-5)
      .withAlpha(1),
    cardBorderColor: new HSLA(s.cardColorH, s.cardColorS, s.cardColorL)
      .changeLightness(5)
      .withAlpha(1),
    drawerBgColor: new HSLA(0, 0, 0).withAlpha(1),
    drawerPrimaryTextColor: new HSLA(0, 0, 100).withAlpha(0.88),
    drawerSecondaryTextColor: new HSLA(0, 0, 100).withAlpha(0.88),
    drawerDividerColor: new HSLA(0, 0, 100).withAlpha(0.1),
  };

  for (const id in compiledTheme) {
    document.documentElement.style.setProperty(`--${kebabCase(id)}`, compiledTheme[id]);
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

  changeLightness(change: number) {
    this.l = this.l + change;
    return this;
  }

  withAlpha(alpha: number) {
    return `hsla(${this.h}, ${this.s}%, ${this.l}%, ${alpha}`;
  }
}
