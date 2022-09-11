<script lang="ts">
  import type { ContextMenu, Navigation } from '../../models';
  import { Onyx } from '../../services';

  export let navi: Navigation;
  export let disabled = false;
  export let contextMenu: ContextMenu = null;
  export let display: 'inline-block' | 'block' | 'flex' = 'block';

  function openContextMenu() {
    if (!contextMenu || disabled) return;

    if (contextMenu.onMenu) {
      contextMenu.onMenu();
      return;
    }
    Onyx.contextMenu.open({
      title: contextMenu.title,
      body: contextMenu.body,
      items: contextMenu.items,
    });
  }
</script>

<div
  class="root"
  class:disabled
  style={`display: ${display};`}
  data-onyx-item-id={navi.itemId}
  data-onyx-shortcut={navi.shortcutKey}
  on:onyx:focus={navi.onFocus}
  on:onyx:blur={navi.onBlur}
  on:onyx:select={() => !disabled && navi.onSelect()}
  on:onyx:softleft={navi.onSoftLeft}
  on:onyx:softright={navi.onSoftRight || openContextMenu}
>
  <slot />
</div>

<!-- <script lang="ts">
  import { getContext } from 'svelte';
  import { ContextKey } from '../../enums';
  import type { ContextMenu, Navigation } from '../../models';
  import { Onyx } from '../../services';
  import { groupItemMap } from '../../stores/navigator';

  export let navi: Navigation;
  export let contextMenu: ContextMenu = null;
  export let highlight = true;
  export let disabled = false;
  export let display: 'inline-block' | 'block' = 'block';

  const groupId = getContext<string>(ContextKey.NavGroup);

  let focused = false;
  $: focused = $groupItemMap[groupId] === navi.itemId;
</script>

<div
  class="root"
  class:focused={highlight && focused}
  class:disabled
  style={`display: ${display};`}
  data-nav-id={navi.itemId}
  data-nav-shortcut={navi.shortcutKey}
  on:itemfocus={navi.onFocus}
  on:itemblur={navi.onBlur}
  on:itemselect={() => !disabled && navi.onSelect()}
  on:itemmenu={() => {
    if (!contextMenu || disabled) return;

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
  .disabled {
    opacity: 0.2;
  }
</style> -->
<style>
  :global(.root[data-onyx-focused]) {
    background-color: var(--focus-color);
  }

  .disabled {
    opacity: 0.2;
  }
</style>
