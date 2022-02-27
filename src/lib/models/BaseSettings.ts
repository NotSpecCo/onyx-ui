import type { Animations, Density, TextSize, TextWeight, Theme } from '../enums';

export type BaseSettings = {
  textSize: TextSize;
  textWeight: TextWeight;
  displayDensity: Density;
  borderRadius: number;
  animations: Animations;
  showHintText: boolean;
  theme: Theme;
  accentColor: string;
  cardAccentColor: string;
  // Accent Color
  accentColorH: number;
  accentColorS: number;
  accentColorL: number;
  accentColorA: number;
  accentColorAFocus: number;
};
