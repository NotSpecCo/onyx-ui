import { get, writable } from 'svelte/store';
import { OpenState } from '../enums';
import type { ContextMenu } from '../models';
import { delay } from '../utils/delay';

type StackConfig = ContextMenu & {
  state: OpenState;
  animationSpeed: number;
};

const defaultConfig: StackConfig = {
  title: 'Context Menu',
  items: [],
  state: OpenState.Destroyed,
  animationSpeed: 500,
};

function createStack() {
  const stack = writable<StackConfig>(defaultConfig);

  async function open(config: Omit<StackConfig, 'state'>) {
    if (get(stack).state >= OpenState.Opening) {
      return;
    }
    stack.set({ ...config, state: OpenState.Closed });
    await delay(0);
    stack.update((val) => ({ ...val, state: OpenState.Opening }));
    await delay(config.animationSpeed);
    stack.update((val) => ({ ...val, state: OpenState.Open }));
  }

  async function close() {
    if (get(stack).state !== OpenState.Open) {
      return;
    }
    stack.update((val) => ({ ...val, state: OpenState.Open }));
    await delay(0);
    stack.update((val) => ({ ...val, state: OpenState.Closing }));
    await delay(get(stack).animationSpeed);
    stack.set(defaultConfig);
  }

  async function reset() {
    stack.set(defaultConfig);
  }

  return {
    subscribe: stack.subscribe,
    open,
    close,
    reset,
  };
}

export const stack = createStack();
