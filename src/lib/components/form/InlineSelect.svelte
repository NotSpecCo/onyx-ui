<script lang="ts">
  import MdChevronLeft from 'svelte-icons/md/MdChevronLeft.svelte';
  import MdChevronRight from 'svelte-icons/md/MdChevronRight.svelte';
  import { dpad } from '../../actions/dpad';
  import { IconSize } from '../../enums';
  import type { SelectOption } from '../../models';
  import { getIndexWrap } from '../../utils/array';
  import Icon from '../icon/Icon.svelte';

  export let value: string = undefined;
  export let options: SelectOption[] = [];
  export let onChange: (val: string) => void;
  export let disabled = false;
</script>

<div
  class="root"
  use:dpad={{
    onArrowLeft: () => {
      const index = options.findIndex((a) => a.id === value);
      const newIndex = getIndexWrap(options, index, -1);
      onChange(options[newIndex].id);
      return true;
    },
    onArrowRight: () => {
      const index = options.findIndex((a) => a.id === value);
      const newIndex = getIndexWrap(options, index, 1);
      onChange(options[newIndex].id);
      return true;
    },
    priority: 'high',
    disabled,
  }}
>
  <Icon size={IconSize.Small}><MdChevronLeft /></Icon>
  <div class="title">{options.find((a) => a.id === value)?.label ?? '?'}</div>
  <Icon size={IconSize.Small}><MdChevronRight /></Icon>
</div>

<style>
  .root {
    display: flex;
    align-items: center;
    min-height: 24px;
  }
</style>
