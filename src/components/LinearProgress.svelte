<script lang="ts">

  export let key:any = '';
  export let label: string = '';
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

<div class="kai-linear-progress-content">
  <div class="kai-linear-progress-header">
    <span>{label}</span>
    <span class="indicator">{progress}/{max}</span>
  </div>
  <div class="kai-linear-progress-body">
    <div class="kai-linear-progress-track"></div>
    <div class="kai-linear-progress-loaded" style="width:{progress}%;border-radius:{progress === 100 ? '4px' : '4px 0px 0px 4px'};"></div>
    <div class="kai-linear-progress-thumb" style="left:calc({progress}% - 2px);visibility:{progress == 100 || progress == 0 ? 'hidden' : 'visible'};"></div>
  </div>
</div>

<style>

  .kai-linear-progress-content {
    width: 100%;
  }

  .kai-linear-progress-content > .kai-linear-progress-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .kai-linear-progress-content > .kai-linear-progress-body {
    position: relative;
    width: 100%; 
  }

  .kai-linear-progress-content > .kai-linear-progress-body > .kai-linear-progress-track {
    width: 100%;
    background-color: #CCCCCC;
    height: 5px;
    border-radius: 4px;
    top: 0px;
    position: absolute;
  }

  .kai-linear-progress-content > .kai-linear-progress-body > .kai-linear-progress-loaded {
    background-color: var(--themeColor);
    height: 5px;
    top: 0px;
    position: absolute;
  }

  .kai-linear-progress-content > .kai-linear-progress-body > .kai-linear-progress-thumb {
    background-color: #ffffff;
    height: 5px;
    width: 2px;
    border-radius: 0px;
    top: 0px;
    position: absolute;
  }
</style>
