// TODO Loading state, bug when passing class
import {
  component$,
  Slot,
} from '@builder.io/qwik';

import { QuiIcon } from '../icon/Icon';
import {
  QuiButtonExtendProps,
  QuiButtonProps,
  QuiButtonSize,
} from './types';

export const QuiButton = component$<QuiButtonProps>((props) => {
  const combinedProps = { ...defaultProps, ...props };
  const loadingClass = combinedProps.isLoading ? 'qui-loading' : '';
  const iconProps = combinedProps.iconProps
    ? { ...combinedProps.iconProps, size: iconSizeMap[combinedProps.size] }
    : null;

  return (
    <button
      class={`qui-button qui-button-${combinedProps.theme} qui-button-${combinedProps.size} ${loadingClass}`}
      {...props}>
      {iconProps && combinedProps.iconPosition === 'before' && <QuiIcon {...iconProps}></QuiIcon>}
      <Slot />
      {iconProps && combinedProps.iconPosition === 'after' && <QuiIcon {...iconProps}></QuiIcon>}
    </button>
  );
});

export const defaultProps: QuiButtonExtendProps = {
  theme: 'primary-blue',
  size: 'medium',
  isLoading: false,
  isIconOnly: false,
  iconPosition: 'before',
  iconProps: null,
};
export const iconSizeMap: Record<QuiButtonSize, number> = {
  small: 1,
  medium: 1.5,
  big: 1.5,
  giant: 2,
};
