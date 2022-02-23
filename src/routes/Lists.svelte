<script lang="ts">
  import { replace } from 'svelte-spa-router';
  import AppMenu from '../components/AppMenu.svelte';
  import Card from '../onyx/components/card/Card.svelte';
  import CardContent from '../onyx/components/card/CardContent.svelte';
  import CardTabHeader from '../onyx/components/card/CardTabHeader.svelte';
  import ListItem from '../onyx/components/list/ListItem.svelte';
  import Typography from '../onyx/components/Typography.svelte';
  import View from '../onyx/components/view/View.svelte';
  import ViewContent from '../onyx/components/view/ViewContent.svelte';
  import { shortcutFromIndex } from '../onyx/utils/shortcutFromIndex';

  export let params: { tabId: string };

  const tabs = [
    { id: 'info', title: 'Information' },
    { id: 'single', title: 'Single Line List' },
    { id: 'two', title: 'Two Line List' },
    { id: 'three', title: 'Three Line List' },
    { id: 'shortcuts', title: 'List With Shortcuts' },
    { id: 'images', title: 'List With Images' },
  ];

  const items = new Array(10).fill(null);
</script>

<View {tabs} activeTab={params.tabId || tabs[0].id} onTabChange={(tab) => replace(`/lists/${tab}`)}>
  <AppMenu slot="appmenu" />
  <ViewContent>
    {#if params.tabId === tabs[0].id}
      <Card tabId={tabs[0].id}>
        <CardTabHeader />
        <CardContent>
          <Typography>List info</Typography>
        </CardContent>
      </Card>
    {:else if params.tabId === tabs[1].id}
      <Card tabId={tabs[1].id}>
        <CardTabHeader />
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
    {:else if params.tabId === tabs[2].id}
      <Card tabId={tabs[2].id}>
        <CardTabHeader />
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
    {:else if params.tabId === tabs[3].id}
      <Card tabId={tabs[3].id}>
        <CardTabHeader />
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
    {:else if params.tabId === tabs[4].id}
      <Card tabId={tabs[4].id}>
        <CardTabHeader />
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
    {:else if params.tabId === tabs[5].id}
      <Card tabId={tabs[5].id}>
        <CardTabHeader />
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
