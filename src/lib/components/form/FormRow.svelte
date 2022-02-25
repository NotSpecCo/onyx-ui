<script lang="ts">
  import type { Navigation } from '../../models';
  import NavItem from '../navigate/NavItem.svelte';

  export let label: string;
  export let navi: Navigation;
</script>

<NavItem {navi}>
  <div class="root">
    <div>{label}</div>
    <slot />
  </div>
</NavItem>

<style>
  .root {
    padding: 5px 7px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--divider-color);
  }
</style>
