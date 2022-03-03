<script lang="ts">
  import { onMount } from 'svelte';
  import { replace } from 'svelte-spa-router';
  import Card from '../lib/components/card/Card.svelte';
  import CardContent from '../lib/components/card/CardContent.svelte';
  import CardHeader from '../lib/components/card/CardHeader.svelte';
  import CheckboxRow from '../lib/components/form/CheckboxRow.svelte';
  import InlineSelectRow from '../lib/components/form/InlineSelectRow.svelte';
  import NumericRangeRow from '../lib/components/form/NumericRangeRow.svelte';
  import ListHeader from '../lib/components/list/ListHeader.svelte';
  import View from '../lib/components/view/View.svelte';
  import ViewContent from '../lib/components/view/ViewContent.svelte';
  import { Animations, DataStatus, Density, TextSize, TextWeight, Theme } from '../lib/enums';
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
      {
        id: 'misc',
        title: 'Misc',
        onSelect: () => replace(`/settings/misc`),
      },
    ],
    activeCardId: params.cardId ?? 'display',
  });

  onMount(async () => {
    updateView({ dataStatus: DataStatus.Loaded });
  });

  function handleChange(key: keyof Settings, val: any) {
    settings.updateOne(key, val);

    if (key === 'theme') {
      const theme = themes.find((a) => a.id === $settings.theme) ?? themes[0];

      settings.update({
        cardColorH: theme.values.cardColorH,
        cardColorS: theme.values.cardColorS,
        cardColorL: theme.values.cardColorL,
        accentColorH: theme.values.accentColorH,
        accentColorS: theme.values.accentColorS,
        accentColorL: theme.values.accentColorL,
        textColorH: theme.values.textColorH,
        textColorS: theme.values.textColorS,
        textColorL: theme.values.textColorL,
        drawerColorH: theme.values.drawerColorH,
        drawerColorS: theme.values.drawerColorS,
        drawerColorL: theme.values.drawerColorL,
        drawerTextColorH: theme.values.drawerTextColorH,
        drawerTextColorS: theme.values.drawerTextColorS,
        drawerTextColorL: theme.values.drawerTextColorL,
        focusColorA: theme.values.focusColorA,
      });
    }
  }
</script>

<View>
  <ViewContent>
    {#if params.cardId === $view.cards[0].id}
      <Card cardId={$view.cards[0].id}>
        <CardHeader />
        <CardContent>
          <ListHeader title="Global" />
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
            label="Text Weight"
            value={$settings.textWeight}
            options={[
              { id: TextWeight.Light, label: 'Light' },
              { id: TextWeight.Medium, label: 'Medium' },
              { id: TextWeight.Heavy, label: 'Heavy' },
            ]}
            onChange={(val) => handleChange('textWeight', val)}
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
          <ListHeader title="Cards" />
          <NumericRangeRow
            label="Border Radius"
            value={$settings.borderRadius}
            valueLabel="px"
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
          <ListHeader title="General" />
          <InlineSelectRow
            label="Theme"
            value={$settings.theme}
            options={[
              { id: Theme.Light, label: 'Light' },
              { id: Theme.Warm, label: 'Warm' },
              // { id: Theme.Dim, label: 'Dim' },
              { id: Theme.Dark, label: 'Dark' },
              // { id: Theme.Darkest, label: 'Darkest' },
            ]}
            onChange={(val) => handleChange('theme', val)}
          />
          <ListHeader title="Accent Color" />
          <NumericRangeRow
            label="Hue"
            value={$settings.accentColorH}
            valueLabel=""
            min={0}
            max={360}
            onChange={(val) => handleChange('accentColorH', val)}
          />
          <NumericRangeRow
            label="Saturation"
            value={$settings.accentColorS}
            valueLabel="%"
            min={0}
            max={100}
            onChange={(val) => handleChange('accentColorS', val)}
          />
          <NumericRangeRow
            label="Lightness"
            value={$settings.accentColorL}
            valueLabel="%"
            min={0}
            max={100}
            onChange={(val) => handleChange('accentColorL', val)}
          />
          <ListHeader title="Card Color" />
          <NumericRangeRow
            label="Hue"
            value={$settings.cardColorH}
            valueLabel=""
            min={0}
            max={360}
            onChange={(val) => handleChange('cardColorH', val)}
          />
          <NumericRangeRow
            label="Saturation"
            value={$settings.cardColorS}
            valueLabel="%"
            min={0}
            max={100}
            onChange={(val) => handleChange('cardColorS', val)}
          />
          <NumericRangeRow
            label="Lightness"
            value={$settings.cardColorL}
            valueLabel="%"
            min={0}
            max={100}
            onChange={(val) => handleChange('cardColorL', val)}
          />
          <ListHeader title="Card Text Color" />
          <NumericRangeRow
            label="Hue"
            value={$settings.textColorH}
            valueLabel=""
            min={0}
            max={360}
            onChange={(val) => handleChange('textColorH', val)}
          />
          <NumericRangeRow
            label="Saturation"
            value={$settings.textColorS}
            valueLabel="%"
            min={0}
            max={100}
            onChange={(val) => handleChange('textColorS', val)}
          />
          <NumericRangeRow
            label="Lightness"
            value={$settings.textColorL}
            valueLabel="%"
            min={0}
            max={100}
            onChange={(val) => handleChange('textColorL', val)}
          />
          <ListHeader title="Focus Color" />
          <NumericRangeRow
            label="Alpha"
            value={$settings.focusColorA}
            valueLabel="%"
            min={0}
            max={100}
            onChange={(val) => handleChange('focusColorA', val)}
          />
          <ListHeader title="Drawer Color" />
          <NumericRangeRow
            label="Hue"
            value={$settings.drawerColorH}
            valueLabel=""
            min={0}
            max={360}
            onChange={(val) => handleChange('drawerColorH', val)}
          />
          <NumericRangeRow
            label="Saturation"
            value={$settings.drawerColorS}
            valueLabel="%"
            min={0}
            max={100}
            onChange={(val) => handleChange('drawerColorS', val)}
          />
          <NumericRangeRow
            label="Lightness"
            value={$settings.drawerColorL}
            valueLabel="%"
            min={0}
            max={100}
            onChange={(val) => handleChange('drawerColorL', val)}
          />
          <ListHeader title="Drawer Text Color" />
          <NumericRangeRow
            label="Hue"
            value={$settings.drawerTextColorH}
            valueLabel=""
            min={0}
            max={360}
            onChange={(val) => handleChange('drawerTextColorH', val)}
          />
          <NumericRangeRow
            label="Saturation"
            value={$settings.drawerTextColorS}
            valueLabel="%"
            min={0}
            max={100}
            onChange={(val) => handleChange('drawerTextColorS', val)}
          />
          <NumericRangeRow
            label="Lightness"
            value={$settings.drawerTextColorL}
            valueLabel="%"
            min={0}
            max={100}
            onChange={(val) => handleChange('drawerTextColorL', val)}
          />
        </CardContent>
      </Card>
    {:else if params.cardId === $view.cards[2].id}
      <Card cardId={$view.cards[2].id}>
        <CardHeader />
        <CardContent>
          <CheckboxRow
            label="Show Hint Text"
            checked={$settings.showHintText}
            onChange={(val) => handleChange('showHintText', val)}
          />
        </CardContent>
      </Card>
    {/if}
  </ViewContent>
</View>
