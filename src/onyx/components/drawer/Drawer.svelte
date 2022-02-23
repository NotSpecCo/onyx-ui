<script lang="ts">
  import { onDestroy, onMount, setContext } from 'svelte';
  import { navigator } from '../../actions/navigator';
  import type { DrawerAction } from '../../models';
  import { activateGroup, deactivateGroup } from '../../stores/navigator';
  import { shortcutFromIndex } from '../../utils/shortcutFromIndex';
  import DrawerItem from './DrawerItem.svelte';

  export let actions: DrawerAction[] = [];

  const NAV_GROUP = Symbol();
  setContext('nav-group', NAV_GROUP);

  onMount(() => activateGroup(NAV_GROUP));
  onDestroy(() => deactivateGroup(NAV_GROUP));
</script>

<div class="root" use:navigator={{ groupId: NAV_GROUP }}>
  <div class="scroller" data-nav-scroller>
    {#each actions as action, i}
      <DrawerItem
        primaryText={action.primaryText}
        secondaryText={action.secondaryText}
        navi={{
          itemId: action.id,
          shortcutKey: shortcutFromIndex(i),
          onSelect: action.onSelect,
        }}
      />
    {/each}
  </div>
</div>

<style>
  .root {
    max-height: 50vh;
    display: flex;
  }
  .scroller {
    overflow-y: auto;
    flex: 1;
  }
</style>
