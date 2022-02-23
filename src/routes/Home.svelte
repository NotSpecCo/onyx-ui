<script lang="ts">
  import AppMenu from '../components/AppMenu.svelte';
  import Card from '../onyx/components/card/Card.svelte';
  import CardContent from '../onyx/components/card/CardContent.svelte';
  import CardHeader from '../onyx/components/card/CardHeader.svelte';
  import Drawer from '../onyx/components/drawer/Drawer.svelte';
  import ListItem from '../onyx/components/list/ListItem.svelte';
  import View from '../onyx/components/view/View.svelte';
  import ViewContent from '../onyx/components/view/ViewContent.svelte';
  import { shortcutFromIndex } from '../onyx/utils/shortcutFromIndex';

  const items = new Array(10).fill(null);

  // const NAVI_GROUP_ID = Symbol();
  // onMount(() => registerGroup(NAVI_GROUP_ID));
  // onDestroy(() => unregisterGroup(NAVI_GROUP_ID));
</script>

<View>
  <!-- <ViewHeader>View Header</ViewHeader> -->
  <ViewContent slot="content">
    <Card>
      <CardHeader title="Home" />
      <CardContent>
        <!-- <List> -->
        <!-- <div>top</div> -->
        {#each items as item, i}
          <ListItem
            primaryText={`Primary Text ${i + 1}`}
            secondaryText="Secondary text"
            navi={{
              itemId: `${i + 1}`,
              shortcutKey: shortcutFromIndex(i),
              onSelect: () => console.log('home selected ', i + 1),
            }}
          />
        {/each}
        <!-- <div>bottom</div> -->
        <!-- </List> -->
      </CardContent>
      <!-- <CardFooter>Card Footer</CardFooter> -->
    </Card>
  </ViewContent>
  <!-- <ViewFooter>View Footer</ViewFooter> -->
  <Drawer
    slot="drawer"
    actions={[
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
    ]}
  />
  <AppMenu slot="appmenu" />
</View>
