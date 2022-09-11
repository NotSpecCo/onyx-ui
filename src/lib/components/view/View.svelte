<script lang="ts">
  import { onDestroy } from 'svelte';
  import { Onyx } from '../../services';

  // onMount(() => OnyxNavigation.restoreFocusedItems());
  onDestroy(() => {
    Onyx.contextMenu.reset();
    Onyx.appMenu.close();
  });
</script>

<div class="root">
  <slot />
</div>

<style>
  .root {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: var(--card-color);
    color: var(--text-color);
    border-radius: var(--radius) var(--radius) var(--radius) var(--radius);
  }
</style>
