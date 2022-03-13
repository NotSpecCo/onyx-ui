import { writable } from 'svelte/store';
import { MenuOpenState } from '../enums';
import type { BaseSettings } from '../models';

type CardsConfig = {
  settings: BaseSettings;
  appMenu: AppMenu;
  contextMenu: ContextMenu;
};

const defaultConfig: CardsConfig = {
  settings: defaultSettings,
  appMenu: { state: MenuOpenState.Destroyed },
  contextMenu: { state: MenuOpenState.Destroyed, title: null, items: [] },
};

function createApp() {
  const app = writable<CardsConfig>(defaultConfig);

  return {
    subscribe: app.subscribe,
  };
}

export const cards = createApp();
