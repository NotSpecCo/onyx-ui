<script lang="ts">
  export let left: string = '';
  export let center: string = '';
  export let right: string = '';
</script>

<div class="root">
  <div>{left}</div>
  <div>{center}</div>
  <div>{right}</div>
</div>

<style>
  .root {
    display: flex;
    padding: 5px;
    text-align: center;
    font-weight: var(--bold-font-weight);
  }
  .root > div {
    flex: 1;
  }
  .root > div:first-child {
    text-align: left;
  }
  .root > div:last-child {
    text-align: right;
  }
</style>
