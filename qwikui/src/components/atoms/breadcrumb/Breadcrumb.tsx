import { component$ } from '@builder.io/qwik';
import {
  ContentMenu,
  useContent,
  useLocation,
} from '@builder.io/qwik-city';

import {
  BreadcrumbItem,
  BreadcrumbProps,
} from './types';

export const Breadcrumb = component$(({ items }: BreadcrumbProps) => {
  const { menu } = useContent();
  const loc = useLocation();

  const breadcrumbs = items || createBreadcrumbs(menu, loc.pathname);
  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav class="space-x-2">
      {breadcrumbs.map((item) => (
        <span class="text-body-1">
          {item.href ? (
            <>
              <a href={item.href}>{item.text}</a> /
            </>
          ) : (
            item.text
          )}
        </span>
      ))}
    </nav>
  );
});

export function createBreadcrumbs(menu: ContentMenu | undefined, pathname: string) {
  if (menu?.items) {
    for (const indexA of menu.items) {
      const breadcrumbA: BreadcrumbItem = {
        text: indexA.text,
      };
      if (typeof indexA.href === 'string') {
        breadcrumbA.href = indexA.href;
      }
      if (indexA.href === pathname) {
        return [breadcrumbA];
      }

      if (indexA.items) {
        for (const indexB of indexA.items) {
          const breadcrumbB: BreadcrumbItem = {
            text: indexB.text,
          };
          if (typeof indexB.href === 'string') {
            breadcrumbB.href = indexB.href;
          }
          if (indexB.href === pathname) {
            return [breadcrumbA, breadcrumbB];
          }

          if (indexB.items) {
            for (const indexC of indexB.items) {
              const breadcrumbC: BreadcrumbItem = {
                text: indexC.text,
              };
              if (typeof indexC.href === 'string') {
                breadcrumbC.href = indexC.href;
              }
              if (indexC.href === pathname) {
                return [breadcrumbA, breadcrumbB, breadcrumbC];
              }
            }
          }
        }
      }
    }
  }

  return [];
}
