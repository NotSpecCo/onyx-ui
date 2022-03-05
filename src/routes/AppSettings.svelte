<script lang="ts">
  import { onMount } from 'svelte';
  import { replace } from 'svelte-spa-router';
  import Card from '../lib/components/card/Card.svelte';
  import CardContent from '../lib/components/card/CardContent.svelte';
  import CardHeader from '../lib/components/card/CardHeader.svelte';
  import ColorPickerRow from '../lib/components/form/ColorPickerRow.svelte';
  import NumericRangeRow from '../lib/components/form/NumericRangeRow.svelte';
  import SelectRow from '../lib/components/form/SelectRow.svelte';
  import ToggleRow from '../lib/components/form/ToggleRow.svelte';
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

    if (key === 'themeId') {
      const theme = themes.find((a) => a.id === $settings.themeId) ?? themes[0];

      settings.update({
        accentColorH: theme.values.accentColorH,
        accentColorS: theme.values.accentColorS,
        accentColorL: theme.values.accentColorL,
        cardColorH: theme.values.cardColorH,
        cardColorS: theme.values.cardColorS,
        cardColorL: theme.values.cardColorL,
        textColorH: theme.values.textColorH,
        textColorS: theme.values.textColorS,
        textColorL: theme.values.textColorL,
        focusColorA: theme.values.focusColorA,
        dividerColorA: theme.values.dividerColorA,
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
          <ListHeader title="Shortcut Keys" />
          <ToggleRow
            label="Enable"
            value={$settings.enableShortcutKeys}
            onChange={(val) => handleChange('enableShortcutKeys', val)}
          />
          <SelectRow
            label="Position"
            value={$settings.shortcutKeyLocation}
            options={[
              { id: 'left', label: 'Left' },
              { id: 'right', label: 'Right' },
              { id: 'hidden', label: 'Hidden' },
            ]}
            onChange={(val) => handleChange('shortcutKeyLocation', val)}
          />
          <SelectRow
            label="Color"
            value={$settings.shortcutKeyColor}
            options={[
              { id: 'primary', label: 'Primary' },
              { id: 'secondary', label: 'Secondary' },
              { id: 'accent', label: 'Accent' },
            ]}
            onChange={(val) => handleChange('shortcutKeyColor', val)}
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
            value={$settings.themeId}
            options={[
              { id: 'light', label: 'Light' },
              { id: 'dim', label: 'Dim' },
              { id: 'dark', label: 'Dark' },
            ]}
            onChange={(val) => handleChange('themeId', val)}
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
          <NumericRangeRow
            label="Divider Strength"
            value={$settings.dividerColorA}
            valueLabel="%"
            min={0}
            max={100}
            onChange={(val) => handleChange('dividerColorA', val)}
          />
        </CardContent>
      </Card>
    {:else if params.cardId === $view.cards[2].id}
      <Card cardId={$view.cards[2].id}>
        <CardHeader />
        <CardContent>
          <ToggleRow
            label="Show Hint Text"
            value={$settings.showHelpText}
            onChange={(val) => handleChange('showHelpText', val)}
          />
        </CardContent>
      </Card>
    {/if}
  </ViewContent>
</View>
