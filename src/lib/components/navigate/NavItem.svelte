<script lang="ts">
  import { getContext } from 'svelte';
  import type { Navigation } from '../../models';
  import { groupItemMap } from '../../stores/navigator';

  export let navi: Navigation;

  const groupId = getContext<Symbol>('nav-group');

  let focused = false;
  $: focused = $groupItemMap[groupId as any] === navi.itemId;
</script>

<div
  class="root"
  class:focused
  data-nav-id={navi.itemId}
  data-nav-shortcut={navi.shortcutKey}
  on:itemfocus={navi.onFocus}
  on:itemblur={navi.onBlur}
  on:itemselect={navi.onSelect}
>
  <slot />
</div>

<style>
  .root {
  }

  .root.focused {
    background-color: var(--highlight-bg-color);
    color: var(--highlight-text-color);
  }
</style>
