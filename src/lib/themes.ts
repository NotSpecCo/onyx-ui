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
    cardBorderColor: string;
    cardAccentColor: string;
    cardPrimaryTextColor: string;
    cardSecondaryTextColor: string;
    cardAccentTextColor: string;
    cardHighlightBgColor: string;
    cardHighlightTextColor: string;
    cardDividerColor: string;
    // Card Stack
    cardStackBgColor: string;
    cardStackBorderColor: string;
    cardStackFocusBgColor: string;
    cardStackFocusTextColor: string;
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
      cardBorderColor: '#aaa',
      cardAccentColor: '#707C99',
      cardPrimaryTextColor: 'rgba(0, 0, 0, 0.88)',
      cardSecondaryTextColor: 'rgba(0, 0, 0, 0.5)',
      cardAccentTextColor: '#707C99',
      cardHighlightBgColor: 'rgba(0, 0, 0, 0.1)',
      cardHighlightTextColor: 'rgba(0, 0, 0, 0.88)',
      cardDividerColor: 'rgba(0, 0, 0, 0.1)',
      // Card Stack
      cardStackBgColor: '#eaeaea',
      cardStackBorderColor: '#aaa',
      cardStackFocusBgColor: '#ffffff',
      cardStackFocusTextColor: 'rgba(0,0,0, 0.88)',
      // Other
      scrimColor: 'rgba(0, 0, 0, 0.7)',
    },
  },
  {
    id: Theme.Warm,
    values: {
      // Drawer
      drawerBgColor: '#000000',
      drawerAccentColor: '#EE8434',
      drawerPrimaryTextColor: 'rgba(255, 255, 255, 0.88)',
      drawerSecondaryTextColor: 'rgba(255, 255, 255, 0.5)',
      drawerAccentTextColor: '#EE8434',
      drawerHighlightBgColor: 'rgba(255, 255, 255, 0.2)',
      drawerHighlightTextColor: 'rgba(255, 255, 255, 0.88)',
      drawerDividerColor: 'rgba(255, 255, 255, 0.1)',
      // Card
      cardBgColor: '#FBF5EF',
      cardBorderColor: '#aaa',
      cardAccentColor: '#E26D12',
      cardPrimaryTextColor: 'rgba(0, 0, 0, 0.88)',
      cardSecondaryTextColor: 'rgba(0, 0, 0, 0.5)',
      cardAccentTextColor: '#E26D12',
      cardHighlightBgColor: 'rgba(0, 0, 0, 0.1)',
      cardHighlightTextColor: 'rgba(0, 0, 0, 0.88)',
      cardDividerColor: 'rgba(0, 0, 0, 0.1)',
      // Card Stack
      cardStackBgColor: '#F3E1CE',
      cardStackBorderColor: '#aaa',
      cardStackFocusBgColor: '#FBF5EF',
      cardStackFocusTextColor: 'rgba(0,0,0, 0.88)',
      // Other
      scrimColor: 'rgba(0, 0, 0, 0.7)',
    },
  },
  {
    id: Theme.Dim,
    values: {
      // Drawer
      drawerBgColor: '#353945',
      drawerAccentColor: '#86BBD8',
      drawerPrimaryTextColor: 'rgba(255, 255, 255, 0.88)',
      drawerSecondaryTextColor: 'rgba(255, 255, 255, 0.5)',
      drawerAccentTextColor: '#86BBD8',
      drawerHighlightBgColor: 'rgba(255, 255, 255, 0.1)',
      drawerHighlightTextColor: 'rgba(255, 255, 255, 0.88)',
      drawerDividerColor: 'rgba(255, 255, 255, 0.1)',
      // Card
      cardBgColor: '#505668',
      cardBorderColor: '#6A728A',
      cardAccentColor: '#86BBD8',
      cardPrimaryTextColor: 'rgba(255,255,255, 0.88)',
      cardSecondaryTextColor: 'rgba(255,255,255, 0.5)',
      cardAccentTextColor: '#86BBD8',
      cardHighlightBgColor: 'rgba(0, 0, 0, 0.1)',
      cardHighlightTextColor: 'rgba(255,255,255, 0.88)',
      cardDividerColor: 'rgba(255,255,255, 0.1)',
      // Card Stack
      cardStackBgColor: '#3E4351',
      cardStackBorderColor: '#6A728A',
      cardStackFocusBgColor: '#505668',
      cardStackFocusTextColor: 'rgba(255,255,255, 0.88)',
      // Other
      scrimColor: 'rgba(0, 0, 0, 0.7)',
    },
  },
  {
    id: Theme.Dark,
    values: {
      // Drawer
      drawerBgColor: '#111318',
      drawerAccentColor: '#3282C3',
      drawerPrimaryTextColor: 'rgba(255, 255, 255, 0.88)',
      drawerSecondaryTextColor: 'rgba(255, 255, 255, 0.5)',
      drawerAccentTextColor: '#3282C3',
      drawerHighlightBgColor: 'rgba(255, 255, 255, 0.1)',
      drawerHighlightTextColor: 'rgba(255, 255, 255, 0.88)',
      drawerDividerColor: 'rgba(255, 255, 255, 0.1)',
      // Card
      cardBgColor: '#3E4351',
      cardBorderColor: '#3D4351',
      cardAccentColor: '#3282C3',
      cardPrimaryTextColor: 'rgba(255,255,255, 0.88)',
      cardSecondaryTextColor: 'rgba(255,255,255, 0.5)',
      cardAccentTextColor: '#3282C3',
      cardHighlightBgColor: 'rgba(255, 255, 255, 0.1)',
      cardHighlightTextColor: 'rgba(255,255,255, 0.88)',
      cardDividerColor: 'rgba(255,255,255, 0.1)',
      // Card Stack
      cardStackBgColor: '#2C303A',
      cardStackBorderColor: '#3D4351',
      cardStackFocusBgColor: '#3E4351',
      cardStackFocusTextColor: 'rgba(255,255,255, 0.88)',
      // Other
      scrimColor: 'rgba(0, 0, 0, 0.7)',
    },
  },
  {
    id: Theme.Darkest,
    values: {
      // Drawer
      drawerBgColor: '#000000',
      drawerAccentColor: '#CF5C36',
      drawerPrimaryTextColor: 'rgba(255, 255, 255, 0.88)',
      drawerSecondaryTextColor: 'rgba(255, 255, 255, 0.5)',
      drawerAccentTextColor: '#CF5C36',
      drawerHighlightBgColor: 'rgba(255, 255, 255, 0.2)',
      drawerHighlightTextColor: 'rgba(255, 255, 255, 0.88)',
      drawerDividerColor: 'rgba(255, 255, 255, 0.1)',
      // Card
      cardBgColor: '#1f1f1f',
      cardBorderColor: '#525252',
      cardAccentColor: '#CF5C36',
      cardPrimaryTextColor: 'rgba(255,255,255, 0.88)',
      cardSecondaryTextColor: 'rgba(255,255,255, 0.5)',
      cardAccentTextColor: '#CF5C36',
      cardHighlightBgColor: 'rgba(255, 255, 255, 0.2)',
      cardHighlightTextColor: 'rgba(255,255,255, 0.88)',
      cardDividerColor: 'rgba(255,255,255, 0.1)',
      // Card Stack
      cardStackBgColor: '#000',
      cardStackBorderColor: '#525252',
      cardStackFocusBgColor: '#333',
      cardStackFocusTextColor: 'rgba(255,255,255, 0.88)',
      // Other
      scrimColor: 'rgba(0, 0, 0, 0.7)',
    },
  },
];
