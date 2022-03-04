import type { ThemeSettings } from '.';
import type { BaseTheme } from './BaseTheme';

export type ThemeConfig<T = BaseTheme> = {
  id: T;
  values: ThemeSettings;
};
