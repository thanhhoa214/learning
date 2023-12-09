export const componentImport = 'ChkInputWrapperComponent, ChkInputDirective';
import * as icon from './icon';

export function check(node: SceneNode) {
  return node.type === 'FRAME' && node.name === 'text_field';
}

export function render(node: SceneNode) {
  if (node.type !== 'FRAME') return '';
  const visibleChildren = node.findAll((node) => node.visible);
  const placeholder = visibleChildren.find((node) => node.type === 'TEXT') as TextNode;
  const [prefix, suffix] = visibleChildren.filter((n) => icon.check(n));
  const prefixStr = prefix ? ` prefix="${prefix.name}"` : '';
  const suffixStr = suffix ? ` suffix="${suffix.name}"` : '';
  return `
      <chk-input-wrapper ${prefixStr} ${suffixStr}>
        <input chkInput [formControl]="control" placeholder="${placeholder.characters}" />
      </chk-input-wrapper>
`;
}
