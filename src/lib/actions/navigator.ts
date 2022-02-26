import { tick } from 'svelte';
import { replace } from 'svelte-spa-router';
import { get } from 'svelte/store';
import {
  activateGroup,
  activeGroup,
  deactivateGroup,
  getFocusedItemId,
  setSelectedId,
} from '../stores/navigator';
import { switchCard } from '../stores/view';
import { getIndex } from '../utils/array';
import { setFocusedId } from '../utils/route';

type Config = {
  groupId: string;
  initialFocusedId?: string;
  enableCardSwitching?: boolean;
  updateRoute?: boolean;
  viewLoaded?: boolean;
};

export function navigator(node: HTMLElement, config: Config) {
  node.dataset.navGroupId = config.groupId;

  activateGroup(config.groupId);

  function setInitial(itemId?: string) {
    if (itemId) {
      const item: HTMLElement = node.querySelector(`[data-nav-id="${itemId}"]`);
      if (item) {
        setSelectedId(config.groupId, itemId);
        item?.dispatchEvent(new CustomEvent('itemfocus'));
        const scroller: HTMLElement = node.querySelector(`[data-nav-scroller]`);
        scrollIntoView(scroller, item, 'auto');
      }
    }
  }

  function handleKeyPress(ev: KeyboardEvent) {
    const groupActive = get(activeGroup)?.id === config.groupId;

    // Check if valid key
    const target = ev.target as HTMLElement | null;
    const dpadKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'];
    const shortcutKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (
      !groupActive ||
      ev.shiftKey || // Allow Shift+ArrowLeft/Right to trigger soft keys
      ![...dpadKeys, ...shortcutKeys].includes(ev.key) ||
      (!['ArrowUp', 'ArrowDown'].includes(ev.key) && target?.tagName.toLowerCase() === 'input') ||
      (!['ArrowUp', 'ArrowDown'].includes(ev.key) &&
        (target?.attributes as any).role?.value === 'textbox')
    ) {
      return;
    }

    // Handle card switching first
    if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') {
      if (config.enableCardSwitching) switchCard(ev.key === 'ArrowLeft' ? -1 : 1);
      return;
    }

    const scroller: HTMLElement = node.querySelector(`[data-nav-scroller]`);

    const focusedItemId = getFocusedItemId(config.groupId);
    const items: HTMLElement[] = Array.from(node.querySelectorAll(`[data-nav-id]`));
    const currentItemIndex = items.findIndex((a) => a.dataset.navId === focusedItemId);

    // Handle Enter key
    if (items[currentItemIndex] && ev.key === 'Enter') {
      items[currentItemIndex].dispatchEvent(new CustomEvent('itemfocus'));
      items[currentItemIndex].dispatchEvent(new CustomEvent('itemselect'));
      return;
    }

    // Handle shortcut keys
    const shortcutItem = items.find((a) => a.dataset.navShortcut === ev.key);
    if (shortcutItem) {
      scrollIntoView(scroller, shortcutItem, 'auto');
      setSelectedId(config.groupId, shortcutItem.dataset.navId);

      if (config.updateRoute) {
        replace(setFocusedId(shortcutItem.dataset.navId));
      }

      items[currentItemIndex]?.dispatchEvent(new CustomEvent('itemblur'));
      shortcutItem.dispatchEvent(new CustomEvent('itemfocus'));
      shortcutItem.dispatchEvent(new CustomEvent('itemselect'));

      return;
    } else if (shortcutKeys.includes(ev.key)) {
      return;
    }

    // If at first item and more content above, scroll up
    if (
      scroller &&
      (items.length === 0 || currentItemIndex === 0) &&
      ev.key === 'ArrowUp' &&
      scroller.scrollTop > 0
    ) {
      scrollContent('up', scroller);
      return;
    }

    // If at last item and more content below, scroll down
    if (
      scroller &&
      currentItemIndex === items.length - 1 &&
      ev.key === 'ArrowDown' &&
      scroller.scrollTop + scroller.clientHeight < scroller.scrollHeight
    ) {
      scrollContent('down', scroller);
      return;
    }

    // Find next item and scroll to it
    let nextItem = null;
    if (ev.key === 'ArrowUp' && currentItemIndex === 0) {
      nextItem = null;
    } else {
      const idx = getIndex(items, currentItemIndex, ev.key === 'ArrowUp' ? -1 : 1, true);
      nextItem = items[idx];
    }

    setSelectedId(config.groupId, nextItem?.dataset?.navId);
    items[currentItemIndex]?.dispatchEvent(new CustomEvent('itemblur'));
    nextItem?.dispatchEvent(new CustomEvent('itemfocus'));

    scrollIntoView(scroller, nextItem, 'smooth');

    if (config.updateRoute) {
      replace(setFocusedId(nextItem?.dataset.navId));
    }
  }

  function scrollContent(direction: 'up' | 'down', scroller?: HTMLElement): boolean {
    if (!scroller) return;

    scroller.scrollBy({
      top: (scroller.clientHeight / 3) * (direction === 'up' ? -1 : 1),
      behavior: 'smooth',
    });
  }

  function scrollIntoView(
    scroller?: HTMLElement,
    item?: HTMLElement,
    behavior: 'smooth' | 'auto' = 'auto'
  ): boolean {
    if (!scroller || !item) {
      return;
    }

    const rect = item.getBoundingClientRect();
    const topDiff = scroller.offsetTop - rect.top;
    const bottomDiff = rect.bottom - (scroller.offsetHeight + scroller.offsetTop);

    scroller.scrollBy({
      top: topDiff > 0 ? -topDiff : bottomDiff > 0 ? bottomDiff : 0,
      behavior,
    });

    return true;
  }

  document.addEventListener('keydown', handleKeyPress, false);

  return {
    destroy() {
      document.removeEventListener('keydown', handleKeyPress, false);
      deactivateGroup(config.groupId);
    },
    async update(newConfig: Config) {
      // Set initial focus only after data loaded and rendered
      if (!config.viewLoaded && newConfig.viewLoaded && newConfig.initialFocusedId) {
        await tick();
        setInitial(newConfig.initialFocusedId);
      }

      config = newConfig;
    },
  };
}
