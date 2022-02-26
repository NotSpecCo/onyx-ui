<script lang="ts">
  import { onMount } from 'svelte';
  import { replace } from 'svelte-spa-router';
  import Card from '../lib/components/card/Card.svelte';
  import CardContent from '../lib/components/card/CardContent.svelte';
  import CardHeader from '../lib/components/card/CardHeader.svelte';
  import InlineSelectRow from '../lib/components/form/InlineSelectRow.svelte';
  import InputRow from '../lib/components/form/InputRow.svelte';
  import NumericRangeRow from '../lib/components/form/NumericRangeRow.svelte';
  import View from '../lib/components/view/View.svelte';
  import ViewContent from '../lib/components/view/ViewContent.svelte';
  import { Animations, DataStatus, Density, TextSize, Theme } from '../lib/enums';
  import { registerView, updateView, view } from '../lib/stores/view';
  import { themes } from '../lib/themes';
  import type { Settings } from '../models';
  import { settings } from '../stores/settings';

  export let params: { cardId: string };

  registerView({
    cards: [
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
    activeCardId: params.cardId ?? 'display',
  });

  onMount(async () => {
    updateView({ dataStatus: DataStatus.Loaded });
  });

  function handleChange(key: keyof Settings, val: any) {
    settings.update(key, val);

    if (key === 'theme') {
      const theme = themes.find((a) => a.id === $settings.theme) ?? themes[0];
      settings.update('accentColor', theme.values.drawerAccentColor);
      settings.update('cardAccentColor', theme.values.cardAccentColor);
    }
  }
</script>

<View>
  <ViewContent>
    {#if params.cardId === $view.cards[0].id}
      <Card cardId={$view.cards[0].id}>
        <CardHeader />
        <CardContent>
          <InlineSelectRow
            label="Text Size"
            value={$settings.textSize}
            options={[
              { id: TextSize.Smallest, label: 'Smallest' },
              { id: TextSize.Small, label: 'Small' },
              { id: TextSize.Medium, label: 'Medium' },
              { id: TextSize.Large, label: 'Large' },
              { id: TextSize.Largest, label: 'Largest' },
            ]}
            onChange={(val) => handleChange('textSize', val)}
          />
          <InlineSelectRow
            label="Display Density"
            value={$settings.displayDensity}
            options={[
              { id: Density.Compact, label: 'Compact' },
              { id: Density.Normal, label: 'Normal' },
              { id: Density.Spacious, label: 'Spacious' },
            ]}
            onChange={(val) => handleChange('displayDensity', val)}
          />
          <InlineSelectRow
            label="Animations"
            value={$settings.animations}
            options={[
              { id: Animations.Instant, label: 'Instant' },
              { id: Animations.Fast, label: 'Fast' },
              { id: Animations.Normal, label: 'Normal' },
              { id: Animations.Slow, label: 'Slow' },
            ]}
            onChange={(val) => handleChange('animations', val)}
          />
          <NumericRangeRow
            label="Border Radius"
            value={$settings.borderRadius}
            min={0}
            max={32}
            onChange={(val) => handleChange('borderRadius', val)}
          />
        </CardContent>
      </Card>
    {:else if params.cardId === $view.cards[1].id}
      <Card cardId={$view.cards[1].id}>
        <CardHeader />
        <CardContent>
          <InlineSelectRow
            label="Theme"
            value={$settings.theme}
            options={[
              { id: Theme.Light, label: 'Light' },
              { id: Theme.Dark, label: 'Dark' },
            ]}
            onChange={(val) => handleChange('theme', val)}
          />
          <InputRow
            label="Accent Color"
            value={$settings.accentColor}
            placeholder="Enter text..."
            onChange={(val) => handleChange('accentColor', val)}
          />
          <InputRow
            label="Card Accent Color"
            value={$settings.cardAccentColor}
            placeholder="Enter text..."
            onChange={(val) => handleChange('cardAccentColor', val)}
          />
        </CardContent>
      </Card>
    {/if}
  </ViewContent>
</View>
