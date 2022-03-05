<script lang="ts">
  import { getContext, setContext } from 'svelte';
  import { navigator } from '../../actions/navigator';
  import { ContextKey, DataStatus } from '../../enums';
  import type { SettingsContext } from '../../models';
  import { view } from '../../stores/view';

  export let groupId: string;
  export let initialFocusedId: string = undefined;
  export let enableCardSwitching = false;
  export let updateRoute = false;

  setContext(ContextKey.NavGroup, groupId);

  const settings = getContext<SettingsContext>(ContextKey.Settings);
</script>

<div
  use:navigator={{
    groupId,
    initialFocusedId,
    enableCardSwitching,
    enableShortcuts: $settings.enableShortcutKeys,
    updateRoute,
    viewLoaded: $view.dataStatus === DataStatus.Loaded,
  }}
>
  <slot />
</div>
