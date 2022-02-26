<script lang="ts">
  import { ViewState } from '../../enums';
  import { groupItemMap } from '../../stores/navigator';
  import { updateView, view } from '../../stores/view';
  import { shortcutFromIndex } from '../../utils/shortcutFromIndex';
  import NavGroup from '../nav/NavGroup.svelte';
  import Typography from '../Typography.svelte';

  let otherCards = [];
  $: otherCards = $view.cards.filter((a) => a.id !== $view.activeCardId);

  const NAV_GROUP_ID = 'cards';
</script>

<NavGroup groupId={NAV_GROUP_ID}>
  <Typography align="center" type="caption">Press again for app menu</Typography>
  <div data-nav-scroller>
    {#each otherCards as card, i}
      <div class="card-root">
        <div
          class="card"
          class:focused={card.id === $groupItemMap[NAV_GROUP_ID]}
          data-nav-id={card.id}
          data-nav-shortcut={i + 1}
          on:itemselect={() => updateView({ viewing: ViewState.Content, activeCardId: card.id })}
        >
          <div>{card.title}</div>
          {#if shortcutFromIndex(i)}
            <div class="shortcut">{shortcutFromIndex(i)}</div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</NavGroup>

<style>
  :global([data-nav-group-id='cards']) {
    border-radius: var(--radius) var(--radius) 0 0;
  }
  .card-root {
    background-color: var(--card-dim-bg-color);
    color: var(--card-primary-text-color);

    border-radius: var(--radius) var(--radius) 0 0;
    padding-bottom: 20px;
    margin-bottom: -20px;
    border: 1px solid var(--drawer-bg-color);
    overflow: hidden;
  }
  .card {
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
  .card.focused {
    background-color: var(--card-highlight-bg-color);
    color: var(--card-highlight-text-color);
  }
</style>
