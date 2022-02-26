<script lang="ts">
  import MdCrop169 from 'svelte-icons/md/MdCrop169.svelte';
  import MdExpandLess from 'svelte-icons/md/MdExpandLess.svelte';
  import MdHome from 'svelte-icons/md/MdHome.svelte';
  import MdList from 'svelte-icons/md/MdList.svelte';
  import MdSettings from 'svelte-icons/md/MdSettings.svelte';
  import MdTab from 'svelte-icons/md/MdTab.svelte';
  import MdTextFields from 'svelte-icons/md/MdTextFields.svelte';
  import MdTextFormat from 'svelte-icons/md/MdTextFormat.svelte';
  import { push } from 'svelte-spa-router';
  import ListItem from '../lib/components/list/ListItem.svelte';
  import NavGroup from '../lib/components/nav/NavGroup.svelte';
  import { updateView } from '../lib/stores/view';
  import { shortcutFromIndex } from '../lib/utils/shortcutFromIndex';

  type MenuItem = {
    id: string;
    text: string;
    route: string;
    icon: any | null;
  };
  const menuItems: MenuItem[] = [
    { id: 'home', text: 'Home', route: '/home', icon: MdHome },
    { id: 'lists', text: 'Lists', route: '/lists', icon: MdList },
    { id: 'drawer', text: 'Drawer', route: '/drawer', icon: MdExpandLess },
    { id: 'tabs', text: 'Tabs', route: '/tabs', icon: MdTab },
    { id: 'typography', text: 'Typography', route: '/typography', icon: MdTextFields },
    { id: 'buttons', text: 'Buttons', route: '/buttons', icon: MdCrop169 },
    { id: 'forms', text: 'Forms', route: '/forms', icon: MdTextFormat },
    { id: 'settings', text: 'Settings', route: '/settings', icon: MdSettings },
  ];
</script>

<NavGroup groupId="app-menu">
  <div class="header">OnyxUI Demo</div>
  <div class="scroller" data-nav-scroller>
    {#each menuItems as item, i}
      <ListItem
        icon={item.icon}
        primaryText={item.text}
        navi={{
          itemId: item.id,
          shortcutKey: shortcutFromIndex(i),
          onSelect: () => {
            if (location.hash.startsWith(`#${item.route}`)) {
              updateView({ viewing: 'content' });
              return;
            }
            push(item.route);
          },
        }}
      />
    {/each}
  </div>
</NavGroup>

<style>
  :global([data-nav-group-id='app-menu']) {
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
