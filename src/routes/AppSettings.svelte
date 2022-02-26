<script lang="ts">
  import { onMount } from 'svelte';
  import { replace } from 'svelte-spa-router';
  import Card from '../lib/components/card/Card.svelte';
  import CardContent from '../lib/components/card/CardContent.svelte';
  import CardHeader from '../lib/components/card/CardHeader.svelte';
  import View from '../lib/components/view/View.svelte';
  import ViewContent from '../lib/components/view/ViewContent.svelte';
  import { DataStatus } from '../lib/enums';
  import { registerView, updateView, view } from '../lib/stores/view';

  export let params: { cardId: string };

  registerView({
    cards: [
      {
        id: 'display',
        title: 'Display',
        onSelect: () => replace(`/settings/display`),
      },
      {
        id: 'theme',
        title: 'Theme',
        onSelect: () => replace(`/settings/theme`),
      },
    ],
    activeCardId: params.cardId ?? 'display',
  });

  onMount(async () => {
    updateView({ dataStatus: DataStatus.Loaded });
  });
</script>

<View>
  <ViewContent>
    {#if params.cardId === $view.cards[0].id}
      <Card cardId={$view.cards[0].id}>
        <CardHeader />
        <CardContent>display</CardContent>
      </Card>
    {:else if params.cardId === $view.cards[1].id}
      <Card cardId={$view.cards[1].id}>
        <CardHeader />
        <CardContent>theme</CardContent>
      </Card>
    {/if}
  </ViewContent>
</View>
