<script lang="ts">
  import { IconSize, RenderState } from '../../enums';
  import { settings, toaster } from '../../stores';
  import Icon from '../icon/Icon.svelte';
</script>

<div
  class="root"
  class:top={$settings.toasterLocation === 'top'}
  class:bottom={$settings.toasterLocation === 'bottom'}
  class:open={$toaster.state === RenderState.Open}
>
  {#if $settings.toasterLocation === 'bottom'}
    <div class="header" />
  {/if}
  <div class="toast">
    {#if $toaster.data.icon}
      <div class="icon">
        <Icon size={IconSize.Small} color="var(--app-text-color)">
          <svelte:component this={$toaster.data.icon} />
        </Icon>
      </div>
    {/if}
    {$toaster.data?.title}
  </div>
  {#if $settings.toasterLocation === 'top'}
    <div class="footer" />
  {/if}
</div>

<style>
  .root {
    position: absolute;
    right: 0;
    left: 0;
    z-index: 9;
    transition: transform calc(var(--animation-speed) * 2);
    transition-timing-function: ease-in;
    transform: translateY(0px);
    display: flex;
    flex-direction: column;
  }
  .root.top {
    bottom: 100vh;
  }
  .root.top.open {
    transform: translateY(100%);
    transition-timing-function: ease-out;
  }
  .root.bottom {
    top: 100vh;
  }
  .root.bottom.open {
    transform: translateY(-100%);
    transition-timing-function: ease-out;
  }
  .header {
    border-radius: var(--radius);
    box-shadow: 0px 13px 0px var(--app-bg-color);
    height: 35px;
  }
  .footer {
    border-radius: var(--radius);
    box-shadow: 0px -13px 0px var(--app-bg-color);
    height: 35px;
  }
  .toast {
    background-color: var(--app-bg-color);
    color: var(--app-text-color);
    font-weight: var(--bold-font-weight);
    padding: 3px 5px;
    display: flex;
    align-items: center;
    z-index: 1;
  }
  .icon {
    margin-right: 5px;
  }
</style>
