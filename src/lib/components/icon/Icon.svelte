<script lang="ts">
  import { IconColor, IconSize } from '../../enums';

  export let size: IconSize = IconSize.Medium;
  export let color: IconColor | string = IconColor.Primary;
  export let disabled = false;

  let colorValue;
  switch (color) {
    case IconColor.Accent:
      colorValue = 'var(--accent-color)';
      break;
    case IconColor.Tertiary:
      colorValue = 'var(--divider-color)';
      break;
    case IconColor.Secondary:
      colorValue = 'var(--secondary-text-color)';
      break;
    case IconColor.Primary:
      colorValue = 'var(--text-color)';
      break;
    default:
      colorValue = color;
      break;
  }
</script>

<div class:disabled style={`color: ${colorValue}; height: ${size}px; width: ${size}px;`}>
  <slot />
</div>

<style>
  .disabled {
    opacity: 0.2;
  }
</style>
