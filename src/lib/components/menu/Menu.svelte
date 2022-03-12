<script lang="ts">
  import { onMount } from 'svelte';
  import { keys } from '../../actions/keys';
  import { OpenState } from '../../enums';
  import { app } from '../../stores/app';
  import { delay } from '../../utils/delay';
  import NavGroup from '../nav/NavGroup.svelte';

  export let title: string;
  export let disabled = false;
  export let onEnter: () => void;
  export let onBackspace: () => void;

  let state = OpenState.Closed;

  async function open() {
    state = OpenState.Closed;
    await delay(0);
    state = OpenState.Opening;
    await delay($app.settings.animations);
    state = OpenState.Open;
  }
  async function close() {
    state = OpenState.Open;
    await delay(0);
    state = OpenState.Closing;
    await delay($app.settings.animations);
    state = OpenState.Closed;
  }

  onMount(() => open());
</script>

<div class="root">
  <div class="scrim" class:open={state >= OpenState.Opening} />
  <div
    class="card"
    class:open={state >= OpenState.Opening}
    use:keys={{
      onSoftLeft: () => true,
      onSoftRight: () => true,
      onBackspace: async () => {
        // TODO: View use:keys fires before this if we await anything, triggering a nav pop
        close().then(onBackspace);
        return true;
      },
      onEnter: async () => {
        await close();
        onEnter();
        return true;
      },
      priority: 'high',
      disabled,
    }}
  >
    <div class="title">{title}</div>
    <NavGroup groupId="menu">
      <slot />
    </NavGroup>
    {#if $app.settings.showHelpText}
      <div class="footer">Save</div>
    {/if}
  </div>
</div>

<style>
  .root {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9;
  }
  .scrim {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity var(--animation-speed);
    opacity: 0;
  }
  .scrim.open {
    opacity: 1;
  }

  .card {
    border: 1px solid var(--card-border-color);
    box-shadow: 0 0 5px hsla(0, 0%, 0%, 20%);
    background-color: var(--card-color);
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: var(--radius) var(--radius) 0 0;
    overflow: hidden;
    transition: transform var(--animation-speed);
    transform: translateY(300px);
  }
  .card.open {
    transform: translateY(0);
  }

  .title {
    white-space: nowrap;
    overflow: hidden;
    padding: 5px 3px;
    font-weight: var(--bold-font-weight);
    text-align: center;
  }
  .footer {
    padding: 5px;
    text-align: center;
    font-weight: var(--bold-font-weight);
  }
</style>
