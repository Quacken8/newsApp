<script lang="ts" context="module">
  export interface ChipContent {
    text: string;
    link?: string;
  }
</script>

<script lang="ts">
  export let content: ChipContent;
</script>

<div
  class="container"
  on:click={(e) => {
    if (!content.link) e.preventDefault();
  }}
>
  <a href={content.link} target="_blank" style="text-decoration: none;">
    {content.text}
  </a>
</div>

<style>
  .container {
    padding: 1em;
    border-radius: 5px;
    background-color: rgb(255, 205, 140);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1em;
  }

  .container:hover {
    background-color: rgb(255, 205, 140, 0.8);
  }
</style>
