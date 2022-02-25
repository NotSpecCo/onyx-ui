<script lang="ts">
  import { onDestroy, onMount, setContext } from 'svelte';
  import { navigator } from '../../actions/navigator';
  import { activateGroup, deactivateGroup } from '../../stores/navigator';
  import { view } from '../../stores/view';
  import { shortcutFromIndex } from '../../utils/shortcutFromIndex';
  import DrawerActionItem from './DrawerActionItem.svelte';

  const NAV_GROUP = Symbol();
  setContext('nav-group', NAV_GROUP);

  onMount(() => activateGroup(NAV_GROUP));
  onDestroy(() => deactivateGroup(NAV_GROUP));
</script>

<div class="root" use:navigator={{ groupId: NAV_GROUP }}>
  <div class="scroller" data-nav-scroller>
    {#each $view.drawerItems as action, i}
      <DrawerActionItem
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
