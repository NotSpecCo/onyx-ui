<script lang="ts">
  import { replace } from 'svelte-spa-router';
  import Card from '../lib/components/card/Card.svelte';
  import CardContent from '../lib/components/card/CardContent.svelte';
  import CardTabHeader from '../lib/components/card/CardTabHeader.svelte';
  import CheckboxRow from '../lib/components/form/CheckboxRow.svelte';
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
    ],
    activeTabId: params.tabId ?? 'info',
  });

  let values = {
    checkbox1: true,
    checkbox2: false,
    checkbox3: false,
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
        </CardContent>
      </Card>
    {/if}
  </ViewContent>
</View>
