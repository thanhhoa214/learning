import {
  component$,
  Slot,
  useClientEffect$,
  useSignal,
} from '@builder.io/qwik';

export const Tooltip = component$(() => {
  const tooltipRef = useSignal<HTMLSpanElement>();

  useClientEffect$(({ track }) => {
    track(() => tooltipRef.value);

    if (!tooltipRef.value) return;

    const tooltipEle = tooltipRef.value;
    const { height, top } = tooltipEle.getBoundingClientRect();

    if (height < top) {
      tooltipEle.style.top = `-${tooltipEle.clientHeight}px`;
      tooltipEle.classList.add(`bottom-0 after:(border-0)`);
    } else {
      tooltipEle.style.top = '100%';
      tooltipEle.classList.add(`after:border-neutral-800`);
    }
  });

  return (
    <span class="qui-tooltip group relative inline-block">
      <Slot></Slot>
      <span
        ref={tooltipRef}
        class="qui-tooltip-text invisible absolute left-1/2 z-10 -ml-16 h-fit w-full max-w-xs -translate-x-1/2 rounded bg-neutral-800 px-3 py-2 text-center text-body-1 text-invert opacity-0 transition-transform after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[5px] after:border-t-neutral-800 after:content-[''] group-hover:visible group-hover:opacity-100">
        <Slot name="tooltip"></Slot>
      </span>
    </span>
  );
});
