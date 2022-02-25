<script lang="ts">
  import { onDestroy, setContext } from 'svelte';
  import { navigator } from '../../actions/navigator';
  import { activateGroup, deactivateGroup, groupItemMap } from '../../stores/navigator';
  import { updateView, view } from '../../stores/view';
  import { shortcutFromIndex } from '../../utils/shortcutFromIndex';
  import Typography from '../Typography.svelte';

  let otherTabs = [];
  $: otherTabs = $view.tabs.filter((a) => a.id !== $view.activeTabId);

  const NAV_GROUP = Symbol();
  setContext('nav-group', NAV_GROUP);

  activateGroup(NAV_GROUP);
  onDestroy(() => deactivateGroup(NAV_GROUP));
</script>

<div class="root" use:navigator={{ groupId: NAV_GROUP, initialSelectedId: $view.activeTabId }}>
  <Typography align="center" type="caption">Press again for app menu</Typography>
  <div data-nav-scroller>
    {#each otherTabs as tab, i}
      <div class="tab-root">
        <div
          class="tab"
          class:focused={tab.id === $groupItemMap[NAV_GROUP]}
          data-nav-id={tab.id}
          data-nav-shortcut={i + 1}
          on:itemselect={() => updateView({ viewing: 'content', activeTabId: tab.id })}
        >
          <div>{tab.title}</div>
          {#if shortcutFromIndex(i)}
            <div class="shortcut">{shortcutFromIndex(i)}</div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .root {
    border-radius: var(--radius) var(--radius) 0 0;
  }
  .tab-root {
    background-color: var(--card-dim-bg-color);
    color: var(--card-primary-text-color);

    border-radius: var(--radius) var(--radius) 0 0;
    padding-bottom: 20px;
    margin-bottom: -20px;
    border: 1px solid var(--drawer-bg-color);
    overflow: hidden;
  }
  .tab {
    padding: 5px 7px;
    padding-bottom: 20px;
    margin-bottom: -15px;
    display: flex;
    justify-content: space-between;
    font-weight: 600;
  }
  .shortcut {
    color: var(--card-secondary-text-color);
  }
  .tab.focused {
    background-color: var(--card-highlight-bg-color);
    color: var(--card-highlight-text-color);
  }
</style>
