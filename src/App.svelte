<script lang="ts">
  import Router from 'svelte-spa-router';
  import AppMenu from './components/AppMenu.svelte';
  import { registerAppMenu } from './onyx/stores/view';
  import Drawer from './routes/Drawer.svelte';
  import Home from './routes/Home.svelte';
  import Lists from './routes/Lists.svelte';
  import Tabs from './routes/Tabs.svelte';
  import Typography from './routes/Typography.svelte';

  registerAppMenu(AppMenu);

  const routes = {
    '/': Home,
    '/tabs/:tabId?': Tabs,
    '/typography': Typography,
    '/lists/:tabId?': Lists,
    '/drawer/:tabId?': Drawer,
  };
</script>

<Router {routes} />
