<script lang="ts">
  import { IconSize } from '../../enums';
  import type { Navigation } from '../../models';
  import { app } from '../../stores/app';
  import Icon from '../icon/Icon.svelte';
  import NaviItem from '../nav/NavItem.svelte';

  export let icon: any = null;
  export let primaryText: string = null;
  export let secondaryText: string = null;
  export let navi: Navigation;
</script>

<NaviItem {navi}>
  <div class="root">
    {#if $app.settings.shortcutKeyLocation === 'left' && navi.shortcutKey}
      <div class="shortcut">{navi.shortcutKey}</div>
    {/if}
    {#if icon}
      <div class="icon">
        <Icon size={IconSize.Small}><svelte:component this={icon} /></Icon>
      </div>
    {/if}
    <div class="container">
      <div class="primary">{primaryText}</div>
      {#if secondaryText}
        <div class="secondary">{secondaryText}</div>
      {/if}
    </div>
    {#if $app.settings.shortcutKeyLocation === 'right' && navi.shortcutKey}
      <div class="shortcut">{navi.shortcutKey}</div>
    {/if}
  </div>
</NaviItem>

<style>
  .root {
    padding: 7px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--divider-color);
  }

  .icon {
    margin-right: 10px;
  }

  .container {
    flex: 1;
    min-width: 0;
  }

  .shortcut {
    font-weight: var(--bold-font-weight);
    color: var(--shortcut-color);
  }
  .shortcut:first-child {
    margin-right: 5px;
  }
  .shortcut:last-child {
    margin-left: 5px;
  }

  .primary,
  .secondary {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .secondary {
    font-size: 1.2rem;
    color: var(--secondary-text-color);
  }
</style>
