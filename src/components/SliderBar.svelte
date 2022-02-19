<script lang="ts">
  import ListView from './ListView.svelte';

  export let key:any = '';
  export let title: string = '';
  export let className:string = '';
  export let value: number = 0;
  export let min: number = 0;
  export let max: number = 100;

  function updateProgress(val) {
    if (val < min || val > max)
      return progress;
    return progress = Math.round((val / max) * 100);
  }

  $: progress = updateProgress(value);

</script>

<ListView key={key} className={className}>
  <div class="kai-list-view-content" slot="contentWidget">
    <div class="kai-progress-header">
      <span>{title}</span>
      <span>{progress}/{max}</span>
    </div>
    <div class="kai-progress-body">
      <div class="kai-progress-track"></div>
      <div class="kai-progress-loaded" style="width:{progress}%;border-radius:{progress === 100 ? '4px' : '4px 0px 0px 4px'};"></div>
      <div class="kai-progress-thumb" style="left:calc({progress}% - 3px);visibility:{progress === 100 ? 'hidden' : 'visible'};"></div>
    </div>
  </div>
  <span slot="rightIconWidget"></span>
</ListView>

<style>
  .kai-list-view-content {
    width: 100%;
  }
  .kai-list-view-content > .kai-progress-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
  .kai-list-view-content > .kai-progress-body {
    position: relative;
  }
  .kai-list-view-content > .kai-progress-body > .kai-progress-track,
  .kai-list-view-content > .kai-progress-body > .kai-progress-loaded,
  .kai-list-view-content > .kai-progress-body > .kai-progress-thumb {
    top: 0px;
    position: absolute;
  }
</style>
