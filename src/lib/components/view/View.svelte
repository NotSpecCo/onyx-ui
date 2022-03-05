<script lang="ts">
  import { onDestroy } from 'svelte';
  import { location, pop } from 'svelte-spa-router';
  import { dpad } from '../../actions/dpad';
  import { OpenState, ViewState } from '../../enums';
  import { menu } from '../../stores/menu';
  import { resetNavigation } from '../../stores/navigator';
  import { appMenu, resetView, updateView, view } from '../../stores/view';
  import ContextMenu from '../contextMenu/ContextMenu.svelte';
  import ViewCards from './ViewCards.svelte';

  let menuHeight: number | null = null;
  let cardsHeight: number | null = null;

  let offset = 0;
  $: {
    switch ($view.viewing) {
      case ViewState.AppMenu:
        offset = menuHeight;
        break;
      case ViewState.Cards:
        offset = cardsHeight;
        break;
      default:
        offset = 0;
    }
  }

  onDestroy(() => {
    resetView();
    resetNavigation();
    menu.reset();
  });
</script>

<div
  class="root"
  use:dpad={{
    onSoftLeft: () => {
      if ($view.viewing === ViewState.Content && $view.cards.length > 1) {
        updateView({ viewing: ViewState.Cards });
      } else if ($view.viewing === ViewState.Content) {
        updateView({ viewing: ViewState.AppMenu });
      } else if ($view.viewing === ViewState.Cards) {
        updateView({ viewing: ViewState.AppMenu });
      } else {
        updateView({ viewing: ViewState.Content });
      }
      return true;
    },
    onBackspace: () => {
      if ($view.viewing !== ViewState.Content) {
        updateView({ viewing: ViewState.Content });
        return true;
      }

      // If on the main screen, let KaiOS minimize the app
      if ($location === '/') {
        return false;
      }
      pop();
      return true;
    },
  }}
>
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
  {#if $menu.state > OpenState.Destroyed}
    <ContextMenu />
  {/if}
</div>

<style>
  .root {
    position: relative;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100vh;
    transition: transform var(--animation-speed);
    transform: translateY(0px);
    z-index: 9;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 0 5px hsla(0, 0%, 0%, 20%);
    border-radius: var(--radius) var(--radius) 0 0;
  }
</style>
