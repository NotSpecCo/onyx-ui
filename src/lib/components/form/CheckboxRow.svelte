<script lang="ts">
  import { v4 as uuidv4 } from 'uuid';
  import Checkbox from './Checkbox.svelte';
  import FormRow from './FormRow.svelte';

  export let label: string;
  export let checked: boolean;
  export let onChange: (val: boolean) => void;

  const itemId = uuidv4();
</script>

<FormRow {label} navi={{ itemId, onSelect: () => onChange(!checked) }}>
  <Checkbox {checked} />
</FormRow>

<style>
</style>
