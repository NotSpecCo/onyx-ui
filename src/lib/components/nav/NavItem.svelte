<script lang="ts">
  import { getContext } from 'svelte';
  import { ContextKey } from '../../enums';
  import type { ContextMenu, Navigation } from '../../models';
  import { Onyx } from '../../services';
  import { groupItemMap } from '../../stores/navigator';

  export let navi: Navigation;
  export let contextMenu: ContextMenu = null;

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
  on:itemmenu={() => {
    if (!contextMenu) return;

    if (contextMenu.onMenu) {
      contextMenu.onMenu();
      return;
    }
    Onyx.contextMenu.open({
      title: contextMenu.title,
      body: contextMenu.body,
      items: contextMenu.items,
    });
  }}
>
  <slot />
</div>

<style>
  .focused {
    background-color: var(--focus-color);
  }
</style>
