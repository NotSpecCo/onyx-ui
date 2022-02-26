<script lang="ts">
  import kebabcase from 'lodash.kebabcase';
  import Router from 'svelte-spa-router';
  import AppMenu from './components/AppMenu.svelte';
  import { TextSize } from './lib/enums';
  import { registerAppMenu } from './lib/stores/view';
  import { themes } from './lib/themes';
  import AppSettings from './routes/AppSettings.svelte';
  import Cards from './routes/Cards.svelte';
  import Drawer from './routes/Drawer.svelte';
  import Form from './routes/Form.svelte';
  import Home from './routes/Home.svelte';
  import Lists from './routes/Lists.svelte';
  import Redirect from './routes/Redirect.svelte';
  import Typography from './routes/Typography.svelte';
  import { settings } from './stores/settings';

  registerAppMenu(AppMenu);

  // Apply settings
  $: {
    // Theme
    const theme = themes.find((a) => a.id === $settings.theme) || themes[0];
    for (const id in theme.values) {
      document.documentElement.style.setProperty(`--${kebabcase(id)}`, theme.values[id]);
    }

    document.documentElement.style.setProperty('--drawer-accent-color', $settings.accentColor);
    document.documentElement.style.setProperty('--drawer-accent-text-color', $settings.accentColor);
    document.documentElement.style.setProperty('--card-accent-color', $settings.cardAccentColor);
    document.documentElement.style.setProperty(
      '--card-accent-text-color',
      $settings.cardAccentColor
    );

    // Text Size
    const textSize = {
      [TextSize.Smallest]: 8,
      [TextSize.Small]: 9,
      [TextSize.Medium]: 10,
      [TextSize.Large]: 11,
      [TextSize.Largest]: 12,
    };
    document.documentElement.style.setProperty(
      '--base-font-size',
      `${textSize[$settings.textSize]}px`
    );

    // Display Density
    document.body.dataset.density = $settings.displayDensity;

    // Border Radius
    document.documentElement.style.setProperty('--radius', `${$settings.borderRadius}px`);

    // Animations
    document.documentElement.style.setProperty('--animation-speed', `${$settings.animations}ms`);
  }

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
