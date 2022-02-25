import { get, writable } from 'svelte/store';

type Group = {
  id: symbol;
  focusedItemId: string | null;
};

export const groups = writable<Group[]>([]);
export const activeGroup = writable<Group | null>(null);
export const activeGroupId = writable<symbol | null>(null);
export const groupItemMap = writable<{ [groupId: symbol]: string | null }>({});

groups.subscribe((data) => {
  activeGroup.set(data.at(-1) || null);
  activeGroupId.set(data.at(-1)?.id || null);
  groupItemMap.set(
    data.reduce((acc, val) => {
      acc[val.id] = val.focusedItemId;
      return acc;
    }, {} as any)
  );
});

export function getFocusedItemId(groupId: symbol): string | null {
  return get(groups).find((a) => a.id === groupId)?.focusedItemId || null;
}

export function setSelectedId(groupId: symbol, itemId?: string) {
  const data = get(groups).map((a) =>
    a.id === groupId ? { id: groupId, focusedItemId: itemId || null } : a
  );
  groups.set(data);
}

export function activateGroup(id: symbol) {
  const other = get(groups).filter((a) => a.id !== id);
  const newGroups = [...other, { id, focusedItemId: null }];
  groups.set(newGroups);
}

export function deactivateGroup(id: any) {
  const newGroups = get(groups).filter((a) => a.id !== id);
  groups.set(newGroups);
}

export function resetNavigation() {
  groups.set([]);
}
