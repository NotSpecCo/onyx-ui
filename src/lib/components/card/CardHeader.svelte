<script lang="ts">
  import { getContext } from 'svelte';
  import { ContextKey } from '../../enums';
  import type { CardContext } from '../../models';

  export let title: string = undefined;

  const context = getContext<CardContext>(ContextKey.Card);

  let hasCards = false;
</script>

<div class="root">
  <div class="title">
    {title}
  </div>
</div>

<style>
  .root {
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    padding: 5px 3px;
  }

  .title {
    flex: 1;
    font-weight: var(--bold-font-weight);
    text-align: center;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .pad-left {
    margin-left: 18px;
  }
  .pad-right {
    margin-right: 18px;
  }
</style>
