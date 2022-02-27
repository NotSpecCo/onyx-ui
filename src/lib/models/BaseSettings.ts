import type { Animations, Density, TextSize, TextWeight, Theme } from '../enums';

export type BaseSettings = {
  textSize: TextSize;
  textWeight: TextWeight;
  displayDensity: Density;
  borderRadius: number;
  animations: Animations;
  showHintText: boolean;
  theme: Theme;
  // Card Color
  cardColorH: number;
  cardColorS: number;
  cardColorL: number;
  // Accent Color
  accentColorH: number;
  accentColorS: number;
  accentColorL: number;
  // Text Color
  textColorH: number;
  textColorS: number;
  textColorL: number;
};
