import type { AnimationState } from '../enums';
import type { HistoryState } from './HistoryState';
import type { View } from './View';

export type HistoryItem<TState = {}> = {
  id: string;
  view: View;
  animState: AnimationState;
  isActive: boolean;
  state: HistoryState<TState>;
};
