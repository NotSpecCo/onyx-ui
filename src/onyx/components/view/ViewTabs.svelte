<script lang="ts">
  import { onDestroy, setContext } from 'svelte';
  import { navigator } from '../../actions/navigator';
  import { activateGroup, deactivateGroup, groupItemMap } from '../../stores/navigator';
  import { activeTab, tabs, viewing } from '../../stores/view';
  import { shortcutFromIndex } from '../../utils/shortcutFromIndex';

  let otherTabs = [];
  $: otherTabs = $tabs.filter((a) => a.id !== $activeTab);

  const NAV_GROUP = Symbol();
  setContext('nav-group', NAV_GROUP);

  activateGroup(NAV_GROUP);
  onDestroy(() => deactivateGroup(NAV_GROUP));
</script>

<div class="root" use:navigator={{ groupId: NAV_GROUP, initialSelectedId: $activeTab }}>
  <div data-nav-scroller>
    {#each otherTabs as tab, i}
      <div class="tab-root">
        <div
          class="tab"
          class:focused={tab.id === $groupItemMap[NAV_GROUP]}
          data-nav-id={tab.id}
          data-nav-shortcut={i + 1}
          on:itemselect={() => {
            activeTab.set(tab.id);
            viewing.set('content');
          }}
        >
          <div class="tab-title">{tab.title}</div>
          {#if shortcutFromIndex(i)}
            <div class="tab-shortcut">{shortcutFromIndex(i)}</div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .root {
    background-color: var(--card-dim-bg-color);
    color: var(--card-primary-text-color);
    border-radius: var(--radius) var(--radius) 0 0;
    /* opacity: 0.9; */
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
  .tab-title {
  }
  .tab-shortcut {
    color: var(--card-secondary-text-color);
  }
  .tab.focused {
    background-color: var(--card-highlight-bg-color);
    color: var(--card-highlight-text-color);
  }
</style>
