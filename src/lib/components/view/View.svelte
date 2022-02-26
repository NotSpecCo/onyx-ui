<script lang="ts">
  import { onDestroy } from 'svelte';
  import { location, pop } from 'svelte-spa-router';
  import { onKeyPress } from '../../hooks';
  import { resetNavigation } from '../../stores/navigator';
  import { appMenu, resetView, updateView, view } from '../../stores/view';
  import Drawer from '../drawer/Drawer.svelte';
  import ViewCards from './ViewCards.svelte';

  onKeyPress(
    {
      SoftLeft: () => {
        if ($view.viewing === 'content' && $view.cards.length > 1) {
          updateView({ viewing: 'cards' });
        } else if ($view.viewing === 'content') {
          updateView({ viewing: 'appmenu' });
        } else if ($view.viewing === 'cards') {
          updateView({ viewing: 'appmenu' });
        } else {
          updateView({ viewing: 'content' });
        }
      },
      SoftRight: () => {
        updateView({ viewing: $view.viewing === 'drawer' ? 'content' : 'drawer' });
      },
      Backspace: () => {
        if ($view.viewing !== 'content') {
          updateView({ viewing: 'content' });
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
  let cardsHeight: number | null = null;
  let drawerHeight: number | null = null;

  let offset = 0;
  $: {
    switch ($view.viewing) {
      case 'appmenu':
        offset = menuHeight;
        break;
      case 'cards':
        offset = cardsHeight;
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

<div class="root" class:end={$view.viewing === 'drawer'}>
  <div bind:clientHeight={menuHeight}>
    {#if $view.viewing === 'appmenu'}
      <svelte:component this={$appMenu} />
    {/if}
  </div>
  <div bind:clientHeight={cardsHeight}>
    {#if $view.viewing === 'cards'}
      <ViewCards />
    {/if}
  </div>
  <div class="content" style={`transform: translateY(${offset}px)`}>
    <slot />
    <slot name="dashboard" />
  </div>
  <div bind:clientHeight={drawerHeight}>
    {#if $view.viewing === 'drawer'}
      <Drawer />
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
