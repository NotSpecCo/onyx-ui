<script lang="ts">
  export let columns: number = 3;
  export let gap: number = 10;
</script>

<div class="root" style={`grid-template-columns: repeat(${columns}, 1fr)`}>
  <slot />
</div>

<style>
  .root {
    display: grid;
    grid-auto-rows: max-content;
  }
</style>
