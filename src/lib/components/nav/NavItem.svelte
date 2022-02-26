<script lang="ts">
  import { getContext } from 'svelte';
  import { ContextKey } from '../../enums/contextKey';
  import type { Navigation } from '../../models';
  import { groupItemMap } from '../../stores/navigator';

  export let navi: Navigation;

  const groupId = getContext<string>(ContextKey.NavGroup);

  let focused = false;
  $: focused = $groupItemMap[groupId] === navi.itemId;
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
  .focused {
    background-color: var(--highlight-bg-color);
    color: var(--highlight-text-color);
  }
</style>
