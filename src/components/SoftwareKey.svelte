<script lang="ts">
  export let left: string = 'Left';
  export let center: string = 'Center';
  export let right: string = 'Right';

  export function setLeftText(text) {
    left = text;
  }

  export function setCenterText(text) {
    center = text;
  }

  export function setRightText(text) {
    right = text;
  }
</script>

<div class="kai-software-key">
  <div class="left">{left}</div>
  <div class="center">{center}</div>
  <div class="right">{right}</div>
</div>

<style>
  .kai-software-key {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    bottom: 0px;
    position: fixed;
    color: #00000;
    background-color: #CCCCCC;
    height: 30px;
    width: 100%;
  }
  .kai-software-key > .left {
    text-align: left;
    padding-left: 4px;
    width: calc(33% - 4px);
  }
  .kai-software-key > .center {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    width: 34%;
  }
  .kai-software-key > .right {
    text-align: right;
    padding-right: 4px;
    width: calc(33% - 4px);
  }
</style>
