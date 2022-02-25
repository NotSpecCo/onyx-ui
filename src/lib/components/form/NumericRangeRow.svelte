<script lang="ts">
  import { v4 as uuidv4 } from 'uuid';
  import FormRow from './FormRow.svelte';
  import NumericRange from './NumericRange.svelte';

  export let label: string = undefined;
  export let value: number = undefined;
  export let min: number;
  export let max: number;
  export let onChange: (val: number) => void;

  const itemId = uuidv4();
  let enabled = false;
</script>

<FormRow
  {label}
  navi={{
    itemId,
    onFocus: () => (enabled = true),
    onBlur: () => (enabled = false),
  }}
>
  <NumericRange {value} {min} {max} {onChange} disabled={!enabled} />
</FormRow>
