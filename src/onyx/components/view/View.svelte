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

  let menuHeight: number | null = null;
  let tabsHeight: number | null = null;
  let drawerHeight: number | null = null;

  let offset = 0;
  $: {
    switch ($viewing) {
      case 'appmenu':
        offset = menuHeight;
        break;
      case 'tabs':
        offset = tabsHeight;
        break;
      case 'drawer':
        offset = -drawerHeight;
        break;
      default:
        offset = 0;
    }
  }

  onDestroy(() => {
    resetView();
    resetNavigation();
  });
</script>

<div class="root" class:end={$viewing === 'drawer'}>
  <div bind:clientHeight={menuHeight}>
    {#if $viewing === 'appmenu'}
      <slot name="appmenu" />
    {/if}
  </div>
  <div bind:clientHeight={tabsHeight}>
    {#if $viewing === 'tabs'}
      <ViewTabs />
    {/if}
  </div>
  <div class="content" style={`transform: translateY(${offset}px)`}>
    <slot name="content" />
    <slot name="dashboard" />
  </div>
  <div bind:clientHeight={drawerHeight}>
    {#if $viewing === 'drawer'}
      <slot name="drawer" />
    {/if}
  </div>
</div>

<style>
  .root {
    position: relative;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .end {
    justify-content: flex-end;
  }
  .content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100vh;
    transition: transform 250ms;
    transform: translateY(0px);
    z-index: 9;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
</style>
