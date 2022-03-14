import { get, writable } from 'svelte/store';
import { RenderState } from '../enums';
import type { ContextMenu } from '../models';
import { delay } from '../utils';

type Config = ContextMenu & {
  animationSpeed: number;
  state: RenderState;
};

const defaultMenu: ContextMenu = {
  title: 'Menu',
  items: [],
};
const defaultConfig: Config = {
  ...defaultMenu,
  state: RenderState.Destroyed,
  animationSpeed: 500,
};

function createStore() {
  const store = writable<Config>(defaultConfig);

  function update(config: Partial<Config>) {
    store.set({ ...defaultConfig, ...config });
  }

  async function open(menu: Omit<Config, 'animationSpeed' | 'state'>) {
    if (get(store).state !== RenderState.Destroyed) {
      return;
    }

    store.update((val) => ({ ...val, ...menu, state: RenderState.Closed }));
    await delay(50);
    store.update((val) => ({ ...val, ...menu, state: RenderState.Open }));
    await delay(get(store).animationSpeed);
  }

  async function close() {
    if (get(store).state !== RenderState.Open) {
      return;
    }

    store.update((val) => ({ ...val, state: RenderState.Closed }));
    await delay(get(store).animationSpeed);
    store.update((val) => ({ ...val, ...defaultMenu, state: RenderState.Destroyed }));
  }

  async function reset() {
    store.update((val) => ({ ...val, ...defaultMenu, state: RenderState.Destroyed }));
  }

  return {
    subscribe: store.subscribe,
    update,
    open,
    close,
    reset,
  };
}

export const contextMenu = createStore();
