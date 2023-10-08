<script lang="ts" context="module">
  export type ArticleContent = {
    title?: string;
    perex?: string;
    date?: Date;
    keywords?: ChipContent[];
    imageSrc?: string;
    imageAlt?: string;
    link?: string;
  };
</script>

<script lang="ts">
  import Chip, { type ChipContent } from "./Chip.svelte";
  export let content: ArticleContent;
  // FIXME add a little icon that says open in new tab
</script>

<scrypt lang="ts" context="module" />

<a href={content.link} target="_blank">
  <div class="article-container">
    <img src={content.imageSrc} alt={content.imageAlt} />
    <article>
      <div class="title">
        {content.title}
      </div>
      <div class="date">
        {content.date?.toDateString()}
      </div>
      <div class="perex">
        {content.perex}
      </div>
    </article>
    {#if content.keywords}
      <div class="keywords">
        {#each content.keywords as keyword}
          <Chip content={keyword} />
        {/each}
      </div>
    {/if}
  </div>
</a>

<style>
  a {
    text-decoration: none;
  }

  .article-container {
    padding: 1em;
    border-radius: 5px;
    background-color: rgb(255, 205, 140);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1em;
  }

  .article-container:hover {
    background-color: rgb(255, 205, 140, 0.8);
  }

  article {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .title {
    font-size: 1.5em;
    font-weight: bold;
  }

  .keywords {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .date {
    font-size: 0.8em;
    color: gray;
  }
</style>
