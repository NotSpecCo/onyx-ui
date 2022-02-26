import type { Animations, Density, TextSize, Theme } from '../enums';

export type BaseSettings = {
  textSize: TextSize;
  displayDensity: Density;
  borderRadius: number;
  animations: Animations;
  theme: Theme;
  accentColor: string;
  cardAccentColor: string;
};
