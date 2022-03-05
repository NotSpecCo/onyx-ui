<script lang="ts">
  import { setContext } from 'svelte';
  import Router from 'svelte-spa-router';
  import AppMenu from './components/AppMenu.svelte';
  import { ContextKey, TextSize, TextWeight } from './lib/enums';
  import type { SettingsContext } from './lib/models';
  import { registerAppMenu } from './lib/stores/view';
  import { applyTheme } from './lib/themes';
  import type { Settings } from './models';
  import AppSettings from './routes/AppSettings.svelte';
  import Cards from './routes/Cards.svelte';
  import ContextMenus from './routes/ContextMenus.svelte';
  import Form from './routes/Form.svelte';
  import Home from './routes/Home.svelte';
  import Lists from './routes/Lists.svelte';
  import Redirect from './routes/Redirect.svelte';
  import Typography from './routes/Typography.svelte';
  import { settings } from './stores/settings';

  registerAppMenu(AppMenu);
  setContext<SettingsContext<Settings>>(ContextKey.Settings, settings);

  // Apply settings
  $: {
    // Theme
    applyTheme($settings);

    if ($settings.shortcutKeyColor === 'accent') {
      document.documentElement.style.setProperty('--shortcut-color', `var(--accent-color)`);
    } else if ($settings.shortcutKeyColor === 'secondary') {
      document.documentElement.style.setProperty('--shortcut-color', `var(--secondary-text-color)`);
    } else {
      document.documentElement.style.setProperty('--shortcut-color', `var(--primary-text-color)`);
    }

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

    const weight = {
      [TextWeight.Light]: { regular: 300, bold: 400 },
      [TextWeight.Medium]: { regular: 400, bold: 600 },
      [TextWeight.Heavy]: { regular: 600, bold: 700 },
    };
    document.documentElement.style.setProperty(
      '--regular-font-weight',
      `${weight[$settings.textWeight].regular}`
    );
    document.documentElement.style.setProperty(
      '--bold-font-weight',
      `${weight[$settings.textWeight].bold}`
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
    '/contextMenus/:cardId': ContextMenus,
    '/forms/:cardId': Form,
    '/settings/:cardId': AppSettings,
    '*': Redirect,
  };
</script>

<Router {routes} />
