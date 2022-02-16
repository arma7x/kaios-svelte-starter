<script lang="ts">
  import { navigate as goto } from "svelte-navigator";
  import { createKaiNavigator } from '../utils/navigation';
  import { onMount, onDestroy } from 'svelte';

  export let location: any;
  export let navigate: any;
  export let getParentProp: Function;

  let name: string = 'Room';

  let navOptions = {
    verticalNavClass: 'vertClass',
    horizontalNavClass: 'horzClass',
    softLeftListener: function(evt) {
      console.log('softLeftListener', name);
    },
    softRightListener: function(evt) {
      console.log('softRightListener', name);
    },
    enterListener: function(evt) {
      console.log('enterListener', name);
    },
    backspaceListener: function(evt) {
      console.log('backspaceListener', name);
      evt.preventDefault();
      goto(-1);
    }
  };

  let navInstance = createKaiNavigator(navOptions);

  onMount(() => {
    console.log('onMount', name);
    const { appBar, softwareKey } = getParentProp();
    appBar.setTitleText(name);
    softwareKey.setText({ left: `${name} L`, center: `${name} C`, right: `${name} R` });
    navInstance.attachListener();
  });

  onDestroy(() => {
    console.log('onDestroy', name);
    navInstance.detachListener();
  });

</script>

<div>
  <h1>Hello {name}!</h1>
  <div style="display:flex;flex-direction:column;">
    <a href="#" class="vertClass">Vert 1</a>
    <a href="#" class="vertClass">Vert 2</a>
  </div>
  <div style="width:100%;display:flex;flex-direction:row;">
    <a href="#" style="flex:1;" class="horzClass">Horz 1</a>
    <a href="#" style="flex:1;" class="horzClass">Horz 2</a>
  </div>
</div>

<style>
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-weight: 100;
  }
</style>
