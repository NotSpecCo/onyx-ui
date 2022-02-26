<script lang="ts">
  import { setContext } from 'svelte';
  import { querystring } from 'svelte-spa-router';
  import { ContextKey } from '../../enums/contextKey';
  import type { CardContext } from '../../models';
  import { getFocusedId } from '../../utils/route';
  import NavGroup from '../nav/NavGroup.svelte';

  export let cardId: string | null = null;

  let focusedId = getFocusedId($querystring);

  setContext<CardContext>(ContextKey.Card, { cardId });
</script>

<NavGroup groupId="card" enableCardSwitching={true} updateRoute={true} initialFocusedId={focusedId}>
  <slot />
</NavGroup>

<style>
  :global([data-nav-group-id='card']) {
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
