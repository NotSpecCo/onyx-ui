<script lang="ts">
  import Card from '../lib/components/card/Card.svelte';
  import CardContent from '../lib/components/card/CardContent.svelte';
  import CardHeader from '../lib/components/card/CardHeader.svelte';
  import Typography from '../lib/components/Typography.svelte';
  import View from '../lib/components/view/View.svelte';
  import ViewContent from '../lib/components/view/ViewContent.svelte';

  // console.log('view1 using id', app.getCurrentHistoryItem().id);

  // const item = app.getCurrentHistoryItem();
  // console.log('view1 history item', item);
</script>

<View>
  <ViewContent>
    <Card>
      <CardHeader title="View 1" />
      <CardContent>
        <Typography>Hello.</Typography>
      </CardContent>
    </Card>
  </ViewContent>
</View>
