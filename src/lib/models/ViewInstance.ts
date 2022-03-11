import type { ViewType } from './ViewType';

export type ViewInstance<TState = {}> = {
  id: string;
  title?: string;
  type: ViewType;
  state?: {
    focusedItemId?: string;
  } & TState;
};
