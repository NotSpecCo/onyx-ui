<script lang="ts">
  import { onDestroy } from 'svelte';
  import { location, pop } from 'svelte-spa-router';
  import { onKeyPress } from '../../hooks';
  import type { Tab } from '../../models';
  import { resetNavigation } from '../../stores/navigator';
  import {
    activeTab as viewActiveTab,
    registerTabs,
    resetView,
    tabs as viewTabs,
    viewing,
  } from '../../stores/view';
  import ViewTabs from './ViewTabs.svelte';

  export let tabs: Tab[] = [];
  export let activeTab: string = null;
  export let onTabChange: (tabId: string) => void = null;

  registerTabs(tabs, activeTab);
  const unsubscribe = viewActiveTab.subscribe((tabId) => onTabChange?.(tabId));

  onDestroy(() => unsubscribe());

  onKeyPress(
    {
      SoftLeft: () => {
        console.log('SoftLeft');
        if ($viewing === 'content' && $viewTabs.length > 1) {
          viewing.set('tabs');
        } else if ($viewing === 'content') {
          viewing.set('appmenu');
        } else if ($viewing === 'tabs') {
          viewing.set('appmenu');
        } else {
          viewing.set('content');
        }
        // if ($drawerOpen) {
        //   drawerOpen.set(false);
        // }

        // if (!$)
        // menuOpen.set(!$menuOpen);
      },
      SoftRight: () => {
        console.log('SoftRight');
        viewing.set($viewing === 'drawer' ? 'content' : 'drawer');
      },
      Backspace: () => {
        if ($viewing !== 'content') {
          viewing.set('content');
          return;
        }

        // If on the main screen, let KaiOS minimize the app
        if ($location === '/') {
          return false;
        }
        pop();
      },
    },
    { stopPropagation: true }
  );

  onDestroy(() => {
    resetView();
    resetNavigation();
  });
</script>

<div class="root">
  {#if $viewing === 'appmenu'}
    <slot name="appmenu" />
  {/if}
  {#if $viewing === 'tabs'}
    <ViewTabs />
  {/if}
  <slot />
  <slot name="dashboard" />
  {#if $viewing === 'drawer'}
    <slot name="drawer" />
  {/if}
</div>

<style>
  .root {
    /* position: relative; */
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
