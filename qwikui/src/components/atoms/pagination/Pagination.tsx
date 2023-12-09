import {
  first,
  last,
} from 'lodash-es';
import range from 'lodash-es/range';

import { component$ } from '@builder.io/qwik';

import { QuiIcon } from '../icon/Icon';
import { QuiPaginationExtendProps } from './types';

export const Pagination = component$<QuiPaginationExtendProps>((props) => {
  const pages = getPaginationTexts(props.pageCount, props.selectedPage);

  return (
    <ul class="qui-pagination inline-flex items-center gap-1" {...props}>
      <span
        onClick$={() => props.onPageChange$?.(props.selectedPage - 1)}
        class={`qui-pagination-item ${props.selectedPage === 1 ? 'disabled' : ''}`}>
        <QuiIcon package="arrow" name="chevron_left"></QuiIcon>
      </span>
      {pages.map((text, index) => (
        <li
          onClick$={() => props.onPageChange$?.(index)}
          class={`qui-pagination-item ${Number(text) === props.selectedPage ? 'selected' : ''}`}>
          {text}
        </li>
      ))}
      <span
        onClick$={() => props.onPageChange$?.(props.selectedPage + 1)}
        class={`qui-pagination-item ${props.selectedPage === props.pageCount ? 'disabled' : ''}`}>
        <QuiIcon package="arrow" name="chevron_right"></QuiIcon>
      </span>
    </ul>
  );
});

export function getPaginationTexts(pageCount: number, selectedPage: number, maxDisplayedPage = 6) {
  const pages = range(1, pageCount + 1);
  if (pageCount < maxDisplayedPage + 1) return pages;

  if (selectedPage < maxDisplayedPage)
    return [...pages.slice(0, maxDisplayedPage - 1), '...', last(pages)];

  if (selectedPage > pageCount - maxDisplayedPage)
    return [first(pages), '...', ...pages.slice(pageCount - maxDisplayedPage)];

  const roundedHalf = Math.floor(maxDisplayedPage / 2);

  return [
    first(pages),
    '...',
    ...pages.slice(selectedPage - roundedHalf, selectedPage + roundedHalf - 1),
    '...',
    last(pages),
  ];
}
