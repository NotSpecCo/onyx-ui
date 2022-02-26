type Config = {
  disabled?: boolean;
  priority?: 'high' | 'default';
  onArrowUp?: () => Promise<boolean> | boolean;
  onArrowDown?: () => Promise<boolean> | boolean;
  onArrowLeft?: () => Promise<boolean> | boolean;
  onArrowRight?: () => Promise<boolean> | boolean;
  onEnter?: () => Promise<boolean> | boolean;
  onSoftLeft?: () => Promise<boolean> | boolean;
  onSoftRight?: () => Promise<boolean> | boolean;
  onBackspace?: () => Promise<boolean> | boolean;
};

export function dpad(node: HTMLElement, config: Config) {
  async function handleKeyPress(ev: KeyboardEvent) {
    const key = parseKey(ev);

    const dpadKeys = [
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'Enter',
      'Backspace',
      'SoftLeft',
      'SoftRight',
    ];
    if (config.disabled || !dpadKeys.includes(key)) {
      return;
    }

    let handled = false;

    if (key === 'ArrowUp' && config.onArrowUp) {
      handled = await config.onArrowUp();
    } else if (key === 'ArrowDown' && config.onArrowDown) {
      handled = await config.onArrowDown();
    } else if (key === 'ArrowLeft' && config.onArrowLeft) {
      handled = await config.onArrowLeft();
    } else if (key === 'ArrowRight' && config.onArrowRight) {
      handled = await config.onArrowRight();
    } else if (key === 'Enter' && config.onEnter) {
      handled = await config.onEnter();
    } else if (key === 'SoftLeft' && config.onSoftLeft) {
      handled = await config.onSoftLeft();
    } else if (key === 'SoftRight' && config.onSoftRight) {
      handled = await config.onSoftRight();
    } else if (key === 'Backspace' && config.onBackspace) {
      handled = await config.onBackspace();
    }

    if (handled) {
      ev.stopPropagation();
      ev.stopImmediatePropagation();
      ev.preventDefault();
    }
  }

  function parseKey(ev: KeyboardEvent): string {
    // Simulate soft keys for testing purposes
    if (ev.shiftKey && ev.key === 'ArrowLeft') {
      return 'SoftLeft';
    }
    if (ev.shiftKey && ev.key === 'ArrowRight') {
      return 'SoftRight';
    }
    return ev.key;
  }

  document.addEventListener('keydown', handleKeyPress, config.priority === 'high');

  return {
    destroy() {
      document.removeEventListener('keydown', handleKeyPress, config.priority === 'high');
    },
    update(newConfig: Config) {
      config = newConfig;
    },
  };
}
