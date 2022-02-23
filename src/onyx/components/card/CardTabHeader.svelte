<script lang="ts">
  import { getContext } from 'svelte';
  import MdChevronLeft from 'svelte-icons/md/MdChevronLeft.svelte';
  import MdChevronRight from 'svelte-icons/md/MdChevronRight.svelte';
  import { IconSize } from '../../enums/icon';
  import type { CardContext } from '../../models';
  import { tabs } from '../../stores/view';
  import Icon from '../icon/Icon.svelte';

  const context = getContext<CardContext>('card');

  const title = $tabs.find((a) => a.id === context.tabId)?.title;
</script>

<div class="root">
  <Icon size={IconSize.Small}><MdChevronLeft /></Icon>
  <div class="title">{title}</div>
  <Icon size={IconSize.Small}><MdChevronRight /></Icon>
</div>

<style>
  .root {
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    padding: 5px 3px;
  }

  .title {
    flex: 1;
    font-weight: 600;
    text-align: center;
  }
</style>
