import { get } from 'svelte/store';
import { activeGroup } from '../stores/navigator';
import { getIndexWrap } from '../utils/array';

type Config = {
  groupId: string;
  tabIds: string[];
  activeTabId: string;
};

export function tabs(node: HTMLElement, config: Config) {
  function handleKeyPress(ev: KeyboardEvent) {
    const groupActive = get(activeGroup)?.id === config.groupId;

    // Check if valid key
    const target = ev.target as HTMLElement | null;
    const keys = ['ArrowLeft', 'ArrowRight'];
    if (!groupActive || !keys.includes(ev.key) || target?.tagName.toLowerCase() === 'input') {
      return;
    }

    const newIndex = getIndexWrap(
      config.tabIds,
      config.tabIds.findIndex((a) => a === config.activeTabId),
      ev.key === 'ArrowLeft' ? -1 : 1
    );
    console.log('newIndex', newIndex);
  }

  document.addEventListener('keydown', handleKeyPress, false);

  return {
    destroy() {
      document.removeEventListener('keydown', handleKeyPress, false);
    },
    update(newConfig: Config) {
      config = newConfig;
    },
  };
}
