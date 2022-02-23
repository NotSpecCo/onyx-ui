export type Navigation = {
  itemId: string;
  shortcutKey?: string;
  onFocus?: () => void;
  onSelect?: () => void;
};
