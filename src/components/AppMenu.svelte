<script lang="ts">
  import { onDestroy, onMount, setContext } from 'svelte';
  import MdCrop169 from 'svelte-icons/md/MdCrop169.svelte';
  import MdExpandLess from 'svelte-icons/md/MdExpandLess.svelte';
  import MdHome from 'svelte-icons/md/MdHome.svelte';
  import MdList from 'svelte-icons/md/MdList.svelte';
  import MdSettings from 'svelte-icons/md/MdSettings.svelte';
  import MdTab from 'svelte-icons/md/MdTab.svelte';
  import MdTextFields from 'svelte-icons/md/MdTextFields.svelte';
  import MdTextFormat from 'svelte-icons/md/MdTextFormat.svelte';
  import { push } from 'svelte-spa-router';
  import { navigator } from '../lib/actions/navigator';
  import ListItem from '../lib/components/list/ListItem.svelte';
  import { activateGroup, deactivateGroup } from '../lib/stores/navigator';
  import { shortcutFromIndex } from '../lib/utils/shortcutFromIndex';

  const NAV_GROUP = Symbol();
  setContext('nav-group', NAV_GROUP);

  onMount(() => activateGroup(NAV_GROUP));
  onDestroy(() => deactivateGroup(NAV_GROUP));

  type MenuItem = {
    id: string;
    text: string;
    route: string;
    icon: any | null;
  };
  const menuItems: MenuItem[] = [
    { id: 'home', text: 'Home', route: '/', icon: MdHome },
    { id: 'lists', text: 'Lists', route: '/lists', icon: MdList },
    { id: 'drawer', text: 'Drawer', route: '/drawer', icon: MdExpandLess },
    { id: 'tabs', text: 'Tabs', route: '/tabs', icon: MdTab },
    { id: 'typography', text: 'Typography', route: '/typography', icon: MdTextFields },
    { id: 'buttons', text: 'Buttons', route: '/buttons', icon: MdCrop169 },
    { id: 'forms', text: 'Forms', route: '/forms', icon: MdTextFormat },
    { id: 'settings', text: 'Settings', route: '/settings', icon: MdSettings },
  ];
</script>

<div class="root" use:navigator={{ groupId: NAV_GROUP }}>
  <div class="header">OnyxUI Demo</div>
  <div class="scroller" data-nav-scroller>
    {#each menuItems as item, i}
      <ListItem
        icon={item.icon}
        primaryText={item.text}
        navi={{
          itemId: item.id,
          shortcutKey: shortcutFromIndex(i),
          onSelect: () => push(item.route),
        }}
      />
    {/each}
  </div>
</div>

<style>
  .root {
    max-height: calc(100vh - 30px);
    display: flex;
    flex-direction: column;
  }
  .header {
    padding: 5px;
    font-weight: 600;
    color: var(--accent-text-color);
  }
  .scroller {
    overflow-y: auto;
    flex: 1;
  }
</style>
