<script lang="ts">
  import { replace } from 'svelte-spa-router';
  import Card from '../lib/components/card/Card.svelte';
  import CardContent from '../lib/components/card/CardContent.svelte';
  import CardTabHeader from '../lib/components/card/CardTabHeader.svelte';
  import CheckboxRow from '../lib/components/form/CheckboxRow.svelte';
  import InlineSelectRow from '../lib/components/form/InlineSelectRow.svelte';
  import Typography from '../lib/components/Typography.svelte';
  import View from '../lib/components/view/View.svelte';
  import ViewContent from '../lib/components/view/ViewContent.svelte';
  import { registerView, view } from '../lib/stores/view';

  export let params: { tabId: string };

  registerView({
    tabs: [
      {
        id: 'info',
        title: 'Information',
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
    ],
    activeTabId: params.tabId ?? 'info',
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
  };
</script>

<View>
  <ViewContent>
    {#if params.tabId === $view.tabs[0].id}
      <Card tabId={$view.tabs[0].id}>
        <CardTabHeader />
        <CardContent>
          <Typography>Info about form components</Typography>
        </CardContent>
      </Card>
    {:else if params.tabId === $view.tabs[1].id}
      <Card tabId={$view.tabs[1].id}>
        <CardTabHeader />
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
            onChange={(val) => (values.checkbox5 = val)}
          />
        </CardContent>
      </Card>
    {:else if params.tabId === $view.tabs[2].id}
      <Card tabId={$view.tabs[2].id}>
        <CardTabHeader />
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
            onChange={(val) => (values.inlineSelect5 = val)}
          />
        </CardContent>
      </Card>
    {/if}
  </ViewContent>
</View>
