<script lang="ts">
  import MdChevronLeft from 'svelte-icons/md/MdChevronLeft.svelte';
  import MdChevronRight from 'svelte-icons/md/MdChevronRight.svelte';
  import { keys } from '../../actions/keys';
  import { IconSize } from '../../enums/iconSize';
  import type { SelectOption } from '../../models';
  import { getIndex } from '../../utils/array';
  import Icon from '../icon/Icon.svelte';

  export let value: string | number = undefined;
  export let options: SelectOption[] = [];
  export let onChange: (val: string | number) => void;
  export let disabled = false;
  export let wrap = false;

  let hasNext;
  let hasPrev;
  $: {
    const index = options.findIndex((a) => a.id === value);
    hasNext = wrap || !!options[index + 1];
    hasPrev = wrap || !!options[index - 1];
  }
</script>

<div
  class="root"
  use:keys={{
    onArrowLeft: () => {
      const index = options.findIndex((a) => a.id === value);
      const newIndex = getIndex(options, index, -1, wrap);
      onChange(options[newIndex].id);
      return true;
    },
    onArrowRight: () => {
      const index = options.findIndex((a) => a.id === value);
      const newIndex = getIndex(options, index, 1, wrap);
      onChange(options[newIndex].id);
      return true;
    },
    priority: 'high',
    disabled,
  }}
>
  <Icon size={IconSize.Small} disabled={!hasPrev}><MdChevronLeft /></Icon>
  <div class="title">{options.find((a) => a.id === value)?.label ?? '?'}</div>
  <Icon size={IconSize.Small} disabled={!hasNext}><MdChevronRight /></Icon>
</div>

<style>
  .root {
    display: flex;
    align-items: center;
    min-height: 24px;
  }
</style>
