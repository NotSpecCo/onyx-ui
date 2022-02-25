<script lang="ts">
  import { v4 as uuidv4 } from 'uuid';
  import type { SelectOption } from '../../models';
  import FormRow from './FormRow.svelte';
  import InlineSelect from './InlineSelect.svelte';

  export let label: string = undefined;
  export let value: string = undefined;
  export let options: SelectOption[] = [];
  export let onChange: (val: string) => void;

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
  <InlineSelect {value} {options} {onChange} disabled={!enabled} />
</FormRow>
