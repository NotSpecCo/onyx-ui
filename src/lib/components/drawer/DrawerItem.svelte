<script lang="ts">
  import type { Navigation } from '../../models';
  import Icon from '../icon/Icon.svelte';
  import NavItem from '../navigate/NavItem.svelte';

  export let icon: any = null;
  export let primaryText: string = null;
  export let secondaryText: string = null;

  export let navi: Navigation;
</script>

<NavItem {navi}>
  <div class="root">
    {#if icon}
      <div class="icon">
        <Icon>{icon}</Icon>
      </div>
    {/if}
    <div class="container">
      <div class="primary">{primaryText}</div>
      {#if secondaryText}
        <div class="secondary">{secondaryText}</div>
      {/if}
    </div>
    {#if navi.shortcutKey}
      <div class="shortcut">{navi.shortcutKey}</div>
    {/if}
  </div>
</NavItem>

<style>
  .root {
    padding: 4px 5px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--divider-color);
  }

  .icon {
    margin-right: 5px;
  }

  .container {
    flex: 1;
  }

  .shortcut {
    margin-left: 5px;
    font-weight: 600;
    color: var(--secondary-text-color);
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
