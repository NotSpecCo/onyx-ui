<script lang="ts">
  import { replace } from 'svelte-spa-router';
  import Card from '../lib/components/card/Card.svelte';
  import CardContent from '../lib/components/card/CardContent.svelte';
  import CardTabHeader from '../lib/components/card/CardTabHeader.svelte';
  import View from '../lib/components/view/View.svelte';
  import ViewContent from '../lib/components/view/ViewContent.svelte';
  import { registerView, view } from '../lib/stores/view';

  export let params: { tabId: string };

  registerView({
    tabs: [
      {
        id: 'display',
        title: 'Display',
        onSelect: () => replace(`/settings/display`),
      },
      {
        id: 'theme',
        title: 'Theme',
        onSelect: () => replace(`/settings/theme`),
      },
    ],
    activeTabId: params.tabId ?? 'display',
  });
</script>

<View>
  <ViewContent>
    {#if params.tabId === $view.tabs[0].id}
      <Card tabId={$view.tabs[0].id}>
        <CardTabHeader />
        <CardContent>display</CardContent>
      </Card>
    {:else if params.tabId === $view.tabs[1].id}
      <Card tabId={$view.tabs[1].id}>
        <CardTabHeader />
        <CardContent>theme</CardContent>
      </Card>
    {/if}
  </ViewContent>
</View>
