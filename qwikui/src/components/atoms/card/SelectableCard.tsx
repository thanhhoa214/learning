// TODO: onChange$ made bug when first clicked on selected element
import {
  component$,
  Slot,
  useSignal,
} from '@builder.io/qwik';

import { QuiIcon } from '../icon/Icon';
import {
  QuiSelectableCardExtendProps,
  QuiSelectableCardProps,
} from './types';

export const SelectableCard = component$<QuiSelectableCardProps>((props) => {
  const combinedProps = { ...defaultProps, ...props };
  const checkedSignal = useSignal<boolean>(!!combinedProps.checked);

  return (
    <>
      <input
        hidden
        type="checkbox"
        {...combinedProps}
        onChange$={({ target }) => {
          checkedSignal.value = (target as HTMLInputElement)?.checked;
        }}
      />
      <label class={`qui-sc qui-sc-${combinedProps.direction}`} for={combinedProps.id}>
        <header class="flex gap-4">
          <QuiIcon
            package="switch"
            name={checkedSignal.value ? 'radio_button_checked' : 'radio_button_default'}
            size="1.5"></QuiIcon>
          <h3 class="flex-grow text-body-1 font-bold">
            <Slot name="title" />
          </h3>
        </header>
        <p class="text-body-1 text-body">
          <Slot />
        </p>
      </label>
    </>
  );
});

export const defaultProps: QuiSelectableCardExtendProps = {
  direction: 'vertical',
};
