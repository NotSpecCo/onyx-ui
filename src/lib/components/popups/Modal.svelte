<script lang="ts">
  import { getContext } from 'svelte';
  import { dpad } from '../../actions/dpad';
  import { ContextKey, OpenState } from '../../enums';
  import type { SettingsContext } from '../../models';
  import { delay } from '../../utils/delay';

  type Actions = {
    left?: {
      label: string;
      actionFn: () => void;
    };
    center?: {
      label: string;
      actionFn: () => void;
    };
    right?: {
      label: string;
      actionFn: () => void;
    };
  };

  export let title: string;
  export let open = false;
  export let actions: Actions = {};
  export let onClose: () => void = undefined;

  const settings = getContext<SettingsContext>(ContextKey.Settings);

  $: {
    if (open) {
      openModal();
    } else {
      closeModal();
    }
  }

  let state = OpenState.Closed;

  async function openModal() {
    if (state >= OpenState.Opening) {
      return;
    }
    state = OpenState.Closing;
    await delay(0);
    state = OpenState.Opening;
    await delay($settings.animations);
    state = OpenState.Open;
  }
  async function closeModal() {
    if (state <= OpenState.Closing) {
      return;
    }
    state = OpenState.Opening;
    await delay(0);
    state = OpenState.Closing;
    await delay($settings.animations);
    state = OpenState.Closed;
    onClose();
  }
</script>

{#if state > OpenState.Closed}
  <div class="root">
    <div class="scrim" class:open={state >= OpenState.Opening} />
    <div
      class="card"
      class:open={state >= OpenState.Opening}
      use:dpad={{
        onSoftLeft: () => {
          actions.left?.actionFn?.();
          closeModal();
          return true;
        },
        onSoftRight: () => {
          actions.right?.actionFn?.();
          closeModal();
          return true;
        },
        onEnter: async () => {
          actions.center?.actionFn?.();
          closeModal();
          return true;
        },
        onBackspace: () => {
          closeModal();
          return true;
        },
        priority: 'high',
      }}
    >
      <div class="title">{title}</div>
      <slot />
      <div class="footer">
        <div>{actions.left?.label || ''}</div>
        <div>{actions.center?.label || ''}</div>
        <div>{actions.right?.label || ''}</div>
      </div>
    </div>
  </div>
{/if}

<style>
  .root {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
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
    background-color: var(--card-primary-color);
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
    display: flex;
    padding: 5px;
    text-align: center;
    font-weight: var(--bold-font-weight);
  }
  .footer > div {
    flex: 1;
  }
  .footer > div:first-child {
    text-align: left;
  }
  .footer > div:last-child {
    text-align: right;
  }
</style>
