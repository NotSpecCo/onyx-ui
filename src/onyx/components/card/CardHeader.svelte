<script lang="ts">
  export let title: string = null;
</script>

<div class="root">
  {title}
</div>

<style>
  .root {
    white-space: nowrap;
    overflow: hidden;
    padding: 5px 7px;
    font-weight: 600;
    text-align: center;
  }
</style>
