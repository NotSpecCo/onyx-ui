<script lang="ts">
  import { getContext } from 'svelte';
  import MdChevronLeft from 'svelte-icons/md/MdChevronLeft.svelte';
  import MdChevronRight from 'svelte-icons/md/MdChevronRight.svelte';
  import { ContextKey } from '../../enums/contextKey';
  import { IconSize } from '../../enums/icon';
  import type { CardContext } from '../../models';
  import { view } from '../../stores/view';
  import Icon from '../icon/Icon.svelte';

  export let title: string = undefined;

  const context = getContext<CardContext>(ContextKey.Card);

  const cardTitle = $view.cards.find((a) => a.id === context.cardId)?.title;
</script>

<div class="root">
  <Icon size={IconSize.Small}><MdChevronLeft /></Icon>
  <div class="title">{title ?? cardTitle}</div>
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
