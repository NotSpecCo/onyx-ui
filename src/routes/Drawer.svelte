<script lang="ts">
  import { onMount } from 'svelte';
  import Card from '../lib/components/card/Card.svelte';
  import CardContent from '../lib/components/card/CardContent.svelte';
  import CardHeader from '../lib/components/card/CardHeader.svelte';
  import Typography from '../lib/components/Typography.svelte';
  import View from '../lib/components/view/View.svelte';
  import ViewContent from '../lib/components/view/ViewContent.svelte';
  import { DataStatus } from '../lib/enums/dataStatus';
  import { registerView, updateView } from '../lib/stores/view';

  export let params: { cardId: string };

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

  onMount(async () => {
    updateView({ dataStatus: DataStatus.Loaded });
  });
</script>

<View>
  <ViewContent>
    <Card>
      <CardHeader title="Drawer" />
      <CardContent>
        <Typography>
          The appbar lives at the bottom of every screen. You can press{' '}
          <Typography color="accent" display="inline" padding="none">SoftLeft</Typography>{' '}
          to open the global app menu or{' '}
          <Typography color="accent" display="inline" padding="none">SoftRight</Typography>{' '}
          to view available options and actions.
        </Typography>

        <Typography type="titleSmall">Options</Typography>
        <Typography>
          Options are usually screen-specific settings; things that don't quite make sense to have
          in the global app settings screen. To change an option, highlight it and press{' '}
          <Typography color="accent" display="inline" padding="none">Left</Typography>{' '}
          or{' '}
          <Typography color="accent" display="inline" padding="none">Right</Typography>{' '}
          on the d-pad.
        </Typography>

        <Typography type="titleSmall">Actions</Typography>
        <Typography>
          Screen-specific functions. Like lists, you can use the number keys to quickly select an
          action.
        </Typography>
      </CardContent>
    </Card>
  </ViewContent>
</View>
