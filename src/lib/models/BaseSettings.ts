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
  // Focus Color
  drawerFocusColorA: number;
};
