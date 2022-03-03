import type { Animations, Density, TextSize, TextWeight, Theme } from '../enums';

export type BaseSettings = {
  textSize: TextSize;
  textWeight: TextWeight;
  displayDensity: Density;
  borderRadius: number;
  animations: Animations;
  showHintText: boolean;
  theme: Theme;
  // Accent Color
  accentColorH: number;
  accentColorS: number;
  accentColorL: number;
  // Card Color
  cardColorH: number;
  cardColorS: number;
  cardColorL: number;
  // Card Text Color
  textColorH: number;
  textColorS: number;
  textColorL: number;
  // Drawer Color
  drawerColorH: number;
  drawerColorS: number;
  drawerColorL: number;
  // Drawer Text Color
  drawerTextColorH: number;
  drawerTextColorS: number;
  drawerTextColorL: number;
  // Focus Color
  focusColorA: number;
};
