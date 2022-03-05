<script lang="ts">
  import { dpad } from '../../actions/dpad';
  import { OpenState } from '../../enums';
  import { menu } from '../../stores/menu';
  import { shortcutFromIndex } from '../../utils/shortcutFromIndex';
  import NavGroup from '../nav/NavGroup.svelte';
  import Typography from '../Typography.svelte';
  import ContextMenuItem from './ContextMenuItem.svelte';

  let working: string | null = null;
</script>

<div class="root">
  <div class="scrim" class:open={$menu.state >= OpenState.Opening} />
  <div
    class="card"
    class:open={$menu.state >= OpenState.Opening}
    use:dpad={{
      onSoftLeft: () => true,
      onSoftRight: () => {
        menu.close();
        return true;
      },
      onBackspace: () => {
        menu.close();
        return true;
      },
      priority: 'high',
    }}
  >
    <div class="title">{$menu.title}</div>
    {#if $menu.body}
      <Typography>{$menu.body}</Typography>
    {/if}
    <NavGroup groupId="contextMenu">
      {#each $menu.items as item, i}
        <ContextMenuItem
          icon={item.icon}
          imageUrl={item.imageUrl}
          text={item.label}
          workingText={item.workingLabel}
          working={working === `menuItem${i + 1}`}
          navi={{
            itemId: `menuItem${i + 1}`,
            shortcutKey: shortcutFromIndex(i),
            onSelect: async () => {
              if (working) return;
              working = `menuItem${i + 1}`;
              await item.onSelect();
              working = null;
            },
          }}
        />
      {/each}
    </NavGroup>
    <div class="footer">
      <div />
      <div>Select</div>
      <div>Close</div>
    </div>
  </div>
</div>

<style>
  .root {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9;
  }
  .scrim {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity var(--animation-speed);
    opacity: 0;
  }
  .scrim.open {
    opacity: 1;
  }

  .card {
    border: 1px solid var(--card-border-color);
    box-shadow: 0 0 5px hsla(0, 0%, 0%, 20%);
    background-color: var(--card-color);
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: var(--radius) var(--radius) 0 0;
    overflow: hidden;
    transition: transform var(--animation-speed);
    transform: translateY(300px);
  }
  .card.open {
    transform: translateY(0);
  }

  .title {
    white-space: nowrap;
    overflow: hidden;
    padding: 5px 3px;
    font-weight: var(--bold-font-weight);
    text-align: center;
  }
  .footer {
    display: flex;
    padding: 5px;
    text-align: center;
    font-weight: var(--bold-font-weight);
  }
  .footer > div {
    flex: 1;
  }
  .footer > div:first-child {
    text-align: left;
  }
  .footer > div:last-child {
    text-align: right;
  }
</style>
