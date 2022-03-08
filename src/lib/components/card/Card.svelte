<script lang="ts">
  import { getContext, setContext } from 'svelte';
  import { navigator } from '../../actions/navigator';
  import { ContextKey } from '../../enums';
  import type { SettingsContext } from '../../models';

  // setContext<CardContext>(ContextKey.Card, { cardId });
  const settings = getContext<SettingsContext>(ContextKey.Settings);
  const GROUP_ID = 'card';
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
  <slot />
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
</style>
