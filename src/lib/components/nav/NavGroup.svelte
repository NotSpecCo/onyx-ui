<script lang="ts">
  import { setContext } from 'svelte';
  import { navigator } from '../../actions/navigator';
  import { ContextKey, DataStatus } from '../../enums';
  import { app } from '../../stores/app';
  import { view } from '../../stores/view';

  export let groupId: string;
  export let initialFocusedId: string = undefined;
  export let enableCardSwitching = false;
  export let updateRoute = false;

  setContext(ContextKey.NavGroup, groupId);
</script>

<div
  use:navigator={{
    groupId,
    initialFocusedId,
    enableCardSwitching,
    enableShortcuts: $app.settings.enableShortcutKeys,
    updateRoute,
    viewLoaded: $view.dataStatus === DataStatus.Loaded,
  }}
>
  <slot />
</div>
