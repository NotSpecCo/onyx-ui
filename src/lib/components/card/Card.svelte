<script lang="ts">
  import { getContext, setContext } from 'svelte';
  import { navigator } from '../../actions/navigator';
  import { ContextKey } from '../../enums';
  import type { SettingsContext, ViewContext } from '../../models';

  export let headerText: string = undefined;
  export let footerText: string = undefined;

  const settings = getContext<SettingsContext>(ContextKey.Settings);
  const { instance } = getContext<ViewContext>(ContextKey.View);
  const GROUP_ID = `${instance.id}_card`;

  setContext(ContextKey.NavGroup, GROUP_ID);
</script>

<div
  class="root"
  use:navigator={{
    groupId: GROUP_ID,
    enableShortcuts: $settings.enableShortcutKeys,
    updateRoute: true,
  }}
>
  {#if headerText}
    <div class="header">{headerText}</div>
  {/if}
  <div class="content" data-nav-scroller>
    <slot />
  </div>
  {#if footerText}
    <div class="footer">{footerText}</div>
  {/if}
</div>

<style>
  .root {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    border-radius: var(--radius) var(--radius) var(--radius) var(--radius);
    background-color: var(--card-color);
    border: 1px solid var(--card-border-color);
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    overflow: hidden;
    padding: 5px 3px;
    font-weight: var(--bold-font-weight);
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .content {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .footer {
    padding: 5px 3px 5px 3px;
  }
</style>
