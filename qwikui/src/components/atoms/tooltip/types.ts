import { QwikIntrinsicElements } from '@builder.io/qwik';

type QwikPElement = QwikIntrinsicElements['p'];
export interface QuiSwitchExtendProps {
  content: string;
}

export interface QuiSwitchProps extends Partial<QuiSwitchExtendProps>, QwikPElement {}
