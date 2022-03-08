export type HistoryState<TState = {}> = {
  historyId: string;
  focusedItemId?: string;
} & TState;
