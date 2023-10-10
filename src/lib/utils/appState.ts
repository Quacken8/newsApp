import type { SourceContent } from "$lib/components/Source.svelte";
import type { Writable } from "svelte/store";

export interface AppState {
  selectedSources: Writable<SourceContent[]>;
}
