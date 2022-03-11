<script lang="ts">
  import Card from '../lib/components/card/Card.svelte';
  import ListItem from '../lib/components/list/ListItem.svelte';
  import Typography from '../lib/components/Typography.svelte';
  import View from '../lib/components/view/View.svelte';
  import { delay } from '../lib/utils/delay';

  export let instance: any = {};

  let items = new Array(10).fill(null);
</script>

<View {instance}>
  <Card headerText="Home">
    <Typography>Hello.</Typography>
    {#each items as item, i}
      <ListItem
        primaryText={`Primary Text ${i + 1}`}
        secondaryText={`Secondary Text`}
        navi={{
          itemId: `${i + 1}`,
          onSelect: () => console.log(i + 1, 'select'),
        }}
        contextMenu={{
          title: `Primary Text ${i + 1}`,
          items: [
            {
              label: 'Context Menu Item 1',
              workingLabel: 'Working...',
              onSelect: async () => {
                console.log('context menu item 1');
                await delay(1000);
              },
            },
            {
              label: 'Context Menu Item 2',
              onSelect: async () => {
                console.log('context menu item 2');
                await delay(1000);
              },
            },
            {
              label: 'Context Menu Item 3',
              onSelect: () => console.log('context menu item 3'),
            },
          ],
        }}
      />
    {/each}
  </Card>
</View>
