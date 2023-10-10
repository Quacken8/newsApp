<script lang="ts" context="module">
  export interface SourceContent {
    name?: string;
    link?: string;
    image?: string;
    description?: string;
  }
</script>

<script lang="ts">
  export let content: SourceContent;
  export let enabled: boolean;
</script>

<div class="source-container">
  <div class="image" />

  <div class="text">
    <div class="name">
      {content.name}
    </div>
    <div class="description">
      {content.description}
    </div>
  </div>

  <input type="checkbox" bind:checked={enabled} />
</div>

<style>
  .source-container {
    background-color: rgb(255, 205, 140);
    border-bottom: 1px;
    border-top: 1px;
    border-left: 0;
    border-right: 0;
    border-color: rgb(141, 114, 78);
    border-style: solid;
    padding: 5px;
    padding-right: 1em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .text {
    display: flex;
    flex-direction: column;
  }
</style>
