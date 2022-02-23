<script lang="ts">
  // import { onDestroy, onMount, setContext } from 'svelte';
  // import { get } from 'svelte/store';
  // import { navigator } from '../../actions/navigator';
  // import { activateGroup, activeGroup, deactivateGroup } from '../../stores/navigator';
  // import { getIndexWrap } from '../../utils/array';

  // export let tabs: string[] = [];
  // export let activeTabId: string = null;
  // export let onTabChange: (tabId: string) => void = null;

  // function handleKeyPress(ev: KeyboardEvent) {
  //   const groupActive = get(activeGroup)?.id === NAV_GROUP;

  //   // Check if valid key
  //   const target = ev.target as HTMLElement | null;
  //   const keys = ['ArrowLeft', 'ArrowRight'];
  //   if (!groupActive || !keys.includes(ev.key) || target?.tagName.toLowerCase() === 'input') {
  //     return;
  //   }

  //   const newIndex = getIndexWrap(
  //     tabs,
  //     tabs.findIndex((a) => a === activeTabId),
  //     ev.key === 'ArrowLeft' ? -1 : 1
  //   );
  //   console.log('newIndex', newIndex);
  //   // resetNavigation();
  //   onTabChange(tabs[newIndex]);
  // }

  // const NAV_GROUP = 'view-content';
  // setContext('nav-group', NAV_GROUP);

  // onMount(() => {
  //   document.addEventListener('keydown', handleKeyPress, false);
  //   activateGroup(NAV_GROUP);
  // });
  // onDestroy(() => {
  //   document.removeEventListener('keydown', handleKeyPress, false);
  //   deactivateGroup(NAV_GROUP);
  // });
</script>

<div class="root">
  <slot />
</div>

<style>
  .root {
    flex: 1;
    overflow: hidden;
  }
</style>
