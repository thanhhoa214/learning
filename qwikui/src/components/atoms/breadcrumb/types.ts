export interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

export interface BreadcrumbItem {
  text: string;
  href?: string;
}
