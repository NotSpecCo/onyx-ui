<script lang="ts">
  import AppMenu from '../components/AppMenu.svelte';
  import Card from '../onyx/components/card/Card.svelte';
  import CardContent from '../onyx/components/card/CardContent.svelte';
  import CardHeader from '../onyx/components/card/CardHeader.svelte';
  import Drawer from '../onyx/components/drawer/Drawer.svelte';
  import Typography from '../onyx/components/Typography.svelte';
  import View from '../onyx/components/view/View.svelte';
  import ViewContent from '../onyx/components/view/ViewContent.svelte';
</script>

<View>
  <ViewContent slot="content">
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
