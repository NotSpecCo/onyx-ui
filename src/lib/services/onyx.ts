import type { BaseSettings, ContextMenu } from '../models';
import { appMenu, contextMenu, settings } from '../stores';

export class Onyx {
  static init(settings: Partial<BaseSettings>) {
    this.settings.update(settings);
  }

  // Settings
  static settings = {
    async update(data: Partial<BaseSettings>) {
      settings.update(data);
      appMenu.update({ animationSpeed: data.animations });
      contextMenu.update({ animationSpeed: data.animations });
    },
  };

  // App Menu
  static appMenu = {
    async open() {
      await contextMenu.close();
      await appMenu.open();
    },

    async close() {
      await appMenu.close();
    },
  };

  // Context Menu
  static contextMenu = {
    async open(menu: ContextMenu) {
      await appMenu.close();
      await contextMenu.open(menu);
    },

    async close() {
      await contextMenu.close();
    },

    async reset() {
      await contextMenu.reset();
    },
  };
}
