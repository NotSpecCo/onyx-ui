<script lang="ts">
  import { onMount } from 'svelte';
  import MdContentCopy from 'svelte-icons/md/MdContentCopy.svelte';
  import MdCrop169 from 'svelte-icons/md/MdCrop169.svelte';
  import MdExitToApp from 'svelte-icons/md/MdExitToApp.svelte';
  import MdExpandLess from 'svelte-icons/md/MdExpandLess.svelte';
  import MdHome from 'svelte-icons/md/MdHome.svelte';
  import MdList from 'svelte-icons/md/MdList.svelte';
  import MdSettings from 'svelte-icons/md/MdSettings.svelte';
  import MdTextFields from 'svelte-icons/md/MdTextFields.svelte';
  import MdTextFormat from 'svelte-icons/md/MdTextFormat.svelte';
  import { ViewType } from '../enums';
  import Card from '../lib/components/card/Card.svelte';
  import ListItem from '../lib/components/list/ListItem.svelte';
  import View from '../lib/components/view/View.svelte';
  import { stack } from '../lib/stores/stack';
  import { shortcutFromIndex } from '../lib/utils/shortcutFromIndex';

  export let instance: any = {};

  type MenuItem = {
    id: string;
    text: string;
    icon: any | null;
  };
  const menuItems: MenuItem[] = [
    { id: ViewType.Home, text: 'Home', icon: MdHome },
    { id: ViewType.Settings, text: 'Settings', icon: MdSettings },

    { id: 'lists', text: 'Lists', icon: MdList },
    { id: 'contextMenus', text: 'Context Menus', icon: MdExpandLess },
    { id: 'cards', text: 'Cards', icon: MdContentCopy },
    { id: 'typography', text: 'Typography', icon: MdTextFields },
    { id: 'buttons', text: 'Buttons', icon: MdCrop169 },
    { id: 'forms', text: 'Forms', icon: MdTextFormat },
  ];

  onMount(() => console.log('app meu mount'));
</script>

<View {instance}>
  <Card>
    {#each menuItems as item, i}
      <ListItem
        icon={item.icon}
        primaryText={item.text}
        navi={{
          itemId: item.id,
          shortcutKey: shortcutFromIndex(i),
          onSelect: () => {
            stack.push(item.id);
          },
        }}
      />
    {/each}
    <!-- <Divider title="app" /> -->
    <ListItem
      icon={MdExitToApp}
      primaryText={'Exit App'}
      navi={{
        itemId: 'exit',
        onSelect: () => {
          window.close();
        },
      }}
    />
  </Card>
</View>
