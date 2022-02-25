import { get, writable } from 'svelte/store';
import type { DrawerAction, Tab } from '../models';
import { getIndexWrap } from '../utils/array';

type ViewConfig = {
  viewing: 'appmenu' | 'tabs' | 'content' | 'drawer';
  tabs: Tab[];
  activeTabId: string | null;
  drawerItems: DrawerAction[];
};

const defaultViewConfig: ViewConfig = {
  viewing: 'content',
  tabs: [],
  activeTabId: null,
  drawerItems: [],
};

export const view = writable<ViewConfig>(defaultViewConfig);
export const appMenu = writable<any>(null);

export function registerAppMenu(menu: any) {
  appMenu.set(menu);
}

export function registerView(data: Partial<Omit<ViewConfig, 'activeTab'>>) {
  view.set({ ...defaultViewConfig, ...data });

  if (data.activeTabId) {
    get(view)
      .tabs.find((a) => a.id === data.activeTabId)
      ?.onSelect?.();
  }
}

export function updateView(data: Partial<ViewConfig>) {
  view.update((val) => ({ ...val, ...data }));

  if (data.activeTabId) {
    get(view)
      .tabs.find((a) => a.id === data.activeTabId)
      ?.onSelect?.();
  }
}

export function resetView() {
  view.set(defaultViewConfig);
}

export function switchTab(value: 1 | -1) {
  const v = get(view);

  if (v.tabs.length < 2) {
    return;
  }

  const current = v.tabs.findIndex((a) => a.id === get(view).activeTabId);
  const next = getIndexWrap(v.tabs, current, value);

  console.log('switch', current, next);

  const newTabs = v.tabs.map((a) => ({ ...a, active: false }));
  newTabs[next >= 0 ? next : 0].active = true;

  updateView({ activeTabId: v.tabs[next].id });
}
