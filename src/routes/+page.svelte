<script lang="ts">
  import Article from "$lib/components/Article.svelte";

  import Source from "$lib/components/Source.svelte";

  import type { AppState } from "$lib/utils/appState";
  import { writable } from "svelte/store";
  //const articles = fetchAktualneArticles();

  export let data;

  const articles = data.articles;

  // get all unique sources
  const sources = articles.reduce((acc, article) => {
    if (
      article.sourceName &&
      !acc.some((source) => source === article.sourceName)
    ) {
      acc.push(article.sourceName);
    }
    return acc;
  }, [] as string[]);

  let appState: AppState;
  appState = {
    sourceVisibilities: new Map(
      sources.map((source) => [source, writable(true)])
    ),
  };
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="layout">
  <div class="articles">
    {#await Promise.all([articles, sources])}
      <p>loading...</p>
    {:then [articles, _]}
      {#each articles as article (article.id)}
        {@const visibility = appState.sourceVisibilities.get(
          article.sourceName
        )}
        <Article
          content={{
            ...article,
            source: { name: article.sourceName, link: article.sourceLink },
          }}
          {visibility}
        />
      {/each}
    {/await}
  </div>

  <div class="sidebar">
    {#await sources}
      loading...
    {:then sources}
      {#each sources as source}
        <Source content={{ name: source, link: "" }} {appState} />
      {/each}
    {/await}
  </div>
</div>

<style>
  .layout {
    display: flex;
    flex-direction: row;
  }
  .articles {
    flex: 1fr;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10vw;
    gap: 0.3em;
  }
  .sidebar {
    padding-top: 5em;
    width: 15em;
    display: flex;
    flex-direction: column;
  }
</style>
