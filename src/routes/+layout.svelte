<script>
  import Header from "./Header.svelte";
  import "./styles.css";
</script>

<div class="app">
  <div class="layout">
    <Header />
    <main>
      <slot />
    </main>
  </div>
</div>

<style>
</style>
