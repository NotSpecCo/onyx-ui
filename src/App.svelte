<script lang="ts">
  import { setContext } from 'svelte';
  import { ViewType } from './enums';
  import { ContextKey, TextSize, TextWeight } from './lib/enums';
  import type { SettingsContext } from './lib/models';
  import { stack } from './lib/stores/stack';
  import { applyTheme } from './lib/themes';
  import type { Settings } from './models';
  import { settings } from './stores/settings';
  import AppMenu from './views/AppMenu.svelte';
  import AppSettings from './views/AppSettings.svelte';
  import Home from './views/Home.svelte';
  import View1 from './views/View1.svelte';

  // console.log('app render', location.hash.slice(2), {
  //   historyId: Symbol(location.hash.slice(2) || ViewId.Home),
  //   ...window.history.state,
  // });

  function getComponent(viewId: string): any {
    switch (viewId) {
      case ViewType.Home:
        return Home;
        break;
      case ViewType.View1:
        return View1;
        break;
      case ViewType.Settings:
        return AppSettings;
        break;
      case ViewType.AppMenu:
        return AppMenu;
        break;
    }
  }

  // registerAppMenu(AppMenu);
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

  stack.init(
    [
      { id: ViewType.AppMenu, name: 'OnyxUI Demo' },
      { id: ViewType.Home, name: 'Home' },
      { id: ViewType.Settings, name: 'Settings' },
      { id: ViewType.View1, name: 'View 1' },
    ],
    location.hash.slice(2) || ViewType.AppMenu,
    window.history.state
  );
</script>

<div class="root">
  <svelte:component
    this={getComponent($stack.activeInstance?.type.id)}
    instance={$stack.activeInstance}
  />
</div>

<style>
  .root {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    position: relative;
    display: flex;
  }
</style>
