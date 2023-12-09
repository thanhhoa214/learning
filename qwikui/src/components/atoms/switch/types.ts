import {
  QRL,
  QwikIntrinsicElements,
} from '@builder.io/qwik';

type QwikUlElement = QwikIntrinsicElements['ul'];
export interface QuiSwitchExtendProps {
  items: {
    key: string;
    value: string;
  }[];
  selectedKey: string;
  onClickItem$?: QRL<(key: string) => void>;
}

export interface QuiSwitchProps extends Partial<QuiSwitchExtendProps>, QwikUlElement {}
