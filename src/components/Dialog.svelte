<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { SoftwareKey } from "../components";
  import { createKaiNavigator } from '../utils/navigation';

  export let title: string = 'Dialog';
  export let body: string = '';
  export let softKeyLeftText: string = '';
  export let softKeyCenterText: string = 'Close';
  export let softKeyRightText: string = '';
  export let onEnter: Function;
  export let onBackspace: Function;
  export let onSoftkeyLeft: Function;
  export let onSoftkeyRight: Function;

  let softwareKey: SoftwareKey;

  export function setTitleText(text) {
    title = text;
  }

  let navOptions = {
    arrowUpListener: function(evt) {
      document.getElementsByClassName('kai-dialog-body')[0].scrollTop -= 20;
      evt.preventDefault();
      evt.stopPropagation();
    },
    arrowDownListener: function(evt) {
      document.getElementsByClassName('kai-dialog-body')[0].scrollTop += 20;
      evt.preventDefault();
      evt.stopPropagation();
    },
    arrowLeftListener: function(evt) {
      document.getElementsByClassName('kai-dialog-body')[0].scrollLeft -= 20;
      evt.preventDefault();
      evt.stopPropagation();
    },
    arrowRightListener: function(evt) {
      document.getElementsByClassName('kai-dialog-body')[0].scrollLeft += 20;
      evt.preventDefault();
      evt.stopPropagation();
    },
    softkeyLeftListener: function(evt) {
      if (onSoftkeyLeft == null)
        return;
      console.log('softkeyLeftListener', title);
    },
    softkeyRightListener: function(evt) {
      if (onSoftkeyRight == null)
        return;
      console.log('softkeyRightListener', title);
    },
    enterListener: function(evt) {
      if (onEnter == null)
        return;
      console.log('enterListener', title);
      onEnter(evt, {title});
    },
    backspaceListener: function(evt) {
      if (onBackspace == null)
        return;
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
  <div class="kai-dialog-content">
    <div class="kai-dialog-header">{title}</div>
    <div class="kai-dialog-body">{body}</div>
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
  .kai-dialog > .kai-dialog-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: calc(100% - 68px);
    bottom: 30px;
    position: fixed;
    background-color: #ffffff;
  }
  .kai-dialog > .kai-dialog-content > .kai-dialog-header {
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
  .kai-dialog > .kai-dialog-content > .kai-dialog-body {
    padding: 4px;
    max-height: calc(100% - 96px);
    overflow: scroll;
  }
</style>
