export const componentImport = 'ChkButtonDirective';

export function check(node: SceneNode) {
  if (node.type === 'INSTANCE') {
    const componentProps = node.variantProperties;
    const buttonVariantProps = ['Color', 'Size', 'Status'];
    return buttonVariantProps.every((prop) => componentProps?.[prop]);
  }
  return false;
}

export function render(node: SceneNode) {
  if (node.type !== 'INSTANCE') return '';

  const themeMap: Record<string, string> = {
    'primary_blue_button': 'primary-blue',
    primary_blue_button: 'primary-blue',
    rose_button: 'rose',
    green_button: 'green',
    secondary_button: 'secondary',
    invert_button: 'invert',
    tertiary_button: 'tertiary',
    quaternary_button: 'quaternary',
  };

  let htmlString = `<button `;
  const { Color, Size } = node.variantProperties ?? {};

  if (Color) {
    const theme = themeMap[Color];
    htmlString += `chkButton${theme !== 'primary-blue' ? `="${theme}"` : ''} `;
  }
  if (Size) {
    htmlString += Size !== 'medium' ? `chkSize="${Size.replace(//, '')}"` : '';
  }
  htmlString += '>';
  htmlString += node
    .findChildren((node) => node.type === 'TEXT')
    .map((node) => (node as TextNode).characters)
    .join(' ');

  htmlString += '</button>';
  return htmlString;
}
