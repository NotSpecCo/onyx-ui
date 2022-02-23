<script lang="ts">
  import { getContext } from 'svelte';
  import type { Navigation } from '../../models';
  import { groupItemMap } from '../../stores/navigator';

  export let className: string = '';
  export let navi: Navigation;

  const groupId = getContext<Symbol>('nav-group');

  let focused = false;
  $: focused = $groupItemMap[groupId as any] === navi.itemId;
</script>

<div
  class={`root ${className}`}
  class:focused
  data-nav-id={navi.itemId}
  data-nav-shortcut={navi.shortcutKey}
  on:itemfocus={navi.onFocus}
  on:itemselect={navi.onSelect}
>
  <slot />
</div>

<!-- <div
  class={`root ${className}`}
  class:selected={navi.itemId === selectedItemId}
  use:navigator={{
    areaId: navi.areaId,
    itemId: navi.itemId,
    shortcutKey: navi.shortcutKey,
    onFocus: navi.onFocus,
    onSelect: navi.onSelect,
  }}
>
  <slot />
</div> -->
<style>
  .root {
  }

  .root.focused {
    background-color: var(--highlight-bg-color);
    color: var(--highlight-text-color);
  }
</style>
