<!-- <script lang="ts">
  import { setContext } from 'svelte';
  import { querystring } from 'svelte-spa-router';
  import { ContextKey } from '../../enums';
  import type { CardContext } from '../../models';
  import { cards } from '../../stores/view';
  import { getFocusedId } from '../../utils/route';
  import NavGroup from '../nav/NavGroup.svelte';

  export let cardId: string | null = null;

  let config = $cards.items.find((a) => a.id === cardId);
  $: config = $cards.items.find((a) => a.id === cardId);

  console.log('config', config);

  let focusedId = getFocusedId($querystring);

  setContext<CardContext>(ContextKey.Card, { cardId });
</script>

<div
  class="root"
  class:left={config.state === 0}
  class:center={config.state === 1}
  class:right={config.state === 2}
>
  <NavGroup
    groupId={`card_${cardId}`}
    enableCardSwitching={true}
    updateRoute={true}
    initialFocusedId={focusedId}
    style="height: 100%; display: flex; flex-direction:column;"
  >
    <slot />
  </NavGroup>
</div>

<style>
  .root {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    border-radius: var(--radius) var(--radius) var(--radius) var(--radius);
    background-color: var(--card-color);
    border: 1px solid var(--card-border-color);
    color: var(--text-color);
    transition: transform 1000ms;
    transform: translateX(0px);
  }
  .root.left {
    transition-delay: 1000ms;
    /* transition: transform 1000ms; */
    transform: translateX(-100vw);
  }
  .root.center {
    /* transition: transform 1000ms; */
    /* transition-delay: 0ms; */
    transform: translateX(0px);
  }
  .root.right {
    /* transition-delay: 1000ms; */
    /* transition: transform 1000ms; */
    transform: translateX(100vw);
  }
</style> -->
