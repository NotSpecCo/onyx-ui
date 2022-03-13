<script lang="ts">
  import { keys } from '../../actions/keys';
  import { MenuOpenState } from '../../enums';
  import { app } from '../../stores/app';
  import { shortcutFromIndex } from '../../utils/shortcutFromIndex';
  import NavGroup from '../nav/NavGroup.svelte';
  import Typography from '../Typography.svelte';
  import ContextMenuItem from './ContextMenuItem.svelte';

  let working: string | null = null;
</script>

<div class="root">
  <div class="scrim" class:open={$app.contextMenu.state === MenuOpenState.Open} />
  <div
    class="card"
    class:open={$app.contextMenu.state === MenuOpenState.Open}
    use:keys={{
      onSoftLeft: () => true,
      onSoftRight: () => {
        app.closeContextMenu();
        return true;
      },
      onBackspace: () => {
        app.closeContextMenu();
        return true;
      },
      priority: 'high',
    }}
  >
    <div class="title">{$app.contextMenu.title}</div>
    {#if $app.contextMenu.body}
      <Typography>{$app.contextMenu.body}</Typography>
    {/if}
    <NavGroup groupId="contextMenu">
      {#each $app.contextMenu.items as item, i}
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
    box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.2);
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
    text-overflow: ellipsis;
    padding: 5px;
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
