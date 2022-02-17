<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { SoftwareKey } from "../components";
  import { createKaiNavigator } from '../utils/navigation';

  export let title: string = 'Dialog';
  export let softKeyLeftText: string = '';
  export let softKeyCenterText: string = 'Close';
  export let softKeyRightText: string = '';
  export let onEnter: Function;
  export let onBackspace: Function;

  let softwareKey: SoftwareKey;

  export function setTitleText(text) {
    title = text;
  }

  let navOptions = {
    arrowUpListener: function(evt) {
      document.getElementsByClassName('kai-dialog-body')[0].scrollTop -= 20
      evt.preventDefault();
      evt.stopPropagation();
    },
    arrowDownListener: function(evt) {
      document.getElementsByClassName('kai-dialog-body')[0].scrollTop += 20
      evt.preventDefault();
      evt.stopPropagation();
    },
    arrowLeftListener: function(evt) {
      evt.preventDefault();
      evt.stopPropagation();
    },
    arrowRightListener: function(evt) {
      evt.preventDefault();
      evt.stopPropagation();
    },
    softLeftListener: function(evt) {
      console.log('softLeftListener', title);
    },
    softRightListener: function(evt) {
      console.log('softRightListener', title);
    },
    enterListener: function(evt) {
      console.log('enterListener', title);
      onEnter(evt, {title});
    },
    backspaceListener: function(evt) {
      console.log('backspaceListener', title);
      onBackspace(evt, {title});
    }
  };

  let navInstance = createKaiNavigator(navOptions);

  onMount(() => {
    console.log('onMount', title);
    navInstance.attachListener();
    softwareKey = new SoftwareKey({target: document.body});
    softwareKey.setText({ left: '', center: softKeyCenterText, right: '' });
    softwareKey.invertStyle();
  })

  onDestroy(() => {
    console.log('onDestroy', title);
    navInstance.detachListener();
    softwareKey.$destroy();
  })

</script>

<svelte:options accessors/>

<div class="kai-dialog">
  <div class="kai-dialog-backdrop">
    <div class="kai-dialog-header">{title}</div>
    <div class="kai-dialog-body">Svelte is a radical new approach to building user interfaces. Whereas traditional frameworks like React and Vue do the bulk of their work in the browser, Svelte shifts that work into a compile step that happens when you build your app. Instead of using techniques like virtual DOM diffing, Svelte writes code that surgically updates the DOM when the state of your app changes. We're proud that Svelte was recently voted the most loved web framework with the most satisfied developers in a pair of industry surveys. We think you'll love it too. Read the introductory blog post to learn more.</div>
  </div>
</div>

<style>
  .kai-dialog {
    width: 100%;
    height: calc(100% - 30px);
    bottom: 30px;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .kai-dialog > .kai-dialog-backdrop {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: calc(100% - 68px);
    bottom: 30px;
    position: fixed;
    background-color: #ffffff;
  }
  .kai-dialog > .kai-dialog-backdrop > .kai-dialog-header {
    width: calc(100% - 8px);
    text-align: center;
    vertical-align: middle;
    line-height: 28px;
    height: 28px;
    padding: 0 4px;
    color: #ffffff;
    background-color: #ff3e00;
    font-weight: normal;
  }
  .kai-dialog > .kai-dialog-backdrop > .kai-dialog-body {
    padding: 4px;
    max-height: calc(100% - 96px);
    overflow: scroll;
  }
</style>
