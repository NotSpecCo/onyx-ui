import type { Readable } from 'svelte/store';
import type { BaseSettings } from '.';

export type SettingsContext<TSettings = BaseSettings> = Readable<TSettings>;
