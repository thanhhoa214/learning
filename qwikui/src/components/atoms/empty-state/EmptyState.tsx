// @ts-ignore
import emptySvg from '~/assets/images/svg/empty.svg?svg';

import {
  component$,
  Slot,
} from '@builder.io/qwik';

export const EmptyState = component$(({ size = 'small' }: { size?: 'small' | 'medium' }) => {
  return (
    <section class="text-center text-disable">
      <img src={emptySvg} width={size === 'small' ? 160 : 200} class="mx-auto aspect-video" />
      <strong class={`mb-2 ${size === 'small' ? 'text-heading-5' : 'text-heading-4'}`}>
        No results found!
      </strong>
      <p class={size === 'small' ? 'text-body-2' : 'text-body-1'}>
        Try again with different search filters.
      </p>
      <footer class="mt-6">
        <Slot />
      </footer>
    </section>
  );
});
