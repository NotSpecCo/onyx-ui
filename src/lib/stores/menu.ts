import { get, writable } from 'svelte/store';
import { OpenState } from '../enums';
import type { ContextMenu } from '../models';
import { delay } from '../utils/delay';

type MenuConfig = ContextMenu & {
  state: OpenState;
  animationSpeed: number;
};

const defaultConfig: MenuConfig = {
  title: 'Context Menu',
  items: [],
  state: OpenState.Destroyed,
  animationSpeed: 500,
};

function createMenu() {
  const menu = writable<MenuConfig>(defaultConfig);

  async function open(config: Omit<MenuConfig, 'state'>) {
    if (get(menu).state >= OpenState.Opening) {
      return;
    }
    menu.set({ ...config, state: OpenState.Closed });
    await delay(0);
    menu.update((val) => ({ ...val, state: OpenState.Opening }));
    await delay(config.animationSpeed);
    menu.update((val) => ({ ...val, state: OpenState.Open }));
  }

  async function close() {
    if (get(menu).state !== OpenState.Open) {
      return;
    }
    menu.update((val) => ({ ...val, state: OpenState.Open }));
    await delay(0);
    menu.update((val) => ({ ...val, state: OpenState.Closing }));
    await delay(get(menu).animationSpeed);
    menu.set(defaultConfig);
  }

  async function reset() {
    menu.set(defaultConfig);
  }

  return {
    subscribe: menu.subscribe,
    open,
    close,
    reset,
  };
}

export const menu = createMenu();
