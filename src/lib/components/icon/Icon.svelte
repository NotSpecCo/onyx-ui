<script lang="ts">
  import { IconColor, IconSize } from '../../enums/icon';

  export let size: IconSize | string = IconSize.Medium;
  export let color: IconColor | string = 'var(--primary-text-color)';
</script>

<div class="icon" style={`color: ${color}; height: ${size}px; width: ${size}px;`}>
  <slot />
</div>
