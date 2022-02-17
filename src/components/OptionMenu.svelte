<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import SoftwareKey from './SoftwareKey.svelte';
  import ListView from './ListView.svelte';
  import { createKaiNavigator } from '../utils/navigation';

  const navClass: string = 'optionMenuNav';

  export let title: string = 'Dialog';
  export let cursor: number = 0; // TODO
  export let option: { title: string, subtitle: string }[]; // TODO
  export let softKeyLeftText: string = '';
  export let softKeyCenterText: string = 'Close';
  export let softKeyRightText: string = '';
  export let onEnter: Function = () => {};
  export let onBackspace: Function = () => {};
  export let onSoftkeyLeft: Function = () => {};
  export let onSoftkeyRight: Function = () => {};

  let softwareKey: SoftwareKey;

  export function setTitleText(text) {
    title = text;
  }

  let navOptions = {
    verticalNavClass: navClass,
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
      onEnter(evt, {index: this.verticalNavIndex});
    },
    backspaceListener: function(evt) {
      if (onBackspace == null)
        return;
      console.log('backspaceListener', title);
      onBackspace(evt, {index: this.verticalNavIndex});
    }
  };

  let navInstance = createKaiNavigator(navOptions);

  onMount(() => {
    console.log('onMount', title);
    navInstance.attachListener();
    softwareKey = new SoftwareKey({
      target: document.body,
      props: {
        isInvert: false,
        leftText: softKeyLeftText,
        centerText: softKeyCenterText,
        rightText: softKeyRightText
      }
    });
  })

  onDestroy(() => {
    console.log('onDestroy', title);
    navInstance.detachListener();
    softwareKey.$destroy();
  })

</script>

<svelte:options accessors/>

<div class="kai-option-menu">
  <div class="kai-option-menu-content">
    <div class="kai-option-menu-header">{title}</div>
    <div class="kai-option-menu-body" data-pad-top="66" data-pad-bottom="30">
      <ListView className="{navClass}" title="Option Menu 1"  subtitle="Option menu 1 subtitle" />
      <ListView className="{navClass}" title="Option Menu 2"  subtitle="Option menu 2 subtitle" />
      <ListView className="{navClass}" title="Option Menu 3"  subtitle="Option menu 3 subtitle" />
      <ListView className="{navClass}" title="Option Menu 4"  subtitle="Option menu 4 subtitle" />
      <ListView className="{navClass}" title="Option Menu 5"  subtitle="Option menu 5 subtitle" />
    </div>
  </div>
</div>

<style>
  .kai-option-menu {
    width: 100%;
    height: calc(100% - 30px);
    bottom: 30px;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .kai-option-menu > .kai-option-menu-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: calc(100% - 68px);
    bottom: 30px;
    position: fixed;
    background-color: #ffffff;
  }
  .kai-option-menu > .kai-option-menu-content > .kai-option-menu-header {
    width: calc(100% - 8px);
    text-align: center;
    vertical-align: middle;
    line-height: 28px;
    height: 28px;
    padding: 0 4px;
    color: #313131;
    background-color: #cccccc;
    font-weight: normal;
    font-weight: 200;
  }
  .kai-option-menu > .kai-option-menu-content > .kai-option-menu-body {
    width: 100%;
    max-height: calc(100% - 96px);
    overflow: scroll;
  }
</style>
