<script lang="ts">
  import { replace } from 'svelte-spa-router';
  import AppMenu from '../components/AppMenu.svelte';
  import Card from '../onyx/components/card/Card.svelte';
  import CardContent from '../onyx/components/card/CardContent.svelte';
  import CardTabHeader from '../onyx/components/card/CardTabHeader.svelte';
  import ListItem from '../onyx/components/list/ListItem.svelte';
  import Typography from '../onyx/components/Typography.svelte';
  import View from '../onyx/components/view/View.svelte';
  import ViewContent from '../onyx/components/view/ViewContent.svelte';
  import { shortcutFromIndex } from '../onyx/utils/shortcutFromIndex';

  export let params: { tabId: string };

  const tabs = [
    { id: 'info', title: 'Information' },
    { id: 'list', title: 'List Tab' },
    { id: 'tab', title: 'Text Tab' },
    { id: 'empty', title: 'Empty Tab' },
  ];
</script>

<View {tabs} activeTab={params.tabId || tabs[0].id} onTabChange={(tab) => replace(`/tabs/${tab}`)}>
  <AppMenu slot="appmenu" />
  <ViewContent>
    {#if params.tabId === tabs[0].id}
      <Card tabId={tabs[0].id}>
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
    {:else if params.tabId === tabs[1].id}
      <Card tabId={tabs[1].id}>
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
    {:else if params.tabId === tabs[2].id}
      <Card tabId={tabs[2].id}>
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
    {:else if params.tabId === tabs[3].id}
      <Card tabId={tabs[3].id}>
        <CardTabHeader />
        <CardContent />
      </Card>
    {/if}
  </ViewContent>
</View>
