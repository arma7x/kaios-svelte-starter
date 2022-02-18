<script lang="ts">
  import { Route, navigate as goto } from "svelte-navigator";
  import { createKaiNavigator } from '../utils/navigation';
  import { Dialog, OptionMenu, SingleSelector, MultiSelector, ListView, Separator, Radio, Checkbox } from '../components';
  import { onMount, onDestroy } from 'svelte';

  const navClass: string = 'homeNav';

  export let location: any;
  export let navigate: any;
  export let getParentProp: Function;

  let name: string = 'Home';
  let dialog: any;
  let optionMenu: any;
  let singleSelector: any;
  let multiSelector: any;

  let navOptions = {
    verticalNavClass: navClass,
    softkeyLeftListener: function(evt) {
      openDialog()
    },
    softkeyRightListener: function(evt) {
      console.log('softkeyRightListener', name, this.verticalNavIndex);
    },
    enterListener: function(evt) {
      const navClasses = document.getElementsByClassName(navClass);
      if (navClasses[this.verticalNavIndex] != null) {
        navClasses[this.verticalNavIndex].click();
      }
      console.log('enterListener', name);
    },
    backspaceListener: function(evt) {
      console.log('backspaceListener', name);
    }
  };

  let navInstance = createKaiNavigator(navOptions);

  function onClickHandler(value) {
    goto(value);
  }

  function openDialog() {
    dialog = new Dialog({
      target: document.body,
      props: {
        title: 'Intro',
        body: `Svelte is a radical new approach to building user interfaces. Whereas traditional frameworks like React and Vue do the bulk of their work in the browser, Svelte shifts that work into a compile step that happens when you build your app. Instead of using techniques like virtual DOM diffing, Svelte writes code that surgically updates the DOM when the state of your app changes. We're proud that Svelte was recently voted the most loved web framework with the most satisfied developers in a pair of industry surveys. We think you'll love it too. Read the introductory blog post to learn more.`,
        softKeyCenterText: 'hide',
        onEnter: (evt) => {
          console.log('onEnter');
          dialog.$destroy();
          dialog = null;
        },
        onBackspace: (evt) => {
          console.log('onBackspace');
          evt.preventDefault();
          evt.stopPropagation();
          dialog.$destroy();
          dialog = null;
        },
        onOpened: () => {
          navInstance.detachListener();
        },
        onClosed: () => {
          navInstance.attachListener();
        }
      }
    });
  }

  function openOptionMenu() {
    optionMenu = new OptionMenu({
      target: document.body,
      props: {
        title: 'Option Menu',
        focusIndex: 2,
        options: [
          { title: 'Option Menu 0', subtitle: 'Option menu 0 subtitle' },
          { title: 'Option Menu 1', subtitle: 'Option menu 1 subtitle' },
          { title: 'Option Menu 2', subtitle: 'Option menu 2 subtitle' },
          { title: 'Option Menu 3', subtitle: 'Option menu 3 subtitle' },
          { title: 'Option Menu 4', subtitle: 'Option menu 4 subtitle' },
        ],
        softKeyCenterText: 'select',
        onEnter: (evt, scope) => {
          console.log('onEnter', scope);
          optionMenu.$destroy();
        },
        onBackspace: (evt, scope) => {
          console.log('onBackspace', scope);
          evt.preventDefault();
          evt.stopPropagation();
          optionMenu.$destroy();
        },
        onOpened: () => {
          navInstance.detachListener();
        },
        onClosed: (scope) => {
          console.log(scope);
          navInstance.attachListener();
          optionMenu = null;
        }
      }
    });
  }

  function openSingleSelector() {
    singleSelector = new SingleSelector({
      target: document.body,
      props: {
        title: 'Single Selector',
        focusIndex: 2,
        options: [
          { title: 'Single Selector 0', subtitle: 'Single selector 0 subtitle', selected: true },
          { title: 'Single Selector 1', subtitle: 'Single selector 1 subtitle', selected: false },
          { title: 'Single Selector 2', subtitle: 'Single selector 2 subtitle', selected: false },
          { title: 'Single Selector 3', subtitle: 'Single selector 3 subtitle', selected: false },
          { title: 'Single Selector 4', subtitle: 'Single selector 4 subtitle', selected: false },
        ],
        softKeyRightText: 'Done',
        softKeyCenterText: 'select',
        onSoftkeyRight: (evt, scope) => {
          console.log('onSoftkeyRight', scope);
          evt.preventDefault();
          evt.stopPropagation();
          singleSelector.$destroy();
        },
        onBackspace: (evt, scope) => {
          console.log('onBackspace', scope);
          evt.preventDefault();
          evt.stopPropagation();
          singleSelector.$destroy();
        },
        onOpened: () => {
          navInstance.detachListener();
        },
        onClosed: (scope) => {
          console.log(scope);
          navInstance.attachListener();
          singleSelector = null;
        }
      }
    });
  }

  function openMultiSelector() {
    multiSelector = new MultiSelector({
      target: document.body,
      props: {
        title: 'Multi Selector',
        focusIndex: 2,
        options: [
          { title: 'Multi Selector 0', subtitle: 'Multi selector 0 subtitle', checked: true },
          { title: 'Multi Selector 1', subtitle: 'Multi selector 1 subtitle', checked: false },
          { title: 'Multi Selector 2', subtitle: 'Multi selector 2 subtitle', checked: false },
          { title: 'Multi Selector 3', subtitle: 'Multi selector 3 subtitle', checked: false },
          { title: 'Multi Selector 4', subtitle: 'Multi selector 4 subtitle', checked: false },
        ],
        softKeyRightText: 'Done',
        softKeyCenterTextSelect: 'select',
        softKeyCenterTextDeselect: 'deselect',
        onSoftkeyRight: (evt, scope) => {
          console.log('onSoftkeyRight', scope);
          evt.preventDefault();
          evt.stopPropagation();
          multiSelector.$destroy();
        },
        onBackspace: (evt, scope) => {
          console.log('onBackspace', scope);
          evt.preventDefault();
          evt.stopPropagation();
          multiSelector.$destroy();
        },
        onOpened: () => {
          navInstance.detachListener();
        },
        onClosed: (scope) => {
          console.log(scope);
          navInstance.attachListener();
          multiSelector = null;
        }
      }
    });
  }

  onMount(() => {
    console.log('onMount', name);
    const { appBar, softwareKey } = getParentProp();
    appBar.setTitleText(name);
    softwareKey.setText({ left: `Dialog L`, center: `${name} C`, right: `${name} R` });
    navInstance.attachListener();
  });

  onDestroy(() => {
    console.log('onDestroy', name);
    navInstance.detachListener();
  });

</script>

<main id="home-screen" data-pad-top="28" data-pad-bottom="30">
  <ListView className="{navClass}" title="Room" subtitle="Goto room screen" onClick={() => onClickHandler('room')}/>
  <Separator title="Separator 1" />
  <ListView className="{navClass}" title="Qq Yy Pp Gg Jj Test Overflow Test Overflow Test Overflow"/>
  <ListView className="{navClass}" title="Option Menu" subtitle="Click to open option menu & focus on index 2" onClick={openOptionMenu}/>
  <Separator title="Separator 2" />
  <ListView className="{navClass}" title="Single Selector" subtitle="Click to open single selector & focus on index 2" onClick={openSingleSelector}/>
  <ListView className="{navClass}" title="Multi Selector" subtitle="Click to open multi selector & focus on index 2" onClick={openMultiSelector}/>
  <ListView className="{navClass}" title="Title Text No Subtitle 4"/>
  <ListView className="{navClass}" title="Title Text No Subtitle 5"/>
  <Separator title="Separator 3" />
  <ListView className="{navClass}" title="Title Text No Subtitle 6"/>
  <ListView className="{navClass}" title="Title Text No Subtitle 7"/>
</main>

<style>
  #home-screen {
    overflow: scroll;
    width: 100%;
  }
</style>
