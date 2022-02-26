<script lang="ts">
  import { replace } from 'svelte-spa-router';
  import Card from '../lib/components/card/Card.svelte';
  import CardContent from '../lib/components/card/CardContent.svelte';
  import CardTabHeader from '../lib/components/card/CardTabHeader.svelte';
  import ListItem from '../lib/components/list/ListItem.svelte';
  import Typography from '../lib/components/Typography.svelte';
  import View from '../lib/components/view/View.svelte';
  import ViewContent from '../lib/components/view/ViewContent.svelte';
  import { registerView, view } from '../lib/stores/view';
  import { shortcutFromIndex } from '../lib/utils/shortcutFromIndex';

  export let params: { tabId: string };

  registerView({
    tabs: [
      {
        id: 'info',
        title: 'Information',
        onSelect: () => replace(`/tabs/info`),
      },
      {
        id: 'list',
        title: 'List Tab',
        onSelect: () => replace(`/tabs/list`),
      },
      {
        id: 'text',
        title: 'Text Tab',
        onSelect: () => replace(`/tabs/text`),
      },
      {
        id: 'empty',
        title: 'Empty Tab',
        onSelect: () => replace(`/tabs/empty`),
      },
    ],
    activeTabId: params.tabId ?? 'info',
    drawerItems: [
      {
        id: '1',
        primaryText: 'Drawer action 1',
        onSelect: () => console.log('home select drawer 1'),
      },
      {
        id: '2',
        primaryText: 'Drawer action 2',
        onSelect: () => console.log('home select drawer 2'),
      },
      {
        id: '3',
        primaryText: 'Drawer action 3',
        onSelect: () => console.log('home select drawer 3'),
      },
    ],
  });
</script>

<View>
  <ViewContent>
    {#if params.tabId === $view.tabs[0].id}
      <Card tabId={$view.tabs[0].id}>
        <CardTabHeader />
        <CardContent>
          <Typography>
            Tabs allow you to have multiple views in a screen.{' '}
            <Typography display="inline" color="accent" padding="none">Left</Typography>{' '}
            and{' '}
            <Typography display="inline" color="accent" padding="none">Right</Typography>{' '}
            d-pad buttons are used to switch between tabs.
          </Typography>
          <Typography>
            Pressing <Typography display="inline" color="accent" padding="none">SoftLeft</Typography
            > usually brings up the app menu. However, in a view that has tabs, it will first bring up
            a list of available tabs to switch to. Pressing <Typography
              display="inline"
              color="accent"
              padding="none">SoftLeft</Typography
            > again will then bring up the app menu.
          </Typography>
        </CardContent>
      </Card>
    {:else if params.tabId === $view.tabs[1].id}
      <Card tabId={$view.tabs[1].id}>
        <CardTabHeader />
        <CardContent>
          {#each new Array(10).fill(null) as item, i}
            <ListItem
              primaryText={`Primary Text ${i + 1}`}
              secondaryText="Secondary text"
              navi={{
                itemId: `${i + 1}`,
                shortcutKey: shortcutFromIndex(i),
              }}
            />
          {/each}
        </CardContent>
      </Card>
    {:else if params.tabId === $view.tabs[2].id}
      <Card tabId={$view.tabs[2].id}>
        <CardTabHeader />
        <CardContent>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent facilisis fringilla
            ligula, vel porta sem rhoncus id. Integer ac dolor facilisis, aliquam tortor vitae,
            volutpat augue. Nulla urna sem, ullamcorper ac purus nec, gravida dapibus enim.
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
            egestas. Sed feugiat ultricies mauris vel rhoncus. Donec at nunc erat. Nulla auctor nibh
            quis justo fermentum tempor. Sed viverra risus ut elit scelerisque blandit interdum
            auctor ligula. Maecenas id est eleifend, fringilla arcu ut, dapibus purus. Maecenas
            accumsan, turpis in efficitur rhoncus, leo nibh lobortis turpis, nec lacinia augue
            libero vitae sapien. Sed ultrices velit eros, non vulputate purus consectetur at.
            Quisque elementum orci nisl, a mattis nunc porta sit amet. Aenean egestas, nisl nec
            ornare lacinia, ex odio venenatis dui, maximus finibus lectus lorem eget purus. Orci
            varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Curabitur id nunc eget libero mollis vestibulum. Sed eu magna et risus faucibus
            consequat quis vel erat.
          </Typography>
          <Typography>
            Nam consequat tincidunt porttitor. Integer rhoncus, elit id dapibus sagittis, ante
            mauris vulputate arcu, quis pulvinar ante neque eget libero. Aliquam erat volutpat.
            Pellentesque pretium leo vel scelerisque ornare. Phasellus sapien sapien, condimentum ac
            maximus eget, cursus eget metus. Vestibulum ante ipsum primis in faucibus orci luctus et
            ultrices posuere cubilia curae; Nunc suscipit ipsum odio, sit amet malesuada risus
            sollicitudin quis. Proin sed nibh sed neque luctus posuere quis id erat. Aliquam leo
            lorem, tempus nec aliquet sit amet, lobortis ultricies lacus. Aliquam varius, quam id
            feugiat tincidunt, lorem justo volutpat risus, a faucibus augue elit vitae nisl.
          </Typography>
        </CardContent>
      </Card>
    {:else if params.tabId === $view.tabs[3].id}
      <Card tabId={$view.tabs[3].id}>
        <CardTabHeader />
        <CardContent />
      </Card>
    {/if}
  </ViewContent>
</View>
