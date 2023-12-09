import Hero from '~/components/widgets/Hero';

import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <>
      <Hero />
      {/* <Features />
      <FAQs />
      <Stats />
      <CallToAction /> */}
    </>
  );
});

export const head: DocumentHead = {
  title: 'Qwind — Free template for starts a website using Qwik + Tailwind CSS',
  meta: [
    {
      name: 'description',
      content:
        'Qwind is a free and ready to start template to make your website using Qwik and Tailwind CSS.',
    },
  ],
};
