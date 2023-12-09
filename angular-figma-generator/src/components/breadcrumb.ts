export const componentImport = 'ChkBreadcrumbComponent';
export function check(node: SceneNode) {
  return node.type === 'INSTANCE' && node.name.includes('breadcrumb');
}

export function render(node: SceneNode) {
  if (node.type !== 'INSTANCE') return '';
  const visibleChildren = node.findAll((node) => node.visible && (node as TextNode).characters !== '/');
  const breadcrumbs = visibleChildren.map((n) => ({ text: (n as TextNode).characters, routerLink: '/' }));
  return `<chk-breadcrumb [breadcrumbs]="${JSON.stringify(breadcrumbs).replace(/"/g, "'")}"></chk-breadcrumb>`;
}
