import { component$ } from '@builder.io/qwik';

import { QuiSwitchExtendProps } from './types';

export const Switch = component$<QuiSwitchExtendProps>((props) => {
  const selectedClass = 'bg-neutral-0 text-sub-heading';

  return (
    <ul class="qui-switch inline-flex w-fit gap-0.5 rounded bg-neutral-50 p-0.5" {...props}>
      {props.items.map((item) => (
        <li
          key={item.key}
          onClick$={() => props.onClickItem$?.(item.key)}
          class={`cursor-pointer rounded py-1 px-3 text-body-2 font-semibold text-body hover:bg-neutral-25 active:bg-neutral-100 ${
            props.selectedKey === item.key && selectedClass
          }`}>
          {item.value}
        </li>
      ))}
    </ul>
  );
});
