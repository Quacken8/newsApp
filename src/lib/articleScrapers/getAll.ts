import { articleSchema } from "$lib/db/schema";
import type { InsertType } from "$lib/dbUpdater";
import { fetchAktualneArticles } from "./aktualne";
import { fetchAljazeeraArticles } from "./aljazeera";
import { fetchBBCArticles } from "./bbc";
import { fetchCT24Articles } from "./ct24";
import { fetchIrozhlasArticles } from "./irozhlas";
import { fetchNYTimesArticles } from "./nytimes";

export async function getAllArticles(): Promise<InsertType[]> {
  return (
    await Promise.all([
      fetchAktualneArticles(),
      fetchAljazeeraArticles(),
      fetchBBCArticles(),
      fetchCT24Articles(),
      fetchIrozhlasArticles(),
      fetchNYTimesArticles(),
    ])
  ).flat();
}
