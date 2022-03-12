type Config = {
  disabled?: boolean;
  priority?: 'high' | 'default';
  onArrowUp?: () => Promise<boolean> | boolean;
  onArrowDown?: () => Promise<boolean> | boolean;
  onArrowLeft?: () => Promise<boolean> | boolean;
  onArrowRight?: () => Promise<boolean> | boolean;
  onEnter?: () => Promise<boolean> | boolean;
  onEnterLong?: () => Promise<boolean> | boolean;
  onSoftLeft?: () => Promise<boolean> | boolean;
  onSoftLeftLong?: () => Promise<boolean> | boolean;
  onSoftRight?: () => Promise<boolean> | boolean;
  onSoftRightLong?: () => Promise<boolean> | boolean;
  onBackspace?: () => Promise<boolean> | boolean;
  onBackspaceLong?: () => Promise<boolean> | boolean;
};

export function dpad(node: HTMLElement, config: Config) {
  async function handleKeyPress(ev: KeyboardEvent, key: string, longPress = false) {
    let handled = false;

    if (key === 'ArrowUp' && config.onArrowUp) {
      handled = await config.onArrowUp();
    } else if (key === 'ArrowDown' && config.onArrowDown) {
      handled = await config.onArrowDown();
    } else if (key === 'ArrowLeft' && config.onArrowLeft) {
      handled = await config.onArrowLeft();
    } else if (key === 'ArrowRight' && config.onArrowRight) {
      handled = await config.onArrowRight();
    } else if (key === 'Enter' && !longPress && config.onEnter) {
      handled = await config.onEnter();
    } else if (key === 'Enter' && longPress && config.onEnterLong) {
      handled = await config.onEnterLong();
    } else if (key === 'SoftLeft' && !longPress && config.onSoftLeft) {
      handled = await config.onSoftLeft();
    } else if (key === 'SoftRight' && !longPress && config.onSoftRight) {
      handled = await config.onSoftRight();
    } else if (key === 'Backspace' && !longPress && config.onBackspace) {
      handled = await config.onBackspace();
    } else if (key === 'SoftLeft' && longPress && config.onSoftLeftLong) {
      handled = await config.onSoftLeftLong();
    } else if (key === 'SoftRight' && longPress && config.onSoftRightLong) {
      handled = await config.onSoftRightLong();
    } else if (key === 'Backspace' && longPress && config.onBackspaceLong) {
      handled = await config.onBackspaceLong();
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

  function validateEvent(ev: KeyboardEvent) {
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

    let valid = true;
    const target = ev.target as HTMLElement | null;
    if (
      config.disabled ||
      !dpadKeys.includes(key) ||
      (!['SoftLeft', 'SoftRight', 'Enter'].includes(key) &&
        target?.tagName.toLowerCase() === 'input') ||
      (!['SoftLeft', 'SoftRight', 'Enter'].includes(key) &&
        (target?.attributes as any).role?.value === 'textbox') ||
      ev.repeat
    ) {
      valid = false;
    }

    return { key, valid };
  }

  let timer;
  let handled = false;
  function handleKeyDown(ev: KeyboardEvent) {
    const { key, valid } = validateEvent(ev);
    if (!valid) return;
    handled = false;
    timer = setTimeout(() => {
      handled = true;
      handleKeyPress(ev, key, true);
    }, 500);
  }
  function handleKeyUp(ev: KeyboardEvent) {
    const { key, valid } = validateEvent(ev);
    if (!valid) return;
    clearTimeout(timer);
    if (!handled) handleKeyPress(ev, key, false);
  }

  document.addEventListener('keydown', handleKeyDown, config.priority === 'high');
  document.addEventListener('keyup', handleKeyUp, config.priority === 'high');

  return {
    destroy() {
      document.removeEventListener('keydown', handleKeyDown, config.priority === 'high');
      document.removeEventListener('keyup', handleKeyUp, config.priority === 'high');
    },
    update(newConfig: Config) {
      config = newConfig;
    },
  };
}
