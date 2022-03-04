<script lang="ts">
  import { onMount } from 'svelte';
  import { replace } from 'svelte-spa-router';
  import Card from '../lib/components/card/Card.svelte';
  import CardContent from '../lib/components/card/CardContent.svelte';
  import CardHeader from '../lib/components/card/CardHeader.svelte';
  import CheckboxRow from '../lib/components/form/CheckboxRow.svelte';
  import ColorPickerRow from '../lib/components/form/ColorPickerRow.svelte';
  import NumericRangeRow from '../lib/components/form/NumericRangeRow.svelte';
  import SelectRow from '../lib/components/form/SelectRow.svelte';
  import ListHeader from '../lib/components/list/ListHeader.svelte';
  import View from '../lib/components/view/View.svelte';
  import ViewContent from '../lib/components/view/ViewContent.svelte';
  import { Animations, DataStatus, Density, TextSize, TextWeight } from '../lib/enums';
  import { registerView, updateView, view } from '../lib/stores/view';
  import type { Settings } from '../models';
  import { settings } from '../stores/settings';
  import { themes } from '../themes';

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
        accentColorH: theme.values.accentColorH,
        accentColorS: theme.values.accentColorS,
        accentColorL: theme.values.accentColorL,
        cardColorH: theme.values.cardColorH,
        cardColorS: theme.values.cardColorS,
        cardColorL: theme.values.cardColorL,
        textColorH: theme.values.textColorH,
        textColorS: theme.values.textColorS,
        focusColorA: theme.values.focusColorA,
        textColorL: theme.values.textColorL,
        drawerColorH: theme.values.drawerColorH,
        drawerColorS: theme.values.drawerColorS,
        drawerColorL: theme.values.drawerColorL,
        drawerTextColorH: theme.values.drawerTextColorH,
        drawerTextColorS: theme.values.drawerTextColorS,
        drawerTextColorL: theme.values.drawerTextColorL,
        drawerFocusColorA: theme.values.drawerFocusColorA,
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
          <SelectRow
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
          <SelectRow
            label="Text Weight"
            value={$settings.textWeight}
            options={[
              { id: TextWeight.Light, label: 'Light' },
              { id: TextWeight.Medium, label: 'Medium' },
              { id: TextWeight.Heavy, label: 'Heavy' },
            ]}
            onChange={(val) => handleChange('textWeight', val)}
          />
          <SelectRow
            label="Display Density"
            value={$settings.displayDensity}
            options={[
              { id: Density.Compact, label: 'Compact' },
              { id: Density.Normal, label: 'Normal' },
              { id: Density.Spacious, label: 'Spacious' },
            ]}
            onChange={(val) => handleChange('displayDensity', val)}
          />
          <SelectRow
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
          <SelectRow
            label="Theme"
            value={$settings.theme}
            options={[
              { id: 'light', label: 'Light' },
              { id: 'dim', label: 'Dim' },
              { id: 'dark', label: 'Dark' },
            ]}
            onChange={(val) => handleChange('theme', val)}
          />

          <ColorPickerRow
            label="Accent Color"
            value={{
              h: $settings.accentColorH,
              s: $settings.accentColorS,
              l: $settings.accentColorL,
            }}
            onChange={(val) =>
              settings.update({
                accentColorH: val.h,
                accentColorS: val.s,
                accentColorL: val.l,
              })}
          />
          <ListHeader title="Cards" />
          <ColorPickerRow
            label="Background Color"
            value={{
              h: $settings.cardColorH,
              s: $settings.cardColorS,
              l: $settings.cardColorL,
            }}
            onChange={(val) =>
              settings.update({
                cardColorH: val.h,
                cardColorS: val.s,
                cardColorL: val.l,
              })}
          />
          <ColorPickerRow
            label="Text Color"
            value={{
              h: $settings.textColorH,
              s: $settings.textColorS,
              l: $settings.textColorL,
            }}
            onChange={(val) =>
              settings.update({
                textColorH: val.h,
                textColorS: val.s,
                textColorL: val.l,
              })}
          />
          <NumericRangeRow
            label="Focus Strength"
            value={$settings.focusColorA}
            valueLabel="%"
            min={0}
            max={100}
            onChange={(val) => handleChange('focusColorA', val)}
          />
          <ListHeader title="Drawer" />
          <ColorPickerRow
            label="Background Color"
            value={{
              h: $settings.drawerColorH,
              s: $settings.drawerColorS,
              l: $settings.drawerColorL,
            }}
            onChange={(val) =>
              settings.update({
                drawerColorH: val.h,
                drawerColorS: val.s,
                drawerColorL: val.l,
              })}
          />
          <ColorPickerRow
            label="Text Color"
            value={{
              h: $settings.drawerTextColorH,
              s: $settings.drawerTextColorS,
              l: $settings.drawerTextColorL,
            }}
            onChange={(val) =>
              settings.update({
                drawerTextColorH: val.h,
                drawerTextColorS: val.s,
                drawerTextColorL: val.l,
              })}
          />
          <NumericRangeRow
            label="Focus Strength"
            value={$settings.drawerFocusColorA}
            valueLabel="%"
            min={0}
            max={100}
            onChange={(val) => handleChange('drawerFocusColorA', val)}
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
