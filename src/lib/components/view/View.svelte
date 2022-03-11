<script lang="ts">
  import { onDestroy, setContext } from 'svelte';
  import { location } from 'svelte-spa-router';
  import { dpad } from '../../actions/dpad';
  import { AnimationState, ContextKey, OpenState } from '../../enums';
  import type { ViewContext } from '../../models';
  import { app } from '../../stores/app';
  import { menu } from '../../stores/menu';
  import { resetNavigation } from '../../stores/navigator';
  import { createUniqueId } from '../../utils/createUniqueId';
  import ContextMenu from '../contextMenu/ContextMenu.svelte';

  const historyItem = app.getActiveHistoryItem();

  let animState = $app.history.find((a) => a.id === historyItem.id)?.animState;
  $: animState = $app.history.find((a) => a.id === historyItem.id)?.animState;

  setContext<ViewContext>(ContextKey.View, { viewId: '???' });

  onDestroy(() => {
    resetNavigation();
    menu.reset();
  });
</script>

<div
  class="root"
  class:up={animState === AnimationState.Up}
  class:down={animState === AnimationState.Down}
  class:left={animState === AnimationState.Left}
  class:right={animState === AnimationState.Right}
  use:dpad={{
    // onSoftLeft: () => {
    //   return true;
    // },
    onSoftRight: () => {
      app.navigateTo('view1', { historyId: createUniqueId() });
      return true;
    },
    onBackspace: () => {
      // If on the app menu, let KaiOS minimize the app
      if ($location === '/app-menu') {
        return false;
      }
      app.navigateBack();
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
    transition: transform 350ms;
    transform: translateY(0px);
  }
  .root.up {
    transform: translateY(-100vh);
  }
  .root.down {
    transform: translateY(100vh);
  }
  .root.left {
    transform: translateX(-100vw);
  }
  .root.right {
    transform: translateX(100vw);
  }
</style>
