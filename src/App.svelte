<script lang="ts">
  import { setContext } from 'svelte';
  import { AnimationState, ContextKey, TextSize, TextWeight, ViewId } from './lib/enums';
  import type { SettingsContext } from './lib/models';
  import { app } from './lib/stores/app';
  import { applyTheme } from './lib/themes';
  import { createUniqueId } from './lib/utils/createUniqueId';
  import type { Settings } from './models';
  import { settings } from './stores/settings';
  import Home from './views/Home.svelte';
  import View1 from './views/View1.svelte';

  // console.log('app render', location.hash.slice(2), {
  //   historyId: Symbol(location.hash.slice(2) || ViewId.Home),
  //   ...window.history.state,
  // });

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

  app.init(
    [
      { id: ViewId.Home, title: 'Home', component: Home },
      { id: ViewId.View1, title: 'View 1', component: View1 },
    ],
    location.hash.slice(2) || ViewId.Home,
    {
      historyId: createUniqueId(),
      ...window.history.state,
    }
  );

  let history = $app.history.filter((a) => a.animState > AnimationState.Destroyed);
  $: history = $app.history.filter((a) => a.animState > AnimationState.Destroyed);
</script>

<div class="root">
  {#each history as item (item.view.id)}
    <svelte:component this={item.view.component} />
  {/each}
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
