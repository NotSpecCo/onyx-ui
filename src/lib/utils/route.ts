export function setFocusedId(itemId?: string): string {
  const [route, search] = location.hash.split('?');

  var params = new URLSearchParams(search);
  if (itemId) {
    params.set('focusedId', itemId);
  } else {
    params.delete('focusedId');
  }

  return `${route}?${params.toString()}`;
}

export function getFocusedId(queryString: string): string | null {
  var params = new URLSearchParams(queryString);
  return params.get('focusedId');
}
