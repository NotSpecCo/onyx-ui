import { Theme } from './models/Settings';

export type ThemeConfig = {
  id: Theme;
  values: {
    [key: string]: string;
    // Drawer
    drawerBgcolor: string;
    drawerAccentColor: string;
    drawerPrimaryTextColor: string;
    drawerSecondaryTextColor: string;
    drawerAccentTextColor: string;
    drawerHighlightBgColor: string;
    drawerHighlightTextColor: string;
    drawerDividerColor: string;
    // Card
    cardBgcolor: string;
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
      drawerBgcolor: '#000000',
      drawerAccentColor: '#485665',
      drawerPrimaryTextColor: 'rgba(255, 255, 255, 0.88)',
      drawerSecondaryTextColor: 'rgba(255, 255, 255, 0.5)',
      drawerAccentTextColor: '#485665',
      drawerHighlightBgColor: 'rgba(255, 255, 255, 0.1)',
      drawerHighlightTextColor: 'rgba(255, 255, 255, 0.88)',
      drawerDividerColor: 'rgba(255, 255, 255, 0.1)',
      // Card
      cardBgcolor: '#ffffff',
      cardAccentColor: '#485665',
      cardPrimaryTextColor: 'rgba(0, 0, 0, 0.88)',
      cardSecondaryTextColor: 'rgba(0, 0, 0, 0.5)',
      cardAccentTextColor: '#485665',
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
      drawerBgcolor: '#000000',
      drawerAccentColor: '#485665',
      drawerPrimaryTextColor: 'rgba(255, 255, 255, 0.88)',
      drawerSecondaryTextColor: 'rgba(255, 255, 255, 0.5)',
      drawerAccentTextColor: '#485665',
      drawerHighlightBgColor: 'rgba(255, 255, 255, 0.1)',
      drawerHighlightTextColor: 'rgba(255, 255, 255, 0.88)',
      drawerDividerColor: 'rgba(255, 255, 255, 0.1)',
      // Card
      cardBgcolor: '#ffffff',
      cardAccentColor: '#485665',
      cardPrimaryTextColor: 'rgba(0, 0, 0, 0.88)',
      cardSecondaryTextColor: 'rgba(0, 0, 0, 0.5)',
      cardAccentTextColor: '#485665',
      cardHighlightBgColor: 'rgba(255, 255, 255, 0.1)',
      cardHighlightTextColor: 'rgba(0, 0, 0, 0.88)',
      cardDividerColor: 'rgba(0, 0, 0, 0.1)',
      // Other
      scrimColor: 'string',
    },
  },
];
