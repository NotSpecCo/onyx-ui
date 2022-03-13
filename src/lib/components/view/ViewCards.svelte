<script lang="ts">
  import { ViewState } from '../../enums';
  import { app } from '../../stores/app';
  import { groupItemMap } from '../../stores/navigator';
  import { updateView, view } from '../../stores/view';
  import { shortcutFromIndex } from '../../utils/shortcutFromIndex';
  import NavGroup from '../nav/NavGroup.svelte';
  import Typography from '../Typography.svelte';

  const NAV_GROUP_ID = 'cards';
</script>

<NavGroup groupId={NAV_GROUP_ID}>
  {#if $app.settings.showHelpText}
    <Typography align="center" type="caption">Press again for app menu</Typography>
  {/if}
  <div data-nav-scroller>
    {#each $view.cards as card, i}
      <div class="card-root">
        <div
          class="card"
          class:focused={card.id === $groupItemMap[NAV_GROUP_ID]}
          data-nav-id={card.id}
          data-nav-shortcut={i + 1}
          on:itemselect={() => updateView({ viewing: ViewState.Content, activeCardId: card.id })}
        >
          {#if $app.settings.shortcutKeyLocation === 'left' && shortcutFromIndex(i)}
            <div class="shortcut">{shortcutFromIndex(i)}</div>
          {/if}
          <div class="title">{card.title}</div>
          {#if $app.settings.shortcutKeyLocation === 'right' && shortcutFromIndex(i)}
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
    background-color: var(--card-color);
    color: var(--text-color);

    border-radius: var(--radius) var(--radius) 0 0;
    padding-bottom: 20px;
    margin-bottom: -20px;
    border: 1px solid var(--card-border-color);
    overflow: hidden;
    box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.2);
  }
  .card {
    padding: 5px 7px;
    padding-bottom: 20px;
    margin-bottom: -15px;
    display: flex;
    font-weight: var(--bold-font-weight);
  }
  .title {
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
  }
  .shortcut {
    color: var(--shortcut-color);
  }
  .shortcut:first-child {
    margin-right: 5px;
  }
  .shortcut:last-child {
    margin-left: 5px;
  }
  .card.focused {
    background-color: var(--focus-color);
  }
</style>
