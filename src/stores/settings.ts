import { writable } from 'svelte/store';
import { Animations, Density, TextSize, TextWeight } from '../lib/enums';
import { themes } from '../lib/themes';
import { getStorageItem, setStorageItem, StorageKey } from '../lib/utils/storage';
import type { Settings } from '../models';

const defaultSettings: Settings = {
  theme: themes[0].id,
  textSize: TextSize.Medium,
  textWeight: TextWeight.Medium,
  displayDensity: Density.Normal,
  borderRadius: 14,
  animations: Animations.Normal,
  showHintText: true,
  // Accent
  accentColorH: themes[0].values.accentColorH,
  accentColorS: themes[0].values.accentColorS,
  accentColorL: themes[0].values.accentColorL,
  // Card
  cardColorH: themes[0].values.cardColorH,
  cardColorS: themes[0].values.cardColorS,
  cardColorL: themes[0].values.cardColorL,
  textColorH: themes[0].values.textColorH,
  textColorS: themes[0].values.textColorS,
  textColorL: themes[0].values.textColorL,
  focusColorA: themes[0].values.focusColorA,
  // Drawer
  drawerColorH: themes[0].values.drawerColorH,
  drawerColorS: themes[0].values.drawerColorS,
  drawerColorL: themes[0].values.drawerColorL,
  drawerTextColorH: themes[0].values.drawerTextColorH,
  drawerTextColorS: themes[0].values.drawerTextColorS,
  drawerTextColorL: themes[0].values.drawerTextColorL,
  drawerFocusColorA: themes[0].values.drawerFocusColorA,
};

const storedSettings = getStorageItem<Settings>(StorageKey.Settings);

function createSettings() {
  const { subscribe, update, set } = writable<Settings>({
    ...defaultSettings,
    ...storedSettings,
  });

  subscribe((val) => {
    setStorageItem(StorageKey.Settings, val);
  });

  return {
    subscribe,
    update: function (data: Partial<Settings>) {
      update((previous) => ({ ...previous, ...data }));
    },
    updateOne: function <T extends keyof Settings>(key: T, value: Settings[T]) {
      update((previous) => ({ ...previous, [key]: value }));
    },
  };
}

export const settings = createSettings();
