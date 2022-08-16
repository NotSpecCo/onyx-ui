<script lang="ts">
  import { setContext } from 'svelte';
  import { navigator } from '../../actions/navigator';
  import { ContextKey, DataStatus } from '../../enums';
  import { settings } from '../../stores';
  import { view } from '../../stores/view';

  export let groupId: string;
  export let initialFocusedId: string = undefined;
  export let enableCardSwitching = false;
  export let updateRoute = false;
  export let isScroller = false;
  export let style = '';

  setContext(ContextKey.NavGroup, groupId);
</script>

<div
  {style}
  use:navigator={{
    groupId,
    initialFocusedId,
    enableCardSwitching,
    enableShortcuts: $settings.enableShortcutKeys,
    updateRoute,
    viewLoaded: $view.dataStatus === DataStatus.Loaded,
  }}
  data-nav-scroller={isScroller || null}
>
  <slot />
</div>
