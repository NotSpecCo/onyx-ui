<script lang="ts">
  import { onMount } from 'svelte';
  import Card from '../lib/components/card/Card.svelte';
  import CardContent from '../lib/components/card/CardContent.svelte';
  import CardHeader from '../lib/components/card/CardHeader.svelte';
  import Typography from '../lib/components/Typography.svelte';
  import View from '../lib/components/view/View.svelte';
  import ViewContent from '../lib/components/view/ViewContent.svelte';
  import { DataStatus } from '../lib/enums';
  import { cards, updateView } from '../lib/stores/view';

  export let params: { cardId: string };

  cards.set({
    baseRoute: '/buttons/',
    activeCardId: params.cardId,
    items: [
      {
        id: 'info',
        title: 'Card 1',
      },
      {
        id: 'two',
        title: 'Card 2',
      },
      {
        id: 'three',
        title: 'Card 3',
      },
    ],
  });

  // registerView({
  //   cards: [
  //     {
  //       id: 'info',
  //       title: 'Card 1',
  //       onSelect: () => replace(`/buttons/info`),
  //     },
  //     {
  //       id: 'two',
  //       title: 'Card 2',
  //       onSelect: () => replace(`/buttons/two`),
  //     },
  //     {
  //       id: 'three',
  //       title: 'Card 3',
  //       onSelect: () => replace(`/buttons/three`),
  //     },
  //   ],
  //   activeCardId: params.cardId ?? 'info',
  // });

  onMount(async () => {
    updateView({ dataStatus: DataStatus.Loaded });
  });
</script>

<View>
  <ViewContent>
    {#if $cards.items[0].visible}
      <Card cardId={$cards.items[0].id}>
        <CardHeader />
        <CardContent>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent facilisis fringilla
            ligula, vel porta sem rhoncus id. Integer ac dolor facilisis, aliquam tortor vitae,
            volutpat augue. Nulla urna sem, ullamcorper ac purus nec, gravida dapibus enim.
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
            egestas. Sed feugiat ultricies mauris vel rhoncus. Donec at nunc erat. Nulla auctor nibh
            quis justo fermentum tempor. Sed viverra risus ut elit scelerisque blandit interdum
            auctor ligula. Maecenas id est eleifend, fringilla arcu ut, dapibus purus. Maecenas
            accumsan, turpis in efficitur rhoncus, leo nibh lobortis turpis, nec lacinia augue
            libero vitae sapien. Sed ultrices velit eros, non vulputate purus consectetur at.
            Quisque elementum orci nisl, a mattis nunc porta sit amet. Aenean egestas, nisl nec
            ornare lacinia, ex odio venenatis dui, maximus finibus lectus lorem eget purus. Orci
            varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Curabitur id nunc eget libero mollis vestibulum. Sed eu magna et risus faucibus
            consequat quis vel erat.
          </Typography>
        </CardContent>
      </Card>
    {/if}
    {#if $cards.items[1].visible}
      <Card cardId={$cards.items[1].id}>
        <CardHeader />
        <CardContent>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent facilisis fringilla
            ligula, vel porta sem rhoncus id. Integer ac dolor facilisis, aliquam tortor vitae,
            volutpat augue. Nulla urna sem, ullamcorper ac purus nec, gravida dapibus enim.
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
            egestas. Sed feugiat ultricies mauris vel rhoncus. Donec at nunc erat. Nulla auctor nibh
            quis justo fermentum tempor. Sed viverra risus ut elit scelerisque blandit interdum
            auctor ligula. Maecenas id est eleifend, fringilla arcu ut, dapibus purus. Maecenas
            accumsan, turpis in efficitur rhoncus, leo nibh lobortis turpis, nec lacinia augue
            libero vitae sapien. Sed ultrices velit eros, non vulputate purus consectetur at.
            Quisque elementum orci nisl, a mattis nunc porta sit amet. Aenean egestas, nisl nec
            ornare lacinia, ex odio venenatis dui, maximus finibus lectus lorem eget purus. Orci
            varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Curabitur id nunc eget libero mollis vestibulum. Sed eu magna et risus faucibus
            consequat quis vel erat.
          </Typography>
        </CardContent>
      </Card>
    {/if}
    {#if $cards.items[2].visible}
      <Card cardId={$cards.items[2].id}>
        <CardHeader />
        <CardContent>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent facilisis fringilla
            ligula, vel porta sem rhoncus id. Integer ac dolor facilisis, aliquam tortor vitae,
            volutpat augue. Nulla urna sem, ullamcorper ac purus nec, gravida dapibus enim.
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
            egestas. Sed feugiat ultricies mauris vel rhoncus. Donec at nunc erat. Nulla auctor nibh
            quis justo fermentum tempor. Sed viverra risus ut elit scelerisque blandit interdum
            auctor ligula. Maecenas id est eleifend, fringilla arcu ut, dapibus purus. Maecenas
            accumsan, turpis in efficitur rhoncus, leo nibh lobortis turpis, nec lacinia augue
            libero vitae sapien. Sed ultrices velit eros, non vulputate purus consectetur at.
            Quisque elementum orci nisl, a mattis nunc porta sit amet. Aenean egestas, nisl nec
            ornare lacinia, ex odio venenatis dui, maximus finibus lectus lorem eget purus. Orci
            varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Curabitur id nunc eget libero mollis vestibulum. Sed eu magna et risus faucibus
            consequat quis vel erat.
          </Typography>
        </CardContent>
      </Card>
    {/if}
  </ViewContent>
</View>
