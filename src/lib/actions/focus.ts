type Config = {
  focused: boolean;
};

export function focus(node: HTMLElement, config: Config) {
  if (config.focused) {
    node.focus();
  } else {
    node.blur();
  }

  return {
    update(newConfig: Config) {
      if (newConfig.focused) {
        node.focus();
      } else {
        node.blur();
      }
    },
  };
}
