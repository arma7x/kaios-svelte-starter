<script lang="ts">
  import { Route, navigate as goto } from "svelte-navigator";
  import { createKaiNavigator } from '../utils/navigation';
  import { Dialog, OptionMenu, SingleSelector, MultiSelector, ListView, Separator, Radio, Checkbox, LoadingBar, LinearProgress, RangeSlider, Button, TextInput, Toast, Toaster, SoftwareKey } from '../components';
  import { onMount, onDestroy } from 'svelte';

  const navClass: string = 'homeNav';

  export let location: any;
  export let navigate: any;
  export let getParentProp: Function;

  let name: string = 'Home';
  let dialog: Dialog;
  let optionMenu: OptionMenu;
  let singleSelector: SingleSelector;
  let multiSelector: MultiSelector;
  let loadingBar: LoadingBar;
  let inputSoftwareKey: SoftwareKey;
  let progressValue: number = 0;
  let sliderValue: number = 20;

  let navOptions = {
    verticalNavClass: navClass,
    softkeyLeftListener: function(evt) {
      if (inputSoftwareKey)
        return;
      openDialog();
      console.log('softkeyLeftListener', name, this.verticalNavIndex);
    },
    softkeyRightListener: function(evt) {
      if (inputSoftwareKey)
        return;
      toastMessage();
      console.log('softkeyRightListener', name, this.verticalNavIndex);
    },
    enterListener: function(evt) {
      if (inputSoftwareKey)
        return;
      const navClasses = document.getElementsByClassName(navClass);
      if (navClasses[this.verticalNavIndex] != null) {
        navClasses[this.verticalNavIndex].click();
      }
      console.log('enterListener', name);
    },
    backspaceListener: function(evt) {
      console.log('backspaceListener', name);
    },
    arrowLeftListener: function(evt) {
      console.log('arrowLeftListener', name);
      const navClasses = document.getElementsByClassName(navClass);
      if (navClasses[this.verticalNavIndex] != null) {
        const dataKey = navClasses[this.verticalNavIndex].getAttribute('data-key');
        if (dataKey === 'linear-progress') {
          if (progressValue === 0)
            return;
          progressValue -= 10;
        } else if (dataKey === 'range-slider') {
          if (sliderValue === 0)
            return;
          sliderValue -= 10;
        }
      }
    },
    arrowRightListener: function(evt) {
      console.log('arrowRightListener', name);
      const navClasses = document.getElementsByClassName(navClass);
      if (navClasses[this.verticalNavIndex] != null) {
        const dataKey = navClasses[this.verticalNavIndex].getAttribute('data-key');
        if (dataKey === 'linear-progress') {
          if (progressValue === 100)
            return;
          progressValue += 10;
        } else if (dataKey === 'range-slider') {
          if (sliderValue === 100)
            return;
          sliderValue += 10;
        }
      }
    },
  };

  let navInstance = createKaiNavigator(navOptions);

  function onClickHandler(value) {
    goto(value);
  }

  function toastMessage(text = 'I\'m out after 2 second') {
    const t = new Toast({
      target: document.body,
      props: {
        options: {}
      }
    })
    Toaster.push(text , {
      dismissable: false,
      intro: { y: -64 },
      duration: 2000,
      onpop: () => {
        setTimeout(() => {
          t.$destroy();
        }, 4000);
      }
    })
  }

  function showLoadingBar() {
    loadingBar = new LoadingBar({
      target: document.body,
      props: {
        onOpened: () => {
          navInstance.detachListener();
          setTimeout(() => {
            loadingBar.$destroy();
          }, 3000);
        },
        onClosed: () => {
          navInstance.attachListener();
          loadingBar = null;
        }
      }
    });
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
        },
        onBackspace: (evt) => {
          console.log('onBackspace');
          evt.preventDefault();
          evt.stopPropagation();
          dialog.$destroy();
        },
        onOpened: () => {
          navInstance.detachListener();
        },
        onClosed: () => {
          navInstance.attachListener();
          dialog = null;
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
        onSoftkeyRight: (evt) => {
          console.log('onSoftkeyRight', evt);
        },
        onSoftkeyRight: (evt) => {
          console.log('onSoftkeyRight', evt);
        },
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
        softKeyCenterText: 'select',
        onEnter: (evt, scope) => {
          console.log('onEnter', scope);
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
        softKeyLeftText: 'Cancel',
        softKeyRightText: 'Done',
        softKeyCenterTextSelect: 'select',
        softKeyCenterTextDeselect: 'deselect',
        onSoftkeyLeft: (evt, scope) => {
          console.log('onSoftkeyLeft', scope);
          evt.preventDefault();
          evt.stopPropagation();
          multiSelector.$destroy();
        },
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

  function onButtonClick(evt) {
    window.close();
  }

  function onInput(evt) {
    console.log('onInput');
  }

  function onFocus(evt) {
    console.log('onFocus');
    inputSoftwareKey = new SoftwareKey({
      target: document.body,
      props: {
        isInvert: true,
        leftText: 'X Dialog',
        centerText: 'X Enter',
        rightText: 'X Toast'
      }
    });
  }

  function onBlur(evt) {
    console.log('onBlur');
    if (inputSoftwareKey) {
      inputSoftwareKey.$destroy();
      inputSoftwareKey = null;
    }
  }

  onMount(() => {
    console.log('onMount', name);
    const { appBar, softwareKey } = getParentProp();
    appBar.setTitleText(name);
    softwareKey.setText({ left: `Dialog L`, center: `${name} C`, right: `Toast R` });
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
  <ListView className="{navClass}" title="Loading Bar" subtitle="Display loading bar & freeze keydown for 3 seconds" onClick={showLoadingBar} />
  <ListView className="{navClass}" title="Option Menu" subtitle="Click to open option menu & focus on index 2" onClick={openOptionMenu}/>
  <Separator title="Separator 2" />
  <ListView className="{navClass}" title="Single Selector" subtitle="Click to open single selector & focus on index 2" onClick={openSingleSelector}/>
  <ListView className="{navClass}" title="Multi Selector" subtitle="Click to open multi selector & focus on index 2" onClick={openMultiSelector}/>
  <ListView key="linear-progress" className="{navClass}">
    <slot>
      <LinearProgress label="Linear Progress" value={progressValue} min={0} max={100}/>
    </slot>
    <span slot="rightWidget"></span>
  </ListView>
  <ListView key="range-slider" className="{navClass}">
    <slot>
      <RangeSlider label="Range Slider" value={sliderValue} min={0} max={100}/>
    </slot>
    <span slot="rightWidget"></span>
  </ListView>
  <ListView className="{navClass}" title="Title Text No Subtitle 5"/>
  <Separator title="Separator 3" />
  <TextInput className="{navClass}" label="Label" placeholder="Placeholder" value="Value" {onInput} {onFocus} {onBlur}/>
  <ListView className="{navClass}" title="Title Text No Subtitle 7"/>
  <Button className="{navClass}" text="Exit" onClick={onButtonClick}>
    <span slot="leftWidget" class="kai-icon-message" style="margin:0px 5px;"></span>
    <span slot="rightWidget" class="kai-icon-favorite-on" style="margin:0px 5px;"></span>
  </Button>
</main>

<style>
  #home-screen {
    overflow: scroll;
    width: 100%;
  }
</style>
