<script lang="ts">
  import { setContext } from 'svelte';
  import { navigator } from '../../actions/navigator';
  import { ContextKey } from '../../enums/contextKey';

  export let groupId: string;
  export let initialFocusedId: string = undefined;
  export let enableTabSwitching = false;
  export let updateRoute = false;

  setContext(ContextKey.NavGroup, groupId);
</script>

<div use:navigator={{ groupId, initialFocusedId, enableTabSwitching, updateRoute }}>
  <slot />
</div>
