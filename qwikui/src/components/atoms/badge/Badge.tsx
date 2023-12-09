import {
  component$,
  Slot,
} from '@builder.io/qwik';

import { QuiIcon } from '../icon/Icon';
import {
  BasicIconEnum,
  PackageEnum,
} from '../icon/types';

export interface BadgeProps {
  status: 'active' | 'hovered' | 'pressed' | 'disabled' | 'inactive';
  size?: 'small' | 'tiny';
}
export type RequiredBadgeProps = Required<BadgeProps>;
export const defaultProps: RequiredBadgeProps = {
  status: 'active',
  size: 'small',
};

export const Badge = component$((props: BadgeProps) => {
  const colorClass: Record<BadgeProps['status'], string> = {
    active: 'bg-primary-50 text-hyperlink-normal',
    hovered: 'bg-primary-50 text-hyperlink-hover',
    pressed: 'bg-primary-100 text-hyperlink-normal',
    disabled: 'bg-neutral-50 text-disable',
    inactive: 'bg-neutral-50 text-sub-heading',
  };
  const sizeClass: Record<RequiredBadgeProps['size'], string> = {
    small: 'py-1 text-body-1',
    tiny: 'py-0.5 text-body-2',
  };

  const { status, size } = { ...defaultProps, ...props };

  return (
    <span
      class={`inline-flex min-w-fit items-center gap-x-1 rounded-full px-2 font-semibold ${colorClass[status]} ${sizeClass[size]}`}>
      <Slot></Slot>
      <QuiIcon package={PackageEnum.basic} name={BasicIconEnum.solid_circle_close}></QuiIcon>
    </span>
  );
});
