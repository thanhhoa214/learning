import { ChkStylingUtils, CommonUtils } from '../util';

export const componentImport = 'ChkIconComponent';
export function check(node: SceneNode): node is InstanceNode {
  return node.type === 'INSTANCE' && /[\w\d]+\/[\w\d]+/.test(node.name);
}

export function render(node: SceneNode) {
  if (node.type !== 'INSTANCE') return '';
  const sizes: Record<number, string> = {
    12: 'small',
    16: 'medium',
    20: 'big',
    24: 'giant',
  };
  const size = node.width;
  const sizeStr = sizes[size] ? sizes[size] : `${size / 16}rem`;
  const sizeIfNotDefault = sizeStr !== 'big' ? ` size="${sizeStr}"` : '';

  let fillColor = '';
  const allVectorChildren = node.findAll(
    (c) => c.visible && (c.type === 'VECTOR' || c.type === 'BOOLEAN_OPERATION')
  ) as VectorNode[];
  for (let child of allVectorChildren) {
    if (node.name === 'trading/line_chart_stroke') console.log(child);

    fillColor =
      (child.fillStyleId && ChkStylingUtils.getColorClassByFillStyleId(child.fillStyleId)) ||
      (child.strokeStyleId && ChkStylingUtils.getColorClassByFillStyleId(child.strokeStyleId)) ||
      '';
    if (fillColor) break;
  }

  return `<chk-icon name="${node.name}"${sizeIfNotDefault}${CommonUtils.addPropIfExist('class')(
    fillColor
  )}></chk-icon>`;
}
