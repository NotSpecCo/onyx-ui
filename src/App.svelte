<script lang="ts">
  import Router from 'svelte-spa-router';
  import AppMenu from './components/AppMenu.svelte';
  import { registerAppMenu } from './lib/stores/view';
  import AppSettings from './routes/AppSettings.svelte';
  import Drawer from './routes/Drawer.svelte';
  import Form from './routes/Form.svelte';
  import Home from './routes/Home.svelte';
  import Lists from './routes/Lists.svelte';
  import Redirect from './routes/Redirect.svelte';
  import Tabs from './routes/Tabs.svelte';
  import Typography from './routes/Typography.svelte';

  registerAppMenu(AppMenu);

  const routes = {
    '/home': Home,
    '/tabs/:tabId': Tabs,
    '/typography/:tabId': Typography,
    '/lists/:tabId': Lists,
    '/drawer/:tabId': Drawer,
    '/forms/:tabId': Form,
    '/settings/:tabId': AppSettings,
    '*': Redirect,
  };
</script>

<Router {routes} />
