/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="svelte" />

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onitemfocus?: () => void;
    onitemblur?: () => void;
    onitemselect?: () => void;
    onitemmenu?: () => void;
  }
}
