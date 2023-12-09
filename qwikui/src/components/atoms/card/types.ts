import { QwikIntrinsicElements } from '@builder.io/qwik';

type QwikInputElement = Omit<QwikIntrinsicElements['input'], 'children'>;

export interface QuiSelectableCardExtendProps {
  direction: 'vertical' | 'horizontal';
}
export interface QuiSelectableCardProps
  extends QwikInputElement,
    Partial<QuiSelectableCardExtendProps> {}
