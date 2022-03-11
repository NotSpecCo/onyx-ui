export type HistoryItem<T = {}> = {
  id: string;
  viewTypeId: string;
  viewTypeName: string;
  viewTitle?: string;
  focusedItemId?: string;
  viewData: T;
};
