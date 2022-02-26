<script lang="ts">
  import { onDestroy } from 'svelte';
  import { location, pop } from 'svelte-spa-router';
  import { ViewState } from '../../enums';
  import { onKeyPress } from '../../hooks';
  import { resetNavigation } from '../../stores/navigator';
  import { appMenu, resetView, updateView, view } from '../../stores/view';
  import Drawer from '../drawer/Drawer.svelte';
  import ViewCards from './ViewCards.svelte';

  onKeyPress(
    {
      SoftLeft: () => {
        if ($view.viewing === ViewState.Content && $view.cards.length > 1) {
          updateView({ viewing: ViewState.Cards });
        } else if ($view.viewing === ViewState.Content) {
          updateView({ viewing: ViewState.AppMenu });
        } else if ($view.viewing === ViewState.Cards) {
          updateView({ viewing: ViewState.AppMenu });
        } else {
          updateView({ viewing: ViewState.Content });
        }
      },
      SoftRight: () => {
        updateView({
          viewing: $view.viewing === ViewState.Drawer ? ViewState.Content : ViewState.Drawer,
        });
      },
      Backspace: () => {
        if ($view.viewing !== ViewState.Content) {
          updateView({ viewing: ViewState.Content });
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
      case ViewState.AppMenu:
        offset = menuHeight;
        break;
      case ViewState.Cards:
        offset = cardsHeight;
        break;
      case ViewState.Drawer:
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

<div class="root" class:end={$view.viewing === ViewState.Drawer}>
  <div bind:clientHeight={menuHeight}>
    {#if $view.viewing === ViewState.AppMenu}
      <svelte:component this={$appMenu} />
    {/if}
  </div>
  <div bind:clientHeight={cardsHeight}>
    {#if $view.viewing === ViewState.Cards}
      <ViewCards />
    {/if}
  </div>
  <div class="content" style={`transform: translateY(${offset}px)`}>
    <slot />
    <slot name="dashboard" />
  </div>
  <div bind:clientHeight={drawerHeight}>
    {#if $view.viewing === ViewState.Drawer}
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
