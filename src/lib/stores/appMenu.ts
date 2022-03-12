import { get, writable } from 'svelte/store';
import { MenuOpenState } from '../enums';
import { delay } from '../utils/delay';

type MenuConfig = {
  state: MenuOpenState;
  animationSpeed: number;
};

const defaultConfig: MenuConfig = {
  state: MenuOpenState.Destroyed,
  animationSpeed: 500,
};

function createAppMenu() {
  const appMenu = writable<MenuConfig>(defaultConfig);

  function init(config: Omit<MenuConfig, 'state'>) {
    appMenu.set({ ...config, state: MenuOpenState.Destroyed });
  }

  async function open() {
    if (get(appMenu).state !== MenuOpenState.Destroyed) {
      return;
    }

    appMenu.update((val) => ({ ...val, state: MenuOpenState.Closed }));
    await delay(0);
    appMenu.update((val) => ({ ...val, state: MenuOpenState.Open }));
    await delay(get(appMenu).animationSpeed);
  }

  async function close() {
    if (get(appMenu).state !== MenuOpenState.Open) {
      return;
    }

    appMenu.update((val) => ({ ...val, state: MenuOpenState.Closed }));
    await delay(get(appMenu).animationSpeed);
    appMenu.set(defaultConfig);
  }

  async function reset() {
    appMenu.set(defaultConfig);
  }

  return {
    subscribe: appMenu.subscribe,
    init,
    open,
    close,
    reset,
  };
}

export const appMenu = createAppMenu();
