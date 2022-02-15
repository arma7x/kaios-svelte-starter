<script lang="ts">
  export let title: string = 'Svelte';

  export function setTitleText(text) {
    title = text;
  }
</script>

<div class="app-bar">{title}</div>

<style>
  .app-bar {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    top: 0px;
    position: fixed;
    color: #ffffff;
    background-color: #ff3e00;
    text-transform: uppercase;
    font-weight: 600;
    height: 28px;
    width: 100%;
  }
</style>
