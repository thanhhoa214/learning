import {
  component$,
  Slot,
  useStore,
} from '@builder.io/qwik';

import { QuiIcon } from '../icon/Icon';
import { AlertProps } from './types';

export const QuiAlert = component$((props: AlertProps) => {
  const store = useStore({ isOpened: false });

  const defaultProps: AlertProps = {
    expandable: false,
    expanded: false,
    type: 'neutral',
    title: '',
  };
  const { type, title } = { ...defaultProps, ...props } as Required<AlertProps>;
  const isNotNeutral = type !== 'neutral';

  return (
    <section class={`qui-alert qui-alert-${type} rounded border border-solid py-3 px-4`}>
      <header
        class="flex gap-3"
        onClick$={() => {
          store.isOpened = !store.isOpened;
        }}>
        {isNotNeutral && <QuiIcon package="alert" name={type} size="1.5"></QuiIcon>}
        <strong class="flex-grow" onClick$={() => {}}>
          {title}
        </strong>
        {props.expandable && (
          <QuiIcon
            package="arrow"
            name={store.isOpened ? 'chevron_upward' : 'chevron_downward'}
            size="1.5"></QuiIcon>
        )}
      </header>

      {store.isOpened && (
        <article class={`text-sub-heading ${isNotNeutral && 'ml-9'}`}>
          <Slot />
        </article>
      )}
    </section>
  );
});
