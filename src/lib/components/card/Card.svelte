<script lang="ts">
  import { setContext } from 'svelte';
  import { querystring } from 'svelte-spa-router';
  import { ContextKey } from '../../enums';
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
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--card-primary-color);
    color: var(--primary-text-color);
    border-radius: var(--radius) var(--radius) var(--radius) var(--radius);
    border: 1px solid var(--card-border-color);
  }
</style>
