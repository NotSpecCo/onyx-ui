<script lang="ts">
  import Card from '../lib/components/card/Card.svelte';
  import CardContent from '../lib/components/card/CardContent.svelte';
  import CardHeader from '../lib/components/card/CardHeader.svelte';
  import ListItem from '../lib/components/list/ListItem.svelte';
  import Typography from '../lib/components/Typography.svelte';
  import View from '../lib/components/view/View.svelte';

  export let instance: any = {};

  let items = new Array(10).fill(null);
</script>

<View {instance}>
  <Card>
    <CardHeader title="View 1" />
    <CardContent>
      <Typography>Hello.</Typography>
      {#each items as item, i}
        <ListItem
          primaryText={`Primary Text ${i + 1}`}
          secondaryText={`Secondary Text`}
          navi={{
            itemId: `${i + 1}`,
            onSelect: () => console.log(i + 1, 'select'),
          }}
        />
      {/each}
    </CardContent>
  </Card>
</View>
