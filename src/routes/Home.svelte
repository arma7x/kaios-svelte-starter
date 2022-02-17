<script lang="ts">
  import { Route, navigate as goto } from "svelte-navigator";
  import { createKaiNavigator } from '../utils/navigation';
  import { Dialog, OptionMenu, ListView, Separator } from '../components';
  import { onMount, onDestroy } from 'svelte';

  const navClass: string = 'homeNav';

  export let location: any;
  export let navigate: any;
  export let getParentProp: Function;

  let name: string = 'Home';
  let dialog: any;
  let optionMenu: any;

  let navOptions = {
    verticalNavClass: navClass,
    softkeyLeftListener: function(evt) {
      navInstance.detachListener();
      dialog = new Dialog({
        target: document.body,
        props: {
          title: 'Intro',
          body: `Svelte is a radical new approach to building user interfaces. Whereas traditional frameworks like React and Vue do the bulk of their work in the browser, Svelte shifts that work into a compile step that happens when you build your app. Instead of using techniques like virtual DOM diffing, Svelte writes code that surgically updates the DOM when the state of your app changes. We're proud that Svelte was recently voted the most loved web framework with the most satisfied developers in a pair of industry surveys. We think you'll love it too. Read the introductory blog post to learn more.`,
          softKeyCenterText: 'hide',
          onEnter: (evt) => {
            console.log('onEnter');
            dialog.$destroy();
            navInstance.attachListener();
            dialog = null;
          },
          onBackspace: (evt) => {
            console.log('onBackspace');
            evt.preventDefault();
            evt.stopPropagation();
            dialog.$destroy();
            navInstance.attachListener();
            dialog = null;
          }
        }
      });
    },
    softkeyRightListener: function(evt) {
      console.log('softkeyRightListener', name, this.verticalNavIndex);
    },
    enterListener: function(evt) {
      const navClasses = document.getElementsByClassName(navClass);
      if (navClasses[this.verticalNavIndex] != null) {
        navClasses[this.verticalNavIndex].click();
      }
      //console.log('enterListener', name);
    },
    backspaceListener: function(evt) {
      console.log('backspaceListener', name);
    }
  };

  let navInstance = createKaiNavigator(navOptions);

  function onClickHandler(value) {
    goto(value);
  }

  function openOptionMenu() {
    navInstance.detachListener();
    optionMenu = new OptionMenu({
      target: document.body,
      props: {
        title: 'Option Menu',
        cursor: 0,
        softKeyCenterText: 'select',
        onEnter: (evt, scope) => {
          console.log('onEnter', scope);
          optionMenu.$destroy();
          navInstance.attachListener();
          optionMenu = null;
        },
        onBackspace: (evt, scope) => {
          console.log('onEnter', scope);
          evt.preventDefault();
          evt.stopPropagation();
          optionMenu.$destroy();
          navInstance.attachListener();
          optionMenu = null;
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
  <ListView className="{navClass}" title="Option Menu" subtitle="Click to open option menu" onClick={openOptionMenu}/>
  <Separator title="Separator 2" />
  <ListView className="{navClass}" title="Title Text No Subtitle 3"/>
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
