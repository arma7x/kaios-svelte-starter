<script lang="ts">
  export let title: string = '';
  export let subtitle: string = null;
  export let className: string = null;
  export let onClick: Function = (evt) => {}
</script>

<div class="kai-list-view {className ? className : ''}" on:click={onClick}>
  <div class="kai-list-view-content">
    <h4>{title}</h4>
    {#if subtitle}<small>{subtitle}</small>{/if}
  </div>
  <span class="kai-icon-arrow"></span>
</div>

<style>
  .kai-list-view {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    box-sizing: border-box;
    padding: 4px;
    height: 60px;
    width: 100%;
  }

  .kai-list-view > .kai-list-view-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
  }

  .kai-list-view.focus,
  .kai-list-view.focus > .kai-list-view-content > h4 {
    background-color: #ff3e00;
    color: #ffffff;
  }

  .kai-list-view > .kai-list-view-content > h4 {
    padding: 0px;
    margin: 0px;
    font-weight: 500;
    color: #484848;
  }

  .kai-list-view > .kai-list-view-content > small {
    padding: 0px;
    margin: 4px 0px 0px 0px;
    font-weight: 400;
  }
</style>
