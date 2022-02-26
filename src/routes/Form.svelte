<script lang="ts">
  import { onMount } from 'svelte';
  import { replace } from 'svelte-spa-router';
  import Card from '../lib/components/card/Card.svelte';
  import CardContent from '../lib/components/card/CardContent.svelte';
  import CardHeader from '../lib/components/card/CardHeader.svelte';
  import CheckboxRow from '../lib/components/form/CheckboxRow.svelte';
  import InlineSelectRow from '../lib/components/form/InlineSelectRow.svelte';
  import InputRow from '../lib/components/form/InputRow.svelte';
  import NumericRangeRow from '../lib/components/form/NumericRangeRow.svelte';
  import Typography from '../lib/components/Typography.svelte';
  import View from '../lib/components/view/View.svelte';
  import ViewContent from '../lib/components/view/ViewContent.svelte';
  import { DataStatus } from '../lib/enums';
  import { registerView, updateView, view } from '../lib/stores/view';

  export let params: { cardId: string };

  registerView({
    cards: [
      {
        id: 'info',
        title: 'Forms',
        onSelect: () => replace(`/forms/info`),
      },
      {
        id: 'checkbox',
        title: 'Checkbox',
        onSelect: () => replace(`/forms/checkbox`),
      },
      {
        id: 'inlineSelect',
        title: 'Inline Select',
        onSelect: () => replace(`/forms/inlineSelect`),
      },
      {
        id: 'numericRange',
        title: 'Numeric Range',
        onSelect: () => replace(`/forms/numericRange`),
      },
      {
        id: 'input',
        title: 'Input',
        onSelect: () => replace(`/forms/input`),
      },
    ],
    activeCardId: params.cardId ?? 'info',
  });

  let values = {
    checkbox1: true,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
    inlineSelect1: '1',
    inlineSelect2: '1',
    inlineSelect3: '1',
    inlineSelect4: '1',
    inlineSelect5: '1',
    numericRange1: 1,
    numericRange2: 1,
    numericRange3: 1,
    numericRange4: 1,
    numericRange5: 1,
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
  };

  onMount(async () => {
    updateView({ dataStatus: DataStatus.Loaded });
  });
</script>

<View>
  <ViewContent>
    {#if params.cardId === $view.cards[0].id}
      <Card cardId={$view.cards[0].id}>
        <CardHeader />
        <CardContent>
          <Typography>Info about form components</Typography>
        </CardContent>
      </Card>
    {:else if params.cardId === $view.cards[1].id}
      <Card cardId={$view.cards[1].id}>
        <CardHeader />
        <CardContent>
          <CheckboxRow
            label="Checkbox 1"
            checked={values.checkbox1}
            onChange={(val) => (values.checkbox1 = val)}
          />
          <CheckboxRow
            label="Checkbox 2"
            checked={values.checkbox2}
            onChange={(val) => (values.checkbox2 = val)}
          />
          <CheckboxRow
            label="Checkbox 3"
            checked={values.checkbox3}
            onChange={(val) => (values.checkbox3 = val)}
          />
          <CheckboxRow
            label="Checkbox 4"
            checked={values.checkbox4}
            onChange={(val) => (values.checkbox4 = val)}
          />
          <CheckboxRow
            label="Checkbox 5"
            checked={values.checkbox5}
            disabled={true}
            onChange={(val) => (values.checkbox5 = val)}
          />
        </CardContent>
      </Card>
    {:else if params.cardId === $view.cards[2].id}
      <Card cardId={$view.cards[2].id}>
        <CardHeader />
        <CardContent>
          <InlineSelectRow
            label="Select 1"
            value={values.inlineSelect1}
            options={[
              { id: '1', label: 'One' },
              { id: '2', label: 'Two' },
              { id: '3', label: 'Three' },
            ]}
            onChange={(val) => (values.inlineSelect1 = val)}
          />
          <InlineSelectRow
            label="Select 2"
            value={values.inlineSelect2}
            options={[
              { id: '1', label: 'One' },
              { id: '2', label: 'Two' },
              { id: '3', label: 'Three' },
            ]}
            onChange={(val) => (values.inlineSelect2 = val)}
          />
          <InlineSelectRow
            label="Select 3"
            value={values.inlineSelect3}
            options={[
              { id: '1', label: 'One' },
              { id: '2', label: 'Two' },
              { id: '3', label: 'Three' },
            ]}
            onChange={(val) => (values.inlineSelect3 = val)}
          />
          <InlineSelectRow
            label="Select 4"
            value={values.inlineSelect4}
            options={[
              { id: '1', label: 'One' },
              { id: '2', label: 'Two' },
              { id: '3', label: 'Three' },
            ]}
            onChange={(val) => (values.inlineSelect4 = val)}
          />
          <InlineSelectRow
            label="Select 5"
            value={values.inlineSelect5}
            options={[
              { id: '1', label: 'One' },
              { id: '2', label: 'Two' },
              { id: '3', label: 'Three' },
            ]}
            disabled={true}
            onChange={(val) => (values.inlineSelect5 = val)}
          />
        </CardContent>
      </Card>
    {:else if params.cardId === $view.cards[3].id}
      <Card cardId={$view.cards[3].id}>
        <CardHeader />
        <CardContent>
          <NumericRangeRow
            label="Range 1"
            value={values.numericRange1}
            min={1}
            max={20}
            onChange={(val) => (values.numericRange1 = val)}
          />
          <NumericRangeRow
            label="Range 2"
            value={values.numericRange2}
            min={1}
            max={20}
            onChange={(val) => (values.numericRange2 = val)}
          />
          <NumericRangeRow
            label="Range 3"
            value={values.numericRange3}
            min={1}
            max={20}
            onChange={(val) => (values.numericRange3 = val)}
          />
          <NumericRangeRow
            label="Range 4"
            value={values.numericRange4}
            min={1}
            max={20}
            onChange={(val) => (values.numericRange4 = val)}
          />
          <NumericRangeRow
            label="Range 5"
            value={values.numericRange5}
            min={1}
            max={20}
            disabled={true}
            onChange={(val) => (values.numericRange5 = val)}
          />
        </CardContent>
      </Card>
    {:else if params.cardId === $view.cards[4].id}
      <Card cardId={$view.cards[4].id}>
        <CardHeader />
        <CardContent>
          <InputRow
            label="Input 1"
            value={values.input1}
            placeholder="Enter text..."
            onChange={(val) => (values.input1 = val)}
          />
          <InputRow
            label="Input 2"
            value={values.input2}
            placeholder="Enter text..."
            onChange={(val) => (values.input2 = val)}
          />
          <InputRow
            label="Input 3"
            value={values.input3}
            placeholder="Enter text..."
            onChange={(val) => (values.input3 = val)}
          />
          <InputRow
            label="Input 4"
            value={values.input4}
            placeholder="Enter text..."
            onChange={(val) => (values.input4 = val)}
          />
          <InputRow
            label="Input 5"
            value={values.input5}
            placeholder="Enter text..."
            disabled={true}
            onChange={(val) => (values.input5 = val)}
          />
        </CardContent>
      </Card>
    {/if}
  </ViewContent>
</View>
