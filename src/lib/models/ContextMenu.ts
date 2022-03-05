export type ContextMenu = {
  title: string;
  body?: string;
  items: {
    icon?: any;
    imageUrl?: string;
    label: string;
    workingLabel?: string;
    onSelect: () => Promise<void> | void;
  }[];
  onMenu?: () => void;
};
