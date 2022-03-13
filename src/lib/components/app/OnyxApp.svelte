<script lang="ts">
  import type { Readable } from 'svelte/store';
  import { keys } from '../../actions/keys';
  import { MenuOpenState, TextSize, TextWeight, ViewState } from '../../enums';
  import type { BaseSettings } from '../../models';
  import { app } from '../../stores/app';
  import { updateView, view } from '../../stores/view';
  import { applyTheme } from '../../themes';
  import ContextMenu from '../contextMenu/ContextMenu.svelte';

  export let baseSettings: Readable<BaseSettings>;

  $: app.setSettings($baseSettings);

  // Apply settings
  $: {
    // Theme
    applyTheme($baseSettings);

    if ($baseSettings.shortcutKeyColor === 'accent') {
      document.documentElement.style.setProperty('--shortcut-color', `var(--accent-color)`);
    } else if ($baseSettings.shortcutKeyColor === 'secondary') {
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
      `${textSize[$baseSettings.textSize]}px`
    );

    const weight = {
      [TextWeight.Light]: { regular: 300, bold: 400 },
      [TextWeight.Medium]: { regular: 400, bold: 600 },
      [TextWeight.Heavy]: { regular: 600, bold: 700 },
    };
    document.documentElement.style.setProperty(
      '--regular-font-weight',
      `${weight[$baseSettings.textWeight].regular}`
    );
    document.documentElement.style.setProperty(
      '--bold-font-weight',
      `${weight[$baseSettings.textWeight].bold}`
    );

    // Display Density
    document.body.dataset.density = $baseSettings.displayDensity;

    // Border Radius
    document.documentElement.style.setProperty('--radius', `${$baseSettings.borderRadius}px`);

    // Animations
    document.documentElement.style.setProperty(
      '--animation-speed',
      `${$baseSettings.animations}ms`
    );
  }
</script>

<div
  class="root"
  use:keys={{
    onSoftLeft: () => {
      if ($app.appMenu.state === MenuOpenState.Destroyed) {
        app.openAppMenu();
      } else if ($app.appMenu.state === MenuOpenState.Open) {
        app.closeAppMenu();
      }
      return true;
    },
    onSoftLeftLong: () => {
      if ($view.viewing === ViewState.Content && $view.cards.length > 1) {
        updateView({ viewing: ViewState.Cards });
      } else {
        updateView({ viewing: ViewState.Content });
      }
      return true;
    },
    onBackspace: () => {
      if ($app.appMenu.state === MenuOpenState.Open) {
        app.closeAppMenu();
        return true;
      }

      if ($app.contextMenu.state === MenuOpenState.Open) {
        app.closeContextMenu();
        return true;
      }

      if ($view.viewing === ViewState.Cards) {
        updateView({ viewing: ViewState.Content });
        return true;
      }
    },
  }}
>
  <div class="view">
    <slot />
  </div>
  <div class="dashboard">
    <slot name="dashboard" />
  </div>
  {#if $app.appMenu.state !== MenuOpenState.Destroyed}
    <div class="menu-container">
      <div class="scrim" class:open={$app.appMenu.state === MenuOpenState.Open} />
      <div class="menu" class:open={$app.appMenu.state === MenuOpenState.Open}>
        <slot name="app-menu" />
      </div>
    </div>
  {/if}
  {#if $app.contextMenu.state !== MenuOpenState.Destroyed}
    <ContextMenu />
  {/if}
</div>

<style>
  .root {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .view {
    flex: 1;
  }

  .menu-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .scrim {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity var(--animation-speed);
    opacity: 0;
  }
  .scrim.open {
    opacity: 1;
  }

  .menu {
    transform: translateY(100%);
    transition: transform var(--animation-speed);
    max-height: 80vh;
  }

  .menu.open {
    transform: translateY(0%);
  }
</style>
