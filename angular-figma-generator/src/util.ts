export namespace MapCollection {
  export const WEIGHT: Record<string, string> = {
    'Semi Bold': 'semibold',
    Bold: 'bold',
  };
  export const TEXT_COLOR: Record<string, string> = {
    'Highlight ': 'highlight',
    'Sub Heading': 'sub-heading',
    'Sub Invert': 'sub-invert',
  };
  export const COLOR: Record<string, string> = {
    'primary blue': 'primary',
  };
  export const JUSTIFY_CONTENT: Record<Exclude<BaseFrameMixin['primaryAxisAlignItems'], 'BASELINE'>, string> = {
    CENTER: 'justify-center',
    MIN: 'justify-start',
    MAX: 'justify-end',
    SPACE_BETWEEN: 'justify-between',
  };
  export const ALIGN_ITEMS: Record<Exclude<BaseFrameMixin['counterAxisAlignItems'], 'BASELINE' | 'MIN'>, string> = {
    CENTER: 'items-center',
    MAX: 'items-end',
  };
  export const BORDER_RADIUS: Record<number, string> = {
    4: 'sm',
    8: 'lg',
  };
  export const SPACING_MAP: Record<string, number> = {
    '0': 0,
    '0.25rem': 1,
    '0.5rem': 2,
    '1rem': 3,
    '1.5rem': 4,
    '2rem': 5,
    '2.5rem': 6,
    '3rem': 7,
    '3.5rem': 8,
    '4rem': 9,
  };
}

export namespace CommonUtils {
  export function generateTranslationKey(text: string) {
    const nonSpecialLowerText = text
      .trim()
      .replace(/[^a-z0-9\s\n]+/gi, '')
      .toLowerCase();
    let key = nonSpecialLowerText;
    if (nonSpecialLowerText.length > 20) {
      const lastNearest20thSpaceIndex = nonSpecialLowerText.substring(0, 20).lastIndexOf(' ');
      if (lastNearest20thSpaceIndex === -1) key = text;
      else key = nonSpecialLowerText.substring(0, lastNearest20thSpaceIndex);
    }

    return key.replace(/\s/g, '_');
  }

  export const wrapString = (htmlString: string, char: string = '\n') => `${char}${htmlString}${char}`;
  export const wrapSpace = (htmlString: string) => wrapString(htmlString, ' ');

  export function addPropIfExist(prop: string) {
    return (value: string) => (value ? ` ${prop}="${value}"` : '');
  }
}

export namespace ChkStylingUtils {
  export function getTypoClassByTextStyleId(textStyleId: TextNode['textStyleId']) {
    const textStyle = figma.getStyleById(textStyleId.toString()) as TextStyle;
    if (!textStyle) return '';

    const [variant, weight] = textStyle.name.split(' - ');
    const variantKey = variant.replace(/ /g, '-').toLowerCase();

    const variantAsClass = (variantKey && variantKey !== 'body-1' && CommonUtils.wrapSpace(`chk-${variantKey}`)) || '';
    const weightAsClass =
      (weight && weight !== 'Regular' && CommonUtils.wrapSpace(`chk-${MapCollection.WEIGHT[weight]}`)) || '';
    return `${variantAsClass}${weightAsClass}`;
  }

  export function getColorClassByFillStyleId(fillStyleId: TextNode['fillStyleId']) {
    const textStyle = figma.getStyleById(fillStyleId.toString());
    if (!textStyle) return '';

    const [_, color] = textStyle.name.split(/[\/-]/g);
    // Prevent generate default style at HTML level
    if (color === 'Body') return '';
    return CommonUtils.wrapSpace(`chk-${MapCollection.TEXT_COLOR[color] || color.toLowerCase()}`);
  }

  export function getBackgroundClass(node: FrameNode | GroupNode) {
    const bgStyle = figma.getStyleById(node.backgroundStyleId.toString());
    if (!bgStyle) return '';

    const colorWeight = bgStyle.name.slice(bgStyle.name.lastIndexOf('/') + 1);
    const color = colorWeight.slice(0, colorWeight.lastIndexOf(' ')).toLowerCase();
    const weight = colorWeight.slice(color.length + 1);

    return CommonUtils.wrapSpace(`chk-bg-${MapCollection.COLOR[color] || color}${weight ? `-${weight}` : ''}`);
  }

  export function getBorderRadiusClass(node: FrameNode) {
    if (Boolean(node.bottomRightRadius))
      return CommonUtils.wrapSpace(`chk-rounded-${MapCollection.BORDER_RADIUS[node.bottomRightRadius] || 'full'}`);
    return '';
  }

  export function getLayoutClass(node: FrameNode) {
    let className = '';

    if (node.layoutMode && node.layoutMode !== 'NONE') {
      className += ' flex ';
      if (node.layoutMode === 'VERTICAL') className += CommonUtils.wrapSpace('flex-column');
      if (Boolean(node.primaryAxisAlignItems) && node.primaryAxisAlignItems !== 'MIN')
        className += CommonUtils.wrapSpace(MapCollection.JUSTIFY_CONTENT[node.primaryAxisAlignItems]);
      if (
        Boolean(node.counterAxisAlignItems) &&
        node.counterAxisAlignItems !== 'BASELINE' &&
        node.counterAxisAlignItems !== 'MIN'
      )
        className += CommonUtils.wrapSpace(MapCollection.ALIGN_ITEMS[node.counterAxisAlignItems]);
    }

    return className;
  }

  export function getBorderClass(node: FrameNode) {
    if (Boolean(node.strokes?.length)) return CommonUtils.wrapSpace(`chk-border`);
    return '';
  }

  export function getFlexGrowClass(node: FrameNode) {
    let className = '';
    if (node.layoutGrow > 0) className += CommonUtils.wrapSpace('flex-grow');
    if (node.layoutAlign === 'STRETCH') className += CommonUtils.wrapSpace('self-stretch');
    // if (node.layoutAlign === 'INHERIT') className += CommonUtils.wrapSpace('self-start');
    return className;
  }

  export function getStyledText(textNode: TextNode) {
    const textStyleIds: string[] = [];
    const fillStyleIds: string[] = [];
    const characterGroups: string[][] = [];
    let characterGroup: string[];
    if (textNode.fillStyleId === figma.mixed) {
      Array.from(textNode.characters).forEach((char, index) => {
        const textStyleId = textNode.getRangeTextStyleId(index, index + 1).toString();
        const fillStyleId = textNode.getRangeFillStyleId(index, index + 1).toString();

        if (textStyleIds.indexOf(textStyleId) === -1) {
          textStyleIds.push(textStyleId);
          fillStyleIds.push(fillStyleId);
          characterGroup = [];
          characterGroups.push(characterGroup);
        }

        characterGroup.push(char);
      });
      return { textStyleIds, fillStyleIds, characterGroups };
    }
    return {
      textStyleIds: [textNode.textStyleId.toString()],
      fillStyleIds: [textNode.fillStyleId.toString()],
      characterGroups: [[textNode.characters]],
    };
  }

  export function getStylesAndClassNamesForFrame(frame: FrameNode) {
    // Prevent generating default frame name
    let classNames = frame.name.includes('Frame ') ? '' : CommonUtils.wrapSpace(frame.name);
    let styles = '';

    classNames += ChkStylingUtils.getBackgroundClass(frame);
    classNames += ChkStylingUtils.getBorderRadiusClass(frame);
    classNames += ChkStylingUtils.getLayoutClass(frame);
    classNames += ChkStylingUtils.getFlexGrowClass(frame);
    classNames += ChkStylingUtils.getBorderClass(frame);

    if ([frame.paddingTop, frame.paddingLeft, frame.paddingRight, frame.paddingBottom].some(Boolean)) {
      styles += CommonUtils.wrapSpace(
        `padding: ${frame.paddingTop}px ${frame.paddingRight}px ${frame.paddingBottom}px ${frame.paddingLeft}px;`
      );
    }

    if (Boolean(frame.itemSpacing) && frame.primaryAxisAlignItems !== 'SPACE_BETWEEN') {
      styles += CommonUtils.wrapSpace(`gap: ${frame.itemSpacing}px;`);
    }
    return { classNames, styles };
  }

  export function appendClassToNode(template: string, className: string) {
    if (!className) return template;
    const hasClassPropRegex = /(<[^>]+class=")([^"]+)("[^>]*>)/;
    if (hasClassPropRegex.test(template)) return template.replace(hasClassPropRegex, `$1$2${className}$3`);
    // Append class prop with value
    return template.replace(/(<[^>]+)([^>]*>)/, `$1 class="${className}"$2`);
  }

  export function getVerticalSpacingBetween(topNode: SceneNode, bottomNode: SceneNode): number {
    const topNodeBottom = topNode.y + topNode.height;
    const bottomNodeTop = bottomNode.y;
    return bottomNodeTop - topNodeBottom;
  }
}
