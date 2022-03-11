import { get, writable } from 'svelte/store';
import { AnimationState } from '../enums';
import type { HistoryItem, HistoryState, View } from '../models';
import { delay } from '../utils/delay';

type AppConfig = {
  views: View[];
  history: HistoryItem[];
};

const defaultConfig: AppConfig = {
  views: [],
  history: [],
};

function createApp() {
  const app = writable<AppConfig>(defaultConfig);

  function init(views: View[], initialViewId: string, state: HistoryState) {
    console.log('init', state);

    const view = views.find((a) => a.id === initialViewId);
    app.set({
      views,
      history: [
        {
          id: state.historyId,
          view,
          animState: AnimationState.Center,
          isActive: true,
          state,
        },
      ],
    });
  }
  function reset() {
    app.set(defaultConfig);
  }

  async function navigateTo(viewId: string, state: HistoryState) {
    if (navigating()) return;

    const view = get(app).views.find((a) => a.id === viewId);
    if (!view) return;
    console.log('goto', view, state);

    const history = get(app).history;
    const leaving = history.length - 1;
    const entering = leaving + 1;
    history.push({
      id: state.historyId,
      view,
      animState: AnimationState.Down,
      isActive: true,
      state,
    });

    // Init
    history[leaving].animState = AnimationState.Center;
    history[leaving].isActive = false;
    history[entering].animState = AnimationState.Down;
    app.update((val) => ({
      ...val,
      history,
    }));
    await delay(0);

    // Start
    history[leaving].animState = AnimationState.Center;
    history[entering].animState = AnimationState.Center;
    app.update((val) => ({
      ...val,
      history,
    }));
    await delay(2000);

    // End
    history[leaving].animState = AnimationState.Destroyed;
    history[entering].animState = AnimationState.Center;
    app.update((val) => ({
      ...val,
      history,
    }));

    // replace(`/${view.id}`);
    window.history.pushState(state, '', `#/${view.id}`);
  }

  async function navigateBack() {
    // TODO: When going back, set the active history item to the previous one so the newly rendered view gets the correct historyId
    if (navigating()) return;

    const history = get(app).history;
    if (history.length < 2) return;

    const leaving = history.length - 1;
    const entering = leaving - 1;

    // Init
    history[leaving].animState = AnimationState.Center;
    history[leaving].isActive = false;
    history[entering].animState = AnimationState.Center;
    history[entering].isActive = true;
    app.update((val) => ({
      ...val,
      history,
    }));
    await delay(0);

    // Start
    history[leaving].animState = AnimationState.Down;
    history[entering].animState = AnimationState.Center;
    app.update((val) => ({
      ...val,
      history,
    }));
    await delay(2000);

    // End
    history[leaving].animState = AnimationState.Destroyed;
    history[entering].animState = AnimationState.Center;
    app.update((val) => ({
      ...val,
      history: history.filter((a, i) => i !== leaving),
    }));

    // replace(`/${view.id}`);
    window.history.back();
  }

  function getViewById(id: string): View | null {
    const view = get(app).views.find((a) => a.id === id);
    return view || null;
  }

  function getActiveHistoryItem() {
    return get(app).history.find((a) => a.isActive);
    // return get(app).history.at(-1);
  }

  function navigating(): boolean {
    return get(app).history.filter((a) => a.animState > AnimationState.Destroyed).length > 1;
  }

  return {
    subscribe: app.subscribe,
    init,
    reset,
    navigateTo,
    navigateBack,
    getViewById,
    getActiveHistoryItem,
  };
}

export const app = createApp();
