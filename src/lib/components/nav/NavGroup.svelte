<script lang="ts">
  import { setContext } from 'svelte';
  import { navigator } from '../../actions/navigator';
  import { ContextKey } from '../../enums/contextKey';

  type NavConfig = {
    groupId?: any;
    initialSelectedId?: string;
    enableTabSwitching?: boolean;
  };

  export let groupId: string;
  export let initialSelectedId: string = undefined;
  export let enableTabSwitching = false;

  setContext(ContextKey.NavGroup, groupId);
</script>

<div use:navigator={{ groupId, initialSelectedId, enableTabSwitching }}>
  <slot />
</div>
