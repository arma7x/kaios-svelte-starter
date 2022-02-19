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

<div class="kai-range-slider-content">
  <div class="kai-range-slider-header">
    <span>{label}</span>
    <span class="indicator">{progress}/{max}</span>
  </div>
  <div class="kai-range-slider-body">
    <div class="kai-range-slider-track"></div>
    <div class="kai-range-slider-track-shadow"></div>
    <div class="kai-range-slider-loaded" style="width:calc({progress}%);border-radius:4px;"></div>
    <div class="kai-range-slider-thumb" style="left:calc({progress}%);"></div>
  </div>
</div>

<style>

  .kai-range-slider-content {
    width: calc(100% - 20px);
  }

  .kai-range-slider-content > .kai-range-slider-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .kai-range-slider-content > .kai-range-slider-header  > .indicator {
    margin-right: -20px;
  }

  .kai-range-slider-content > .kai-range-slider-body {
    position: relative;
    width: 100%; 
  }

  .kai-range-slider-content > .kai-range-slider-body > .kai-range-slider-track {
    width: 100%;
    background-color: #CCCCCC;
    height: 8px;
    border-radius: 4px;
    top: 0px;
    position: absolute;
  }

  .kai-range-slider-content > .kai-range-slider-body > .kai-range-slider-track-shadow {
    width: calc(100% + 20px);
    background-color: #CCCCCC;
    height: 8px;
    border-radius: 4px;
    top: 0px;
    position: absolute;
  }

  .kai-range-slider-content > .kai-range-slider-body > .kai-range-slider-loaded {
    background-color: var(--themeColor);
    height: 8px;
    top: 0px;
    position: absolute;
  }

  .kai-range-slider-content > .kai-range-slider-body > .kai-range-slider-thumb {
    background-color: var(--themeColor);
    border: 3px solid #ffffff;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    top: -6.5px;
    position: absolute;
  }
</style>
