import type { BaseSettings, ContextMenu, Dialog, Toast } from '../models';
import { alert, appMenu, contextMenu, dialog, settings } from '../stores';
import { toaster } from '../stores/toaster';

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
      toaster.update({ animationSpeed: data.animations * 2, duration: data.toasterDuration });
      alert.update({ animationSpeed: data.animations });
      dialog.update({ animationSpeed: data.animations });
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

  // Toaster
  static toaster = {
    showToast(toast: Toast) {
      toaster.showToast(toast);
    },

    reset() {
      toaster.reset();
    },
  };

  // Alert
  static alert = {
    showAlert(title: string, body?: string) {
      alert.showAlert(title, body);
    },
  };

  // Dialog
  static dialog = {
    showDialog(data: Dialog) {
      dialog.open(data);
    },
  };
}
