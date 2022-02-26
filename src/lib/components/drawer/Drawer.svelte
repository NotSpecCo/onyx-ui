<script lang="ts">
  import { view } from '../../stores/view';
  import { shortcutFromIndex } from '../../utils/shortcutFromIndex';
  import NavGroup from '../nav/NavGroup.svelte';
  import DrawerActionItem from './DrawerActionItem.svelte';
</script>

<NavGroup groupId="drawer">
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
</NavGroup>

<style>
  :global([data-nav-group-id='drawer']) {
    max-height: 50vh;
    display: flex;
  }
  .scroller {
    overflow-y: auto;
    flex: 1;
  }
</style>
