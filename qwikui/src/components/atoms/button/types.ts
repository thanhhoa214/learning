import { QwikIntrinsicElements } from '@builder.io/qwik';

import { QuiIconProps } from '../icon/Icon';

export type QuiButtonTheme = 'primary-blue' | 'rose' | 'green' | 'secondary' | 'invert';
export type QuiButtonSize = 'small' | 'medium' | 'big' | 'giant';

type QwikButtonElement = QwikIntrinsicElements['button'];
export interface QuiButtonExtendProps {
  theme: QuiButtonTheme;
  size: QuiButtonSize;
  isLoading: boolean;

  isIconOnly: boolean;
  iconPosition: 'before' | 'after';
  iconProps: QuiIconProps | null;
}

export interface QuiButtonProps extends Partial<QuiButtonExtendProps>, QwikButtonElement {}
