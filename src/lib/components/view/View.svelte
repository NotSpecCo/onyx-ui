<script lang="ts">
  import { onDestroy, setContext } from 'svelte';
  import { location } from 'svelte-spa-router';
  import { dpad } from '../../actions/dpad';
  import { ContextKey, OpenState } from '../../enums';
  import type { ViewContext, ViewInstance } from '../../models';
  import { menu } from '../../stores/menu';
  import { stack } from '../../stores/stack';
  import { slideIn, slideOut } from '../../transitions';
  import ContextMenu from '../contextMenu/ContextMenu.svelte';

  export let instance: ViewInstance;

  setContext<ViewContext>(ContextKey.View, { instance });
  let goingBack = false;

  onDestroy(() => {
    menu.reset();
  });
</script>

<div
  class="root"
  in:slideIn={{ duration: 1000, from: 'down', to: 'center', zIndex: 7 }}
  out:slideOut={{ duration: 1000, from: 'center', to: 'down', zIndex: goingBack ? 9 : 5 }}
  use:dpad={{
    // onSoftLeft: () => {
    //   return true;
    // },
    onSoftRight: () => {
      stack.push('settings');
      return true;
    },
    onBackspace: () => {
      // If on the app menu, let KaiOS minimize the app
      if ($location === '/app-menu') {
        return false;
      }
      goingBack = true;
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
  }
</style>
