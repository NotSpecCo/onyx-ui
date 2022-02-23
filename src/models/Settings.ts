export enum Theme {
  Light = 'light',
  Dark = 'dark',
}
export enum TextSize {
  Smallest = 'smallest',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  Largest = 'largest',
}

export enum Density {
  Compact = 'compact',
  Normal = 'normal',
  Spacious = 'spacious',
}

export type Settings = {
  theme: Theme;
  accentColor: string;
  textSize: TextSize;
  displayDensity: Density;
};
