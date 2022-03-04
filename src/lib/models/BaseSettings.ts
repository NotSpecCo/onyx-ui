import type { Animations, Density, TextSize, TextWeight } from '../enums';
import type { BaseTheme } from './BaseTheme';
import type { ThemeSettings } from './ThemeSettings';

export type BaseSettings<TTheme = BaseTheme> = ThemeSettings & {
  textSize: TextSize;
  textWeight: TextWeight;
  displayDensity: Density;
  borderRadius: number;
  animations: Animations;
  showHintText: boolean;
  theme: TTheme;
};
