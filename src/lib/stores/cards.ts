import { replace } from 'svelte-spa-router';
import { get, writable } from 'svelte/store';
import { delay } from '../utils/delay';

enum CardState {
  Left,
  Center,
  Right,
}
type Card2 = {
  id: string;
  title: string;
  visible: boolean;
  state: CardState;
};
type CardsConfig = {
  items: Card2[];
  activeCardId?: string;
  baseRoute: string;
};
type Register = {
  items: { id: string; title: string }[];
  activeCardId: string;
  baseRoute: string;
};

const defaultCards: CardsConfig = {
  items: [],
  baseRoute: '',
};

const ANIMATION_SPEED = 1000;

function createCards() {
  const cards = writable<CardsConfig>(defaultCards);

  function set(data: Register) {
    const items: Card2[] = data.items.map((a) => ({
      ...a,
      visible: a.id === data.activeCardId,
      state: CardState.Center,
    }));

    cards.set({
      items,
      activeCardId: data.activeCardId,
      baseRoute: data.baseRoute,
    });
  }

  async function next() {
    if (busy()) return;

    const items = get(cards).items;
    const leaving = items.findIndex((a) => a.visible);
    const next = leaving + 1;

    if (!items[next]) return;

    items[leaving].state = CardState.Center;
    items[next].state = CardState.Right;
    items[next].visible = true;
    cards.update((val) => ({ ...val, items }));

    await delay(0);

    items[leaving].state = CardState.Left;
    items[next].state = CardState.Center;
    cards.update((val) => ({ ...val, items }));

    await delay(ANIMATION_SPEED);

    items[leaving].state = CardState.Center;
    items[leaving].visible = false;
    cards.update((val) => ({ ...val, items }));

    replace(`${get(cards).baseRoute}${items[next].id}`);
  }

  async function previous() {
    if (busy()) return;

    const items = get(cards).items;
    const leaving = items.findIndex((a) => a.visible);
    const next = leaving - 1;

    if (!items[next]) return;

    items[leaving].state = CardState.Center;
    items[next].state = CardState.Center;
    items[next].visible = true;
    cards.update((val) => ({ ...val, items }));

    await delay(0);

    items[leaving].state = CardState.Right;
    items[next].state = CardState.Center;
    cards.update((val) => ({ ...val, items }));

    await delay(ANIMATION_SPEED);

    items[leaving].state = CardState.Right;
    items[leaving].visible = false;
    cards.update((val) => ({ ...val, items }));

    replace(`${get(cards).baseRoute}${items[next].id}`);
  }

  function busy() {
    return get(cards).items.filter((a) => a.visible).length > 1;
  }

  return {
    subscribe: cards.subscribe,
    set: set,
    next,
    previous,
  };
}

export const cards = createCards();
