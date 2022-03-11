type Options = {
  duration: number;
  delay?: number;
  from: 'up' | 'down' | 'left' | 'right' | 'center';
  to: 'up' | 'down' | 'left' | 'right' | 'center';
  zIndex: number;
};

export function slideOut(node: any, { duration, delay, from, to, zIndex }: Options) {
  return {
    duration,
    delay: delay || 0,
    css: (t, u) => {
      const state = 100 * u;
      node.style.zIndex = zIndex;

      if (u === 0) {
        switch (from) {
          case 'up':
            return `transform: translateY(-100vh)`;
          case 'down':
            return `transform: translateY(100vh)`;
          case 'left':
            return `transform: translateX(-100vw)`;
          case 'right':
            return `transform: translateX(100vw)`;
          default:
            return `transform: translateY(0px)`;
        }
      }

      switch (to) {
        case 'up':
          return `transform: translateY(-${state}vh)`;
        case 'down':
          return `transform: translateY(${state}vh)`;
        case 'left':
          return `transform: translateX(-${state}vw)`;
        case 'right':
          return `transform: translateX(${state}vw)`;
        default:
          return `transform: translateY(-${state - 100}vh)`;
      }
    },
  };
}
