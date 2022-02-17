<script lang="ts">
  export let title: string = '';
  export let subtitle: string;
  export let className: string = '';
</script>

<div class="kai-list-view {className}">
  <h4>{title}</h4>
  {#if subtitle}<small>{subtitle}</small>{/if}
</div>

<style>
  .kai-list-view {
    background-color: #ffffff;
    box-sizing: border-box;
    padding: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    height: 60px;
    width: 240px;
  }

  .kai-list-view.focus, .kai-list-view.focus > h4 {
    background-color: #ff3e00;
    color: #ffffff;
  }

  .kai-list-view > h4 {
    padding: 0px;
    margin: 0px;
    font-weight: 500;
    color: #484848;
  }

  .kai-list-view > small {
    padding: 0px;
    margin: 4px 0px 0px 0px;
    font-weight: 400;
  }

  @media screen and (orientation: landscape) {
    .kai-list-view {
      width: 320px;
    }
  }
</style>
