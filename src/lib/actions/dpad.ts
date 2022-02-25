type Config = {
  disabled?: boolean;
  priority?: 'high' | 'default';
  onArrowUp?: () => Promise<boolean> | boolean;
  onArrowDown?: () => Promise<boolean> | boolean;
  onArrowLeft?: () => Promise<boolean> | boolean;
  onArrowRight?: () => Promise<boolean> | boolean;
  onEnter?: () => Promise<boolean> | boolean;
};

export function dpad(node: HTMLElement, config: Config) {
  async function handleKeyPress(ev: KeyboardEvent) {
    const dpadKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'];
    if (config.disabled || !dpadKeys.includes(ev.key)) {
      return;
    }

    let handled = false;

    if (ev.key === 'ArrowUp' && config.onArrowUp) {
      handled = await config.onArrowUp();
    } else if (ev.key === 'ArrowDown' && config.onArrowDown) {
      handled = await config.onArrowDown();
    } else if (ev.key === 'ArrowLeft' && config.onArrowLeft) {
      handled = await config.onArrowLeft();
    } else if (ev.key === 'ArrowRight' && config.onArrowRight) {
      handled = await config.onArrowRight();
    } else if (ev.key === 'Enter' && config.onEnter) {
      handled = await config.onEnter();
    }

    if (handled) {
      ev.stopPropagation();
      ev.preventDefault();
    }
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
