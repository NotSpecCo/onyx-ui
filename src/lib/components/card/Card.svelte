<script lang="ts">
  import { onDestroy, onMount, setContext } from 'svelte';
  import { navigator } from '../../actions/navigator';
  import type { CardContext } from '../../models';
  import { activateGroup, deactivateGroup } from '../../stores/navigator';

  export let tabId: string | null = null;

  const NAV_GROUP = Symbol();
  setContext('nav-group', NAV_GROUP);
  setContext<CardContext>('card', { tabId });

  onMount(() => activateGroup(NAV_GROUP));
  onDestroy(() => deactivateGroup(NAV_GROUP));
</script>

<div class="root" use:navigator={{ groupId: NAV_GROUP, enableTabSwitching: true }}>
  <slot />
</div>

<style>
  .root {
    --bg-color: var(--card-bg-color);
    --accent-color: var(--card-accent-color);
    --primary-text-color: var(--card-primary-text-color);
    --secondary-text-color: var(--card-secondary-text-color);
    --accent-text-color: var(--card-accent-text-color);
    --highlight-bg-color: var(--card-highlight-bg-color);
    --highlight-text-color: var(--card-highlight-text-color);
    --divider-color: var(--card-divider-color);

    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--bg-color);
    color: var(--primary-text-color);
    border-radius: var(--radius) var(--radius) var(--radius) var(--radius);
    /* box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); */
    border: 1px solid var(--drawer-bg-color);
  }
</style>
