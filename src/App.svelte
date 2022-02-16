<script lang="ts">
  import { Router, Route, Link } from "svelte-navigator";
  import { AppBar, SoftwareKey } from "./components";
  import { Home, Room } from "./routes";
  import { onMount, onDestroy } from 'svelte';

  export let appBar;
  export let softwareKey;

  export const getParentProp = () => {
    return {appBar, softwareKey};
  }

  onMount(() => {
    console.log('onMount', 'App');
  });

</script>

<Router>
  <AppBar bind:this={appBar} />
  <main>
    <Route path="index.html" let:location let:navigate>
      <svelte:component this="{Home}" {location} {navigate} {getParentProp}/>
    </Route>
    <Route path="room" let:location let:navigate>
      <svelte:component this="{Room}" {location} {navigate} {getParentProp}/>
    </Route>
  </main>
  <SoftwareKey bind:this={softwareKey} />
</Router>

<style>
  main {
    top: 28px;
    margin: 0px;
    padding: 0px;
    position: fixed;
    text-align: center;
    width: 100%;
    height: calc(100% - 58px);
    overflow: scroll;
  }
</style>
