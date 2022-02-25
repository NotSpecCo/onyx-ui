<script lang="ts">
  import MdChevronLeft from 'svelte-icons/md/MdChevronLeft.svelte';
  import MdChevronRight from 'svelte-icons/md/MdChevronRight.svelte';
  import { dpad } from '../../actions/dpad';
  import { IconSize } from '../../enums/icon';
  import Icon from '../icon/Icon.svelte';

  export let value: number;
  export let min: number;
  export let max: number;
  export let onChange: (val: number) => void;
  export let disabled = false;
</script>

<div
  class="root"
  use:dpad={{
    onArrowLeft: () => {
      const num = value - 1;
      if (num >= min) {
        onChange(num);
      }
      return true;
    },
    onArrowRight: () => {
      const num = value + 1;
      if (num <= max) {
        onChange(num);
      }
      return true;
    },
    priority: 'high',
    disabled,
  }}
>
  <Icon size={IconSize.Small}><MdChevronLeft /></Icon>
  <div>{value}</div>
  <Icon size={IconSize.Small}><MdChevronRight /></Icon>
</div>

<style>
  .root {
    display: flex;
    align-items: center;
    min-height: 24px;
  }
</style>
