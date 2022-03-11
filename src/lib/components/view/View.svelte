<script lang="ts">
  import { onDestroy, setContext } from 'svelte';
  import { ViewType } from '../../../enums';
  import { dpad } from '../../actions/dpad';
  import { ContextKey, OpenState } from '../../enums';
  import type { ViewContext, ViewInstance } from '../../models';
  import { menu } from '../../stores/menu';
  import { stack } from '../../stores/stack';
  import { slide } from '../../transitions';
  import ContextMenu from '../contextMenu/ContextMenu.svelte';

  export let instance: ViewInstance;

  setContext<ViewContext>(ContextKey.View, { instance });

  onDestroy(() => {
    menu.reset();
  });
</script>

<div
  class="root"
  in:slide={$stack.navDirection === 'back'
    ? { duration: 1000, from: 'center', to: 'center', zIndex: 20, id: instance.type.id }
    : { duration: 1000, from: 'down', to: 'center', zIndex: 20, id: instance.type.id }}
  out:slide={$stack.navDirection === 'back'
    ? { duration: 1000, from: 'center', to: 'down', zIndex: 30, id: instance.type.id }
    : { duration: 1000, from: 'center', to: 'center', zIndex: 10, id: instance.type.id }}
  use:dpad={{
    onSoftLeft: () => {
      stack.push(ViewType.AppMenu);
      return true;
    },
    onSoftRight: () => {
      return true;
    },
    onBackspace: () => {
      // If on the app menu, let KaiOS minimize the app
      // if ($location === '/app-menu') {
      //   return false;
      // }
      stack.back();
      return true;
    },
  }}
>
  <slot />
  {#if $menu.state > OpenState.Destroyed}
    <ContextMenu />
  {/if}
</div>

<style>
  .root {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    color: var(--text-color);
    display: flex;
    flex-direction: column;
    transform: translateY(0);
  }
</style>
