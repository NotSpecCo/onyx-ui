import { writable } from 'svelte/store';
import { getStorageItem, setStorageItem, StorageKey } from '../lib/utils/storage';
import { Density, Settings, TextSize, Theme } from '../models';

const defaultSettings: Settings = {
  theme: Theme.Light,
  accentColor: '#485665',
  textSize: TextSize.Medium,
  displayDensity: Density.Normal,
};

const storedSettings = getStorageItem<Settings>(StorageKey.Settings);

export const settings = writable<Settings>({
  ...defaultSettings,
  ...storedSettings,
});

export function updateSetting<T extends keyof Settings>(key: T, value: Settings[T]): void {
  settings.update((sett) => {
    const newVal = { ...sett, [key]: value };
    setStorageItem(StorageKey.Settings, newVal);
    return newVal;
  });
}
