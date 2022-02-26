<script lang="ts">
  import { IconSize } from '../../enums';
  import type { Navigation } from '../../models';
  import Icon from '../icon/Icon.svelte';
  import NaviItem from '../nav/NavItem.svelte';

  export let imageUrl: string = null;
  export let icon: any = null;
  export let primaryText: string = null;
  export let secondaryText: string = null;
  export let accentText: string = null;
  export let navi: Navigation;
</script>

<NaviItem {navi}>
  <div class="root">
    {#if icon}
      <div class="icon">
        <Icon size={IconSize.Small}><svelte:component this={icon} /></Icon>
      </div>
    {/if}
    {#if imageUrl}
      <img class="image" src={imageUrl} alt="" />
    {/if}
    <div class="container">
      <div class="primary">{primaryText}</div>
      {#if secondaryText}
        <div class="secondary">{secondaryText}</div>
      {/if}
      {#if accentText}
        <div class="accent">{accentText}</div>
      {/if}
    </div>
    {#if navi.shortcutKey}
      <div class="shortcut">{navi.shortcutKey}</div>
    {/if}
  </div>
</NaviItem>

<style>
  .root {
    padding: 4px 7px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--divider-color);
  }

  .icon {
    margin-right: 10px;
  }

  .image {
    height: 30px;
    width: 30px;
    margin-right: 5px;
    border-radius: 3px;
  }
  .container {
    flex: 1;
    min-width: 0;
  }

  .shortcut {
    margin-left: 5px;
    font-weight: var(--bold-font-weight);
    color: var(--secondary-text-color);
  }

  .primary,
  .secondary,
  .accent {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .secondary {
    font-size: 1.2rem;
    color: var(--secondary-text-color);
  }
  .accent {
    font-size: 1.2rem;
    color: var(--accent-text-color);
  }
</style>
