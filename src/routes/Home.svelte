<script lang="ts">
  import { Route, navigate as goto } from "svelte-navigator";
  import { createKaiNavigator } from '../utils/navigation';
  import { onMount, onDestroy } from 'svelte';

  export let location: any;
  export let navigate: any;
  export let getParentProp: Function;

  let name: string = 'Home';

  let navOptions = {
    softLeftCallback: function(evt) {
      console.log('softLeftCallback', name);
    },
    softRightListener: function(evt) {
      console.log('softRightListener', name);
    },
    enterListener: function(evt) {
      console.log('enterListener', name);
      goto('room');
    },
    backspaceListener: function(evt) {
      console.log('backspaceListener', name);
    }
  };

  let navInstance = createKaiNavigator(navOptions);

  onMount(() => {
    console.log('onMount', name);
    const { appBar, softwareKey } = getParentProp();
    appBar.setTitleText(name);
    softwareKey.setLeftText(`${name} L`);
    softwareKey.setCenterText(`${name} C`);
    softwareKey.setRightText(`${name} R`);
    navInstance.attachListener();
  });

  onDestroy(() => {
    console.log('onDestroy', name);
    navInstance.detachListener();
  });

</script>

<main>
  <h1>Hello {name}!</h1>
  <h4>Press Enter to navigate Room screen</h4>
  <p>
    Svelte is a radical new approach to building user interfaces. Whereas traditional frameworks like React and Vue do the bulk of their work in the browser, Svelte shifts that work into a compile step that happens when you build your app. Instead of using techniques like virtual DOM diffing, Svelte writes code that surgically updates the DOM when the state of your app changes. We're proud that Svelte was recently voted the most loved web framework with the most satisfied developers in a pair of industry surveys. We think you'll love it too. Read the introductory blog post to learn more.
  </p>
</main>

<style>
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-weight: 100;
  }
</style>
