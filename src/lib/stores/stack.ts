import { get, writable } from 'svelte/store';
import type { ViewInstance, ViewType } from '../models';
import { createUniqueId } from '../utils/createUniqueId';

type StackConfig = {
  types: ViewType[];
  history: ViewInstance[];
  activeInstance?: ViewInstance;
  navDirection: 'back' | 'forward';
};

const defaultConfig: StackConfig = {
  types: [],
  history: [],
  navDirection: 'forward',
};

function createStack() {
  const stack = writable<StackConfig>(defaultConfig);

  function init(types: ViewType[], initialViewId: string, initialViewState: any) {
    const type = types.find((a) => a.id === initialViewId);
    const instance = {
      id: createUniqueId(),
      type,
      state: {
        ...initialViewState,
      },
    };

    stack.set({
      types,
      history: [instance],
      activeInstance: instance,
      navDirection: 'forward',
    });

    window.history.replaceState(instance, '', `#/${instance.type.id}`);
  }

  async function push(viewTypeId: string, title?: string, state: any = {}) {
    const type = get(stack).types.find((a) => a.id === viewTypeId);
    if (!type) return;

    const instance: ViewInstance = {
      id: createUniqueId(),
      type,
      title,
      state: {
        ...state,
      },
    };

    const history = get(stack).history;
    history.push(instance);

    window.history.pushState(instance, '', `#/${instance.type.id}`);

    stack.update((a) => ({ ...a, history, activeInstance: instance, navDirection: 'forward' }));
  }

  function updateTitle(id: string, title: string) {
    const history = get(stack).history;
    const index = history.findIndex((a) => a.id === id);
    if (index === -1) return;

    history[index].title = title;

    stack.update((a) => ({ ...a, history }));
    window.history.replaceState(history[index], '', `#/${history[index].type.id}`);
  }

  function updateState(id: string, state: any) {
    const history = get(stack).history;
    const index = history.findIndex((a) => a.id === id);
    if (index === -1) return;

    history[index].state = state;

    stack.update((a) => ({ ...a, history }));
    window.history.replaceState(history[index], '', `#/${history[index].type.id}`);
  }

  async function back() {
    const history = get(stack).history;
    if (history.length === 1) return;

    window.history.back();
    stack.update((a) => ({
      ...a,
      history: history.slice(0, -1),
      activeInstance: history.at(-2),
      navDirection: 'back',
    }));
  }

  return {
    subscribe: stack.subscribe,
    init,
    push,
    updateTitle,
    updateState,
    back,
  };
}

export const stack = createStack();
