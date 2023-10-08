<script lang="ts">
  import Article from "$lib/components/Article.svelte";

  import { fetchAktualneArticles } from "$lib/articleFetchers/aktualne";

  const aktualnes = fetchAktualneArticles();
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="container">
  {#await aktualnes}
    <p>loading...</p>
  {:then aktualnes}
    {#each aktualnes as aktualne}
      {@const x = console.log(aktualne)}
      <Article content={aktualne} />
    {/each}
  {/await}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10vw;
  }
</style>
