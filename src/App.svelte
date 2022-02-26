<script lang="ts">
  import Router from 'svelte-spa-router';
  import AppMenu from './components/AppMenu.svelte';
  import { registerAppMenu } from './lib/stores/view';
  import AppSettings from './routes/AppSettings.svelte';
  import Cards from './routes/Cards.svelte';
  import Drawer from './routes/Drawer.svelte';
  import Form from './routes/Form.svelte';
  import Home from './routes/Home.svelte';
  import Lists from './routes/Lists.svelte';
  import Redirect from './routes/Redirect.svelte';
  import Typography from './routes/Typography.svelte';

  registerAppMenu(AppMenu);

  const routes = {
    '/home': Home,
    '/cards/:cardId': Cards,
    '/typography/:cardId': Typography,
    '/lists/:cardId': Lists,
    '/drawer/:cardId': Drawer,
    '/forms/:cardId': Form,
    '/settings/:cardId': AppSettings,
    '*': Redirect,
  };
</script>

<Router {routes} />
