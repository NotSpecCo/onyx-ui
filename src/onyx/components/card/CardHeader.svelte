<script lang="ts">
  import { getContext } from 'svelte';
  import type { CardContext } from '../../models';
  import { tabs } from '../../stores/view';

  export let useTabAsTitle = false;
  export let title: string = null;

  const context = getContext<CardContext>('card');

  if (useTabAsTitle) {
    title = $tabs.find((a) => a.id === context.tabId)?.title;
  }
</script>

<div class="root">
  <!-- {#if showArrows}
    <Icon><MdChevronLeft /></Icon>
  {/if} -->
  <div class="title">{title}</div>
  <!-- {#if showArrows}
    <Icon><MdChevronRight /></Icon>
  {/if} -->
</div>

<style>
  .root {
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
    white-space: nowrap;
    overflow: hidden;
    padding: 5px 7px;
  }

  .title {
    flex: 1;
    /* text-align: center; */
    font-weight: 600;
  }
</style>
