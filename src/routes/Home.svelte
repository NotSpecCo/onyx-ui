<script lang="ts">
  import Card from '../onyx/components/card/Card.svelte';
  import CardContent from '../onyx/components/card/CardContent.svelte';
  import CardHeader from '../onyx/components/card/CardHeader.svelte';
  import Typography from '../onyx/components/Typography.svelte';
  import View from '../onyx/components/view/View.svelte';
  import ViewContent from '../onyx/components/view/ViewContent.svelte';
  import { registerView } from '../onyx/stores/view';

  registerView({
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
</script>

<View>
  <ViewContent>
    <Card>
      <CardHeader title="Home" />
      <CardContent>
        <Typography>Hello.</Typography>
        <Typography>
          Welcome! OnyxUI is a UI component library for KaiOS. This app serves as a demo of all the
          different features and components. Press{' '}
          <Typography display="inline" color="accent" padding="none">SoftLeft</Typography>{' '}
          to get started.
        </Typography>
      </CardContent>
    </Card>
  </ViewContent>
</View>
