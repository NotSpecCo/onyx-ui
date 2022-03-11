import { quintOut } from 'svelte/easing';

type Position = 'up' | 'down' | 'left' | 'right' | 'center';

type Options = {
  duration: number;
  delay?: number;
  from: Position;
  to: Position;
  zIndex: number;
  id: string;
};

export function slide(node: any, { duration, delay, from, to, zIndex, id }: Options) {
  let dir: 'up' | 'down';

  function getValue(position: Position) {
    switch (position) {
      case 'up':
      case 'left':
        return -110;
      case 'down':
      case 'right':
        return 110;
      default:
        return 0;
    }
  }
  return {
    duration,
    delay: delay || 0,
    easing: quintOut,
    css: (t, u) => {
      node.style.zIndex = zIndex;

      if (dir === undefined) {
        dir = t === 0 ? 'up' : 'down';
      }
      // const percent = dir === 'up' ? t : u;

      let start = getValue(from);
      let end = getValue(to);

      const percent = u;
      let diff = start - end;
      const dir2 = start < end ? 'up' : 'down';
      let val = diff * percent * (dir2 === 'up' ? -1 : 1);
      return `transform: translateY(${val}vh)`;

      // if (percent === 0) {
      //   switch (from) {
      //     case 'up':
      //       return `transform: translateY(-100vh)`;
      //     case 'down':
      //       return `transform: translateY(100vh)`;
      //     case 'left':
      //       return `transform: translateX(-100vw)`;
      //     case 'right':
      //       return `transform: translateX(100vw)`;
      //     default:
      //       return `transform: translateY(0px)`;
      //   }
      // }

      // if (percent === 100) {
      //   switch (to) {
      //     case 'up':
      //       return `transform: translateY(-100vh)`;
      //     case 'down':
      //       return `transform: translateY(100vh)`;
      //     case 'left':
      //       return `transform: translateX(-100vw)`;
      //     case 'right':
      //       return `transform: translateX(100vw)`;
      //     default:
      //       return `transform: translateY(0px)`;
      //   }
      // }
    },
  };
}
