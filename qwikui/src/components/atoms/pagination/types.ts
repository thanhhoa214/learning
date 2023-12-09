import {
  QRL,
  QwikIntrinsicElements,
} from '@builder.io/qwik';

type QwikUlElement = QwikIntrinsicElements['ul'];
export interface QuiPaginationExtendProps {
  pageCount: number;
  selectedPage: number;
  maxDisplayedNumber?: number;
  onPageChange$?: QRL<(page: number) => void>;
}

export interface QuiPaginationProps extends Partial<QuiPaginationExtendProps>, QwikUlElement {}
