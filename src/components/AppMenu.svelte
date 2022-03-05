<script lang="ts">
  import MdContentCopy from 'svelte-icons/md/MdContentCopy.svelte';
  import MdCrop169 from 'svelte-icons/md/MdCrop169.svelte';
  import MdExpandLess from 'svelte-icons/md/MdExpandLess.svelte';
  import MdHome from 'svelte-icons/md/MdHome.svelte';
  import MdList from 'svelte-icons/md/MdList.svelte';
  import MdSettings from 'svelte-icons/md/MdSettings.svelte';
  import MdTextFields from 'svelte-icons/md/MdTextFields.svelte';
  import MdTextFormat from 'svelte-icons/md/MdTextFormat.svelte';
  import { push } from 'svelte-spa-router';
  import ListItem from '../lib/components/list/ListItem.svelte';
  import NavGroup from '../lib/components/nav/NavGroup.svelte';
  import { ViewState } from '../lib/enums';
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
    { id: 'lists', text: 'Lists', route: '/lists/info', icon: MdList },
    { id: 'modal', text: 'Modals', route: '/modals/info', icon: MdExpandLess },
    { id: 'cards', text: 'Cards', route: '/cards/info', icon: MdContentCopy },
    { id: 'typography', text: 'Typography', route: '/typography/info', icon: MdTextFields },
    { id: 'buttons', text: 'Buttons', route: '/buttons/info', icon: MdCrop169 },
    { id: 'forms', text: 'Forms', route: '/forms/info', icon: MdTextFormat },
    { id: 'settings', text: 'Settings', route: '/settings/display', icon: MdSettings },
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
              updateView({ viewing: ViewState.Content });
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
    border-radius: var(--radius) var(--radius) 0 0;
    background-color: var(--card-color);
    color: var(--text-color);
    height: calc(100vh - 15px);
    display: flex;
    flex-direction: column;
    padding-bottom: 25px;
    margin-bottom: -15px;
  }
  .header {
    padding: 5px;
    font-weight: var(--bold-font-weight);
    color: var(--accent-color);
    text-align: center;
  }
  .scroller {
    overflow-y: auto;
    flex: 1;
  }
</style>
