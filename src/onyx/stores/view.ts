import { get, writable } from 'svelte/store';
import type { Tab } from '../models';
import { getIndexWrap } from '../utils/array';

// View
export const viewing = writable<'appmenu' | 'tabs' | 'content' | 'drawer'>('content');

// Tabs
export const tabs = writable<Tab[]>([]);
export const activeTab = writable<string | null>(null);

export function registerTabs(data: Tab[], active: string | null) {
  tabs.set(data);
  if (active) activeTab.set(active);
}

export function switchTab(value: 1 | -1) {
  if (get(tabs).length < 2) {
    return;
  }

  const current = get(tabs).findIndex((a) => a.id === get(activeTab));
  const next = getIndexWrap(get(tabs), current, value);

  activeTab.set(get(tabs)[next]?.id);
}

export function resetView() {
  viewing.set('content');
  tabs.set([]);
  activeTab.set(null);
}
