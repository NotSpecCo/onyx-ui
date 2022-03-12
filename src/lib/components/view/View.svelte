<script lang="ts">
  import { onDestroy } from 'svelte';
  import { OpenState, ViewState } from '../../enums';
  import { menu } from '../../stores/menu';
  import { resetNavigation } from '../../stores/navigator';
  import { resetView, view } from '../../stores/view';
  import ContextMenu from '../contextMenu/ContextMenu.svelte';
  import ViewCards from './ViewCards.svelte';

  let cardsHeight: number | null = null;

  onDestroy(() => {
    resetView();
    resetNavigation();
    menu.reset();
  });
</script>

<div class="root">
  <div bind:clientHeight={cardsHeight}>
    {#if $view.viewing === ViewState.Cards}
      <ViewCards />
    {/if}
  </div>
  <div class="content" style={`transform: translateY(${cardsHeight || 0}px)`}>
    <slot />
  </div>
  {#if $menu.state > OpenState.Destroyed}
    <ContextMenu />
  {/if}
</div>

<style>
  .root {
    position: relative;
    height: 100%;
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
