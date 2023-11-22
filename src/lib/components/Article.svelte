<script lang="ts" context="module">
  export type ArticleContent = {
    title?: string;
    perex?: string;
    date?: Date;
    keywords?: ChipContent[];
    imageSrc?: string;
    imageAlt?: string;
    link?: string;
    source: SourceContent;
    id: number;
  };
</script>

<script lang="ts">
  import type { Writable } from "svelte/store";
  import { slide } from "svelte/transition";

  import Chip, { type ChipContent } from "./Chip.svelte";
  import type { SourceContent } from "./Source.svelte";
  export let content: ArticleContent;
  export let visibility: Writable<boolean> | undefined;
  // FIXME add a little icon that says open in new tab
</script>

{#if $visibility}
  <a href={content.link} target="_blank" transition:slide>
    <div class="article-container">
      <img src={content.imageSrc} alt={content.imageAlt} />
      <article>
        <div class="title">
          {content.title}
          <div class="date">
            {content.date?.toDateString()}
          </div>
        </div>
        <div class="perex">
          {content.perex}
        </div>
      </article>
      <div class="keywords">
        {#if content.source}
          <div class="source">
            {content.source.name}
          </div>
        {/if}
        {#if content.keywords}
          {#each content.keywords as keyword}
            <Chip content={keyword} />
          {/each}
        {/if}
      </div>
    </div>
  </a>
{/if}

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
    width: 60vw;
  }

  .article-container:hover {
    background-color: rgb(255, 205, 140, 0.8);
  }

  img {
    flex: 1;
  }

  article {
    flex: 4;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .title {
    display: flex;
    align-items: end;
    gap: 10px;
    font-size: 1.5em;
    font-weight: bold;
  }

  .source {
    font-size: 0.8em;
    color: gray;
  }

  .keywords {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .date {
    font-size: 0.6em;
    font-weight: lighter;
    color: gray;
  }
</style>
