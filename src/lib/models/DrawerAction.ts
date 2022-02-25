export type DrawerAction = {
  id: string;
  primaryText: string;
  secondaryText?: string;
  disabled?: boolean;
  inProgress?: boolean;
  keepDrawerOpen?: boolean;
  onSelect: () => any;
};
