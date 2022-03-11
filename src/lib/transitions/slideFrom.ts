type Options = {
  duration: number;
  delay?: number;
  position: 'up' | 'down' | 'left' | 'right' | 'center';
};

export function slideTo(node: any, { duration, delay, position }: Options) {
  return {
    duration,
    delay: delay || 0,
    css: (t) => {
      console.log('t', t);
      node.style.transform = '';

      const state = 100 * t;
      const percent = t * 100;

      switch (position) {
        case 'up':
          return `transform: translateY(-${state}vh)`;
        case 'down':
          return `transform: translateY(${state}vh)`;
        case 'left':
          return `transform: translateX(-${state}vw)`;
        case 'right':
          return `transform: translateX(${state}vw)`;
        default:
          return `transform: translateY(0px)`;
        // switch (position) {
        //   case 'up':
        //     return `transform: translateY(-${state}vh)`;
        //   case 'down':
        //     return `transform: translateY(${state}vh)`;
        //   case 'left':
        //     return `transform: translateX(-${state}vw)`;
        //   case 'right':
        //     return `transform: translateX(${state}vw)`;
        //   default:
        //     return `transform: translateY(0px)`;
      }
    },
  };
}
