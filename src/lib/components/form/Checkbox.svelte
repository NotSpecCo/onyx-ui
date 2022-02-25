<script lang="ts">
  import MdCheck from 'svelte-icons/md/MdCheck.svelte';
  import Icon from '../icon/Icon.svelte';

  export let checked: boolean;
</script>

<div class="root">
  {#if checked}
    <Icon color="var(--accent-color)"><MdCheck /></Icon>
  {:else}
    <Icon color="var(--divider-color)"><MdCheck /></Icon>
  {/if}
</div>

<style>
</style>
