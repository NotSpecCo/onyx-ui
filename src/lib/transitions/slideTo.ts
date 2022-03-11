type Options = {
  duration: number;
  delay?: number;
  from: 'up' | 'down' | 'left' | 'right' | 'center';
  to: 'up' | 'down' | 'left' | 'right' | 'center';
  zIndex: number;
};

export function slideTo(node: any, { duration, delay, from, to, zIndex }: Options) {
  return {
    duration,
    delay: delay || 0,
    css: (t, u) => {
      // console.log('t', t, u);

      const state = 100 * t;
      node.style.zIndex = zIndex;
      // const percent = t * 100;
      // switch (from) {
      //   case 'up':
      //     node.style = `transform: translateY(-${100}vh)`;
      //   case 'down':
      //     node.style = `transform: translateY(${100}vh)`;
      //   case 'left':
      //     node.style = `transform: translateX(-${100}vw)`;
      //   case 'right':
      //     node.style = `transform: translateX(${100}vw)`;
      //   default:
      //     node.style = `transform: translateY(0px)`;
      // }

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
