<script lang="ts">
  export let title: string = '';
  export let subtitle: string = null;
  export let className: string = null;
  export let onClick: Function = (evt) => {}
</script>

<div class="kai-list-view {className ? className : ''}" on:click={onClick}>
  <div class="kai-list-view-content">
    <p>{title}</p>
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

  .kai-list-view > .kai-list-view-content > p {
    padding: 0px;
    margin: 0px 4px 0px 0px;
    font-weight: 400;
    color: #313131;
    font-size: 14px;
    text-align: start;
    height: 16px;
    width: calc(100% - 4px);
    white-space: pre-wrap!important;
    word-break: break-word!important;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .kai-list-view > .kai-list-view-content > small {
    padding: 0px;
    margin: 4px 0px 0px 0px;
    font-size: 13px;
    font-weight: lighter;
    color: #6a6a6a;
    text-align: start;
  }

  .kai-list-view > span {
    color: #313131;
  }

  .kai-list-view.focus,
  .kai-list-view.focus > .kai-list-view-content > p,
  .kai-list-view.focus > .kai-list-view-content > small,
  .kai-list-view.focus > span {
    background-color: #ff3e00;
    color: #ffffff;
  }
</style>
