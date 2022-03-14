import { get, writable } from 'svelte/store';
import { RenderState } from '../enums';
import { delay } from '../utils';

type Config = {
  state: RenderState;
  animationSpeed: number;
};

const defaultConfig: Config = {
  state: RenderState.Destroyed,
  animationSpeed: 500,
};

function createStore() {
  const store = writable<Config>(defaultConfig);

  function update(config: Partial<Config>) {
    store.set({ ...defaultConfig, ...config });
  }

  async function open() {
    if (get(store).state !== RenderState.Destroyed) {
      return;
    }

    store.update((val) => ({ ...val, state: RenderState.Closed }));
    await delay(50);
    store.update((val) => ({ ...val, state: RenderState.Open }));
    await delay(get(store).animationSpeed);
  }

  async function close() {
    if (get(store).state !== RenderState.Open) {
      return;
    }

    store.update((val) => ({ ...val, state: RenderState.Closed }));
    await delay(get(store).animationSpeed);
    store.update((val) => ({ ...val, state: RenderState.Destroyed }));
  }

  return {
    subscribe: store.subscribe,
    update,
    open,
    close,
  };
}

export const appMenu = createStore();
