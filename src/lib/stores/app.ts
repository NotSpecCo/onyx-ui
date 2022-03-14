import type { SvelteComponent } from 'svelte';
import { get, writable } from 'svelte/store';
import { Animations, Density, RenderState, TextSize, TextWeight } from '../enums';
import type { BaseSettings } from '../models';
import { themes } from '../themes';
import { delay } from '../utils';

const defaultSettings: BaseSettings = {
  themeId: themes[0].id,
  textSize: TextSize.Medium,
  textWeight: TextWeight.Medium,
  displayDensity: Density.Normal,
  borderRadius: 14,
  animations: Animations.Normal,
  showHelpText: true,
  // Shortcuts
  enableShortcutKeys: true,
  shortcutKeyLocation: 'right',
  shortcutKeyColor: 'secondary',
  contextMenuIndicators: true,
  // Theme
  accentColorH: themes[0].values.accentColorH,
  accentColorS: themes[0].values.accentColorS,
  accentColorL: themes[0].values.accentColorL,
  cardColorH: themes[0].values.cardColorH,
  cardColorS: themes[0].values.cardColorS,
  cardColorL: themes[0].values.cardColorL,
  textColorH: themes[0].values.textColorH,
  textColorS: themes[0].values.textColorS,
  textColorL: themes[0].values.textColorL,
  focusColorA: themes[0].values.focusColorA,
  dividerColorA: themes[0].values.dividerColorA,
};

type AppMenu = {
  state: RenderState;
};

type ContextMenu = {
  state: RenderState;
  title: string;
  body?: string;
  items: {
    icon?: typeof SvelteComponent;
    imageUrl?: string;
    label: string;
    workingLabel?: string;
    onSelect: () => Promise<void> | void;
  }[];
  onMenu?: () => void;
};

type AppConfig = {
  settings: BaseSettings;
  appMenu: AppMenu;
  contextMenu: ContextMenu;
};

const defaultConfig: AppConfig = {
  settings: defaultSettings,
  appMenu: { state: RenderState.Destroyed },
  contextMenu: { state: RenderState.Destroyed, title: null, items: [] },
};

function createApp() {
  const app = writable<AppConfig>(defaultConfig);

  // Settings

  function setSettings(settings: BaseSettings) {
    app.update((val) => ({ ...val, settings }));
  }

  // App Menu

  async function openAppMenu() {
    if (get(app).contextMenu.state !== RenderState.Destroyed) {
      await closeContextMenu();
    }

    if (get(app).appMenu.state !== RenderState.Destroyed) {
      return;
    }

    app.update((val) => ({ ...val, appMenu: { state: RenderState.Closed } }));
    await delay(50);
    app.update((val) => ({ ...val, appMenu: { state: RenderState.Open } }));
    await delay(get(app).settings.animations);
  }

  async function closeAppMenu() {
    if (get(app).appMenu.state !== RenderState.Open) {
      return;
    }

    app.update((val) => ({ ...val, appMenu: { state: RenderState.Closed } }));
    await delay(get(app).settings.animations);
    app.update((val) => ({ ...val, appMenu: defaultConfig.appMenu }));
  }

  // Context Menu

  async function openContextMenu(menu: ContextMenu) {
    if (get(app).appMenu.state !== RenderState.Destroyed) {
      await closeAppMenu();
    }

    if (get(app).contextMenu.state !== RenderState.Destroyed) {
      return;
    }

    app.update((val) => ({ ...val, contextMenu: { ...menu, state: RenderState.Closed } }));
    await delay(50);
    app.update((val) => ({ ...val, contextMenu: { ...menu, state: RenderState.Open } }));
    await delay(get(app).settings.animations);
  }

  async function closeContextMenu() {
    if (get(app).contextMenu.state !== RenderState.Open) {
      return;
    }

    app.update((val) => ({
      ...val,
      contextMenu: { ...val.contextMenu, state: RenderState.Closed },
    }));
    await delay(get(app).settings.animations);
    app.update((val) => ({ ...val, contextMenu: defaultConfig.contextMenu }));
  }

  async function resetContextMenu() {
    app.update((val) => ({ ...val, contextMenu: defaultConfig.contextMenu }));
  }

  return {
    subscribe: app.subscribe,
    setSettings,
    openAppMenu,
    closeAppMenu,
    openContextMenu,
    closeContextMenu,
    resetContextMenu,
  };
}

export const app = createApp();
