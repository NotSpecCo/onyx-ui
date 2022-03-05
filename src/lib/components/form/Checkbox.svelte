<script lang="ts">
  import MdCheck from 'svelte-icons/md/MdCheck.svelte';
  import { IconColor } from '../../enums';
  import Icon from '../icon/Icon.svelte';

  export let checked: boolean;
</script>

<div class="root">
  {#if checked}
    <Icon color={IconColor.Accent}><MdCheck /></Icon>
  {:else}
    <Icon color={IconColor.Tertiary}><MdCheck /></Icon>
  {/if}
</div>

<style>
</style>
