<script lang="ts">
  import { IconColor, IconSize } from '../../enums';

  export let size: IconSize | string = IconSize.Medium;
  export let color: IconColor | string = 'var(--primary-text-color)';
  export let disabled = false;
</script>

<div class:disabled style={`color: ${color}; height: ${size}px; width: ${size}px;`}>
  <slot />
</div>

<style>
  .disabled {
    opacity: 0.2;
  }
</style>
