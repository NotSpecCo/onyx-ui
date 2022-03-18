import type { SvelteComponent } from 'svelte';

export type Toast = {
  icon?: typeof SvelteComponent;
  title: string;
};
