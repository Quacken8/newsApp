<script lang="ts">
  import Article from "$lib/components/Article.svelte";
  import type { ArticleContent } from "$lib/components/Article.svelte";

  import Source from "$lib/components/Source.svelte";
  import type { SourceContent } from "$lib/components/Source.svelte";

  import { fetchAktualneArticles } from "$lib/articleFetchers/aktualne";
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
  };

  const articles = Promise.resolve([
    placeholderArticle,
    placeholderArticle,
    placeholderArticle,
    placeholderArticle,
  ]);

  // get all unique sources
  const sources = articles.then((articles) =>
    articles.reduce((acc, article) => {
      const newSource = {
        name: article.source, // FIXME expand
      };
      if (
        article.source &&
        !acc.some((source) => source.name === article.source)
      ) {
        console.log(acc);
        acc.push(newSource);
      }
      return acc;
    }, [] as SourceContent[])
  );
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="layout">
  <div class="articles">
    {#await articles}
      <p>loading...</p>
    {:then articles}
      {#each articles as article}
        <Article content={article} />
      {/each}
    {/await}
  </div>

  <div class="sidebar">
    {#await sources}
      loading...
    {:then sources}
      {#each sources as source}
        <Source content={source} />
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
