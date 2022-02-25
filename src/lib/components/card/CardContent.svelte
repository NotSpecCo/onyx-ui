<script lang="ts">
  import { getContext } from 'svelte';

  const groupId = getContext<Symbol>('nav-group');
</script>

<div class="root" data-nav-scroller>
  <slot />
</div>

<style>
  .root {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
