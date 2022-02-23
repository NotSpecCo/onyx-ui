<script lang="ts">
  import Router from 'svelte-spa-router';
  import Drawer from './routes/Drawer.svelte';
  import Home from './routes/Home.svelte';
  import Lists from './routes/Lists.svelte';
  import Tabs from './routes/Tabs.svelte';
  import Typography from './routes/Typography.svelte';

  const routes = {
    '/': Home,
    '/tabs/:tabId?': Tabs,
    '/typography': Typography,
    '/lists/:tabId?': Lists,
    '/drawer/:tabId?': Drawer,
    // '/tabs': wrap({
    //   asyncComponent: () => import('./routes/Tabs.svelte'),
    // }),
  };
</script>

<Router {routes} />
