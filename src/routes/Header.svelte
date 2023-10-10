<script>
  import { faBars } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa";
</script>

<header>
  <div class="left">helo</div>
  <div class="right"><Fa icon={faBars} /></div>
</header>

<style>
  header {
    background-color: wheat;
    display: flex;
    flex-direction: row;
    padding: 1em;
    justify-content: space-between;
  }
</style>
