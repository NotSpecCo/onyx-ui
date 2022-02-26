<script lang="ts">
  import { v4 as uuidv4 } from 'uuid';
  import { focus } from '../../actions/focus';
  import FormRow from './FormRow.svelte';

  export let label: string;
  export let value: string;
  export let placeholder: string = undefined;
  export let disabled = false;
  export let onChange: (val: string) => void;

  const itemId = uuidv4();
  let focused = false;

  function handleChange(ev: any) {
    onChange(ev.target.textContent);
  }
</script>

<FormRow
  {label}
  {disabled}
  navi={{
    itemId,
    onFocus: () => (focused = true),
    onBlur: () => (focused = false),
  }}
>
  {#if value?.length === 0 && !focused}
    <div class="placeholder" use:focus={{ focused }}>
      {placeholder}
    </div>
  {:else}
    <div
      class="input"
      role="textbox"
      contenteditable
      use:focus={{ focused }}
      on:input={handleChange}
    >
      {value}
    </div>
  {/if}
</FormRow>

<style>
  .input,
  .placeholder {
    min-height: 24px;
    min-width: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    outline: none;
    padding: 0 2px;
  }
  .placeholder {
    opacity: 0.3;
  }
</style>
