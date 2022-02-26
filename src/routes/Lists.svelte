<script lang="ts">
  import { onMount } from 'svelte';
  import { replace } from 'svelte-spa-router';
  import Card from '../lib/components/card/Card.svelte';
  import CardContent from '../lib/components/card/CardContent.svelte';
  import CardHeader from '../lib/components/card/CardHeader.svelte';
  import ListItem from '../lib/components/list/ListItem.svelte';
  import Typography from '../lib/components/Typography.svelte';
  import View from '../lib/components/view/View.svelte';
  import ViewContent from '../lib/components/view/ViewContent.svelte';
  import { DataStatus } from '../lib/enums';
  import { registerView, updateView, view } from '../lib/stores/view';
  import { shortcutFromIndex } from '../lib/utils/shortcutFromIndex';

  export let params: { cardId: string };

  registerView({
    cards: [
      { id: 'info', title: 'Information', onSelect: () => replace(`/lists/info`) },
      { id: 'single', title: 'Single Line List', onSelect: () => replace(`/lists/single`) },
      { id: 'two', title: 'Two Line List', onSelect: () => replace(`/lists/two`) },
      { id: 'three', title: 'Three Line List', onSelect: () => replace(`/lists/three`) },
      {
        id: 'shortcuts',
        title: 'List With Shortcuts',
        onSelect: () => replace(`/lists/shortcuts`),
      },
      { id: 'images', title: 'List With Images', onSelect: () => replace(`/lists/images`) },
    ],
    activeCardId: params.cardId ?? 'info',
    drawerItems: [
      {
        id: '1',
        primaryText: 'Drawer action 1',
        onSelect: () => console.log('home select drawer 1'),
      },
      {
        id: '2',
        primaryText: 'Drawer action 2',
        onSelect: () => console.log('home select drawer 2'),
      },
      {
        id: '3',
        primaryText: 'Drawer action 3',
        onSelect: () => console.log('home select drawer 3'),
      },
    ],
  });

  let items = new Array(10).fill(null);

  onMount(async () => {
    updateView({ dataStatus: DataStatus.Loaded });
  });
</script>

<View>
  <ViewContent>
    {#if params.cardId === $view.cards[0].id}
      <Card cardId={$view.cards[0].id}>
        <CardHeader />
        <CardContent>
          <Typography>List info</Typography>
        </CardContent>
      </Card>
    {:else if params.cardId === $view.cards[1].id}
      <Card cardId={$view.cards[1].id}>
        <CardHeader />
        <CardContent>
          {#each items as item, i}
            <ListItem
              primaryText={`Primary Text ${i + 1}`}
              navi={{
                itemId: `${i + 1}`,
              }}
            />
          {/each}
        </CardContent>
      </Card>
    {:else if params.cardId === $view.cards[2].id}
      <Card cardId={$view.cards[2].id}>
        <CardHeader />
        <CardContent>
          {#each items as item, i}
            <ListItem
              primaryText={`Primary Text ${i + 1}`}
              secondaryText="Secondary text"
              navi={{
                itemId: `${i + 1}`,
              }}
            />
          {/each}
        </CardContent>
      </Card>
    {:else if params.cardId === $view.cards[3].id}
      <Card cardId={$view.cards[3].id}>
        <CardHeader />
        <CardContent>
          {#each items as item, i}
            <ListItem
              primaryText={`Primary Text ${i + 1}`}
              secondaryText="Secondary text"
              accentText="Accent Text"
              navi={{
                itemId: `${i + 1}`,
              }}
            />
          {/each}
        </CardContent>
      </Card>
    {:else if params.cardId === $view.cards[4].id}
      <Card cardId={$view.cards[4].id}>
        <CardHeader />
        <CardContent>
          {#each items as item, i}
            <ListItem
              primaryText={`Primary Text ${i + 1}`}
              secondaryText="Secondary text"
              navi={{
                itemId: `${i + 1}`,
                shortcutKey: shortcutFromIndex(i),
              }}
            />
          {/each}
        </CardContent>
      </Card>
    {:else if params.cardId === $view.cards[5].id}
      <Card cardId={$view.cards[5].id}>
        <CardHeader />
        <CardContent>
          {#each items as item, i}
            <ListItem
              imageUrl="https://place-hold.it/32x32&text="
              primaryText={`Primary Text ${i + 1}`}
              secondaryText="Secondary text"
              navi={{
                itemId: `${i + 1}`,
                shortcutKey: shortcutFromIndex(i),
              }}
            />
          {/each}
        </CardContent>
      </Card>
    {/if}
  </ViewContent>
</View>
