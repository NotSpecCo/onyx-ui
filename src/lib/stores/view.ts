import { get, writable } from 'svelte/store';
import { OpenState } from '../enums';
import type { ContextMenu } from '../models';
import { delay } from '../utils/delay';

type MenuConfig = ContextMenu & {
  state: OpenState;
  animationSpeed: number;
};

const defaultMenuConfig: MenuConfig = {
  title: 'Context Menu',
  items: [],
  state: OpenState.Destroyed,
  animationSpeed: 500,
};

type ViewConfig = {
  menuState: OpenState;
  stackState: OpenState;
};
const defaultConfig: ViewConfig = {
  menuState: OpenState.Closed,
  stackState: OpenState.Closed,
};

function createView() {
  const view = writable<ViewConfig>(defaultConfig);
  const menu = writable<MenuConfig>(defaultMenuConfig);

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
    menu.set(defaultMenuConfig);
  }

  return {
    subscribe: view.subscribe,
  };
}

export const view = createView();
