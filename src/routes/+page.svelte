<script lang="ts">
  import Article from "$lib/components/Article.svelte";
  import type { ArticleContent } from "$lib/components/Article.svelte";

  import Source from "$lib/components/Source.svelte";
  import type { SourceContent } from "$lib/components/Source.svelte";

  import { fetchAktualneArticles } from "$lib/articleFetchers/aktualne";
  import type { AppState } from "$lib/utils/appState";
  import { writable } from "svelte/store";
  import { flip } from "svelte/animate";
  //const articles = fetchAktualneArticles();

  const placeholderArticle: ArticleContent = {
    title: "Placeholder",
    perex: "Placeholder perex",
    date: new Date(),
    keywords: [{ text: "Placeholder", link: "https://google.com" }],
    imageSrc: "",
    imageAlt: "image alt text",
    link: "https://example.com",
    source: { name: "placeholder source" },
    id: 1,
  };

  const differentPlaceholderArticle: ArticleContent = {
    title: "Different one",
    perex: "Placeholder perex",
    date: new Date(),
    keywords: [{ text: "Placeholder", link: "https://google.com" }],
    imageSrc: "",
    imageAlt: "image alt text",
    link: "https://example.com",
    source: { name: "different placeholder source" },
    id: 1,
  };

  const articles = Promise.resolve([
    placeholderArticle,
    placeholderArticle,
    differentPlaceholderArticle,
    placeholderArticle,
    placeholderArticle,
    differentPlaceholderArticle,
    differentPlaceholderArticle,
  ]).then((articles) => articles.map((article, id) => ({ ...article, id })));

  // get all unique sources
  const sources = articles.then((articles) =>
    articles.reduce((acc, article) => {
      if (article.source && !acc.some((source) => source === article.source)) {
        acc.push(article.source);
      }
      return acc;
    }, [] as SourceContent[])
  );

  let appState: AppState;
  sources.then(
    (sources) =>
      (appState = {
        sourceVisibilities: new Map(
          sources.map((source) => [source, writable(true)])
        ),
      })
  );
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
        {@const visibility = appState.sourceVisibilities.get(article.source)}
        <Article content={article} {visibility} />
      {/each}
    {/await}
  </div>

  <div class="sidebar">
    {#await sources}
      loading...
    {:then sources}
      {#each sources as source}
        <Source content={source} {appState} />
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
