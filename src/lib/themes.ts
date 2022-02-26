import { Theme } from './enums';

export type ThemeConfig = {
  id: Theme;
  values: {
    [key: string]: string;
    // Drawer
    drawerBgColor: string;
    drawerAccentColor: string;
    drawerPrimaryTextColor: string;
    drawerSecondaryTextColor: string;
    drawerAccentTextColor: string;
    drawerHighlightBgColor: string;
    drawerHighlightTextColor: string;
    drawerDividerColor: string;
    // Card
    cardBgColor: string;
    cardDimBgColor: string;
    cardBorderColor: string;
    cardAccentColor: string;
    cardPrimaryTextColor: string;
    cardSecondaryTextColor: string;
    cardAccentTextColor: string;
    cardHighlightBgColor: string;
    cardHighlightTextColor: string;
    cardDividerColor: string;
    // Other
    scrimColor: string;
  };
};

export const themes: ThemeConfig[] = [
  {
    id: Theme.Light,
    values: {
      // Drawer
      drawerBgColor: '#000000',
      drawerAccentColor: '#707C99',
      drawerPrimaryTextColor: 'rgba(255, 255, 255, 0.88)',
      drawerSecondaryTextColor: 'rgba(255, 255, 255, 0.5)',
      drawerAccentTextColor: '#707C99',
      drawerHighlightBgColor: 'rgba(255, 255, 255, 0.1)',
      drawerHighlightTextColor: 'rgba(255, 255, 255, 0.88)',
      drawerDividerColor: 'rgba(255, 255, 255, 0.1)',
      // Card
      cardBgColor: '#ffffff',
      cardDimBgColor: '#efefef',
      cardBorderColor: '#aaa',
      cardAccentColor: '#707C99',
      cardPrimaryTextColor: 'rgba(0, 0, 0, 0.88)',
      cardSecondaryTextColor: 'rgba(0, 0, 0, 0.5)',
      cardAccentTextColor: '#707C99',
      cardHighlightBgColor: 'rgba(0, 0, 0, 0.1)',
      cardHighlightTextColor: 'rgba(0, 0, 0, 0.88)',
      cardDividerColor: 'rgba(0, 0, 0, 0.1)',
      // Other
      scrimColor: 'string',
    },
  },
  {
    id: Theme.Dark,
    values: {
      // Drawer
      drawerBgColor: '#111318',
      drawerAccentColor: '#FCD581',
      drawerPrimaryTextColor: 'rgba(255, 255, 255, 0.88)',
      drawerSecondaryTextColor: 'rgba(255, 255, 255, 0.5)',
      drawerAccentTextColor: '#FCD581',
      drawerHighlightBgColor: 'rgba(255, 255, 255, 0.1)',
      drawerHighlightTextColor: 'rgba(255, 255, 255, 0.88)',
      drawerDividerColor: 'rgba(255, 255, 255, 0.1)',
      // Card
      cardBgColor: '#353945',
      cardDimBgColor: '#22262F',
      cardBorderColor: '#4C556B',
      cardAccentColor: '#FCD581',
      cardPrimaryTextColor: 'rgba(255,255,255, 0.88)',
      cardSecondaryTextColor: 'rgba(255,255,255, 0.5)',
      cardAccentTextColor: '#FCD581',
      cardHighlightBgColor: 'rgba(255, 255, 255, 0.1)',
      cardHighlightTextColor: 'rgba(255,255,255, 0.88)',
      cardDividerColor: 'rgba(255,255,255, 0.1)',
      // Other
      scrimColor: 'string',
    },
  },
];
