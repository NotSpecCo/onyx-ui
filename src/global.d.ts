/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="svelte" />

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    'ononyx:focus'?: () => void;
    'ononyx:blur'?: () => void;
    'ononyx:select'?: () => void;
    'ononyx:softleft'?: () => void;
    'ononyx:softright'?: () => void;
  }
}
