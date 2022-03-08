<script lang="ts">
  import { onMount } from 'svelte';
  import Card from '../lib/components/card/Card.svelte';
  import CardContent from '../lib/components/card/CardContent.svelte';
  import CardHeader from '../lib/components/card/CardHeader.svelte';
  import Typography from '../lib/components/Typography.svelte';
  import View from '../lib/components/view/View.svelte';
  import ViewContent from '../lib/components/view/ViewContent.svelte';
  import { DataStatus } from '../lib/enums';
  import { cards, registerView, updateView } from '../lib/stores/view';

  cards.set({
    baseRoute: '/home/',
    activeCardId: 'home',
    items: [
      {
        id: 'home',
        title: 'Card 1',
      },
    ],
  });

  registerView({});

  onMount(async () => {
    updateView({ dataStatus: DataStatus.Loaded });
  });
</script>

<View>
  <ViewContent>
    <Card cardId="home">
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
