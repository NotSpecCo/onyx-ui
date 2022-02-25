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
    onChange(ev.target.value);
  }
</script>

<FormRow
  {label}
  navi={{
    itemId,
    onFocus: () => (focused = true),
    onBlur: () => (focused = false),
  }}
>
  <input
    type="text"
    class="root"
    {value}
    {placeholder}
    {disabled}
    use:focus={{ focused }}
    on:change={handleChange}
  />
</FormRow>

<style>
  .root {
    min-height: 24px;
  }
</style>
