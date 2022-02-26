import { push, replace } from 'svelte-spa-router';

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

type NavigateOptions = {
  replace?: boolean;
  persistQuery?: boolean;
};
export function navigate(route: string, options?: NavigateOptions) {
  const [, search] = location.hash.split('?');

  let newRoute = route;
  if (options?.persistQuery) {
    newRoute += `?${search}`;
  }

  if (options?.replace) {
    replace(newRoute);
  } else {
    push(newRoute);
  }
}
