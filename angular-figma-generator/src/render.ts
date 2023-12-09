import { CommonUtils, ChkStylingUtils, MapCollection } from './util';
import { icon, button, breadcrumb, input } from './components/index';

const chkComponents = [icon, button, breadcrumb, input];
const classProp = CommonUtils.addPropIfExist('class');
const styleProp = CommonUtils.addPropIfExist('style');

// --------------------------------------------
function componentImportsFactory() {
  const componentImports: string[] = [];
  return {
    add: (component: string) => {
      if (!componentImports.includes(component)) componentImports.push(component);
    },
    get: () => componentImports,
  };
}

function translationFactory() {
  const translation: Record<string, string> = {};
  return {
    add: (key: string, value: string) => {
      if (!translation[key]) translation[key] = value;
    },
    get: () => translation,
  };
}

function renderArtboard(frame: FrameNode) {
  const componentImports = componentImportsFactory();
  const translation = translationFactory();
  return {
    html: renderFrame(frame, 'main'),
    componentImports: componentImports.get(),
    translation: translation.get(),
  };

  function renderNode(node: SceneNode): string {
    if (node.name.includes('#nogen')) return '';

    const comp = chkComponents.find((c) => c.check(node));
    if (comp) {
      componentImports.add(comp.componentImport);
      const className = ChkStylingUtils.getFlexGrowClass(node as FrameNode);

      const compHtml = comp.render(node);
      return ChkStylingUtils.appendClassToNode(compHtml, className);
    }

    if (['GROUP', 'FRAME'].includes(node.type)) return renderFrame(node as FrameNode);
    if (node.type === 'TEXT') return renderText(node);
    return `<unknown>${node.name} - "${node.type}"</unknown>`;
  }

  function renderFrame(frame: FrameNode, frameTag = 'section'): string {
    const children = getChildren(frame);
    // Prevent unused section wrapper
    if (children.length === 1) return renderNode(children[0]);

    if (input.check(frame)) {
      componentImports.add(input.componentImport);
      return input.render(frame);
    }

    const { classNames, styles } = ChkStylingUtils.getStylesAndClassNamesForFrame(frame);

    let htmlString = `<${frameTag} ${classProp(classNames)} ${styleProp(styles)}>`;

    let childHTML = '';
    const parentIsFlex = frame.type === 'FRAME' && frame.layoutMode && frame.layoutMode !== 'NONE';
    const sortedChildren = getSortedChildren(frame);
    sortedChildren.forEach((child, index) => {
      let appendedClassName = '';

      if (!parentIsFlex && index !== 0) {
        const marginTop = ChkStylingUtils.getVerticalSpacingBetween(sortedChildren[index - 1], child);
        if (marginTop === 0) return;
        const marginTopAsRem = `${marginTop / 16}rem`;
        const marginTopKey = MapCollection.SPACING_MAP[marginTopAsRem];
        appendedClassName = `mt-${marginTopKey ?? `[${marginTopAsRem}]`}`;
      }
      childHTML += ChkStylingUtils.appendClassToNode(CommonUtils.wrapString(renderNode(child)), appendedClassName);
    });
    // Prevent unused ${frameTag} wrapper
    if (childHTML === '') return '';

    htmlString += childHTML;
    htmlString += `</${frameTag}>`;
    return htmlString;
  }

  function renderText(node: TextNode) {
    const { textStyleIds, fillStyleIds, characterGroups } = ChkStylingUtils.getStyledText(node);

    let result = '';
    textStyleIds.forEach((textStyleId, index) => {
      const typoClass = ChkStylingUtils.getTypoClassByTextStyleId(textStyleId);
      const colorClass = ChkStylingUtils.getColorClassByFillStyleId(fillStyleIds[index]);
      const characterGroup = characterGroups[index].join('').replace(/\n/g, '');
      const translationKey = CommonUtils.generateTranslationKey(characterGroup);
      translation.add(translationKey, characterGroup);
      result += `<span ${classProp(typoClass + colorClass)}>{{ 'YOUR_PREFIX.${translationKey}' | translate }}</span>`;
    });
    if (textStyleIds.length > 1) result = `<span>${result}</span>`;
    return result;
  }
}

function getChildren(frame: FrameNode | GroupNode): SceneNode[] {
  return frame.children.filter((node) => node.visible && !['RECTANGLE', 'LINE', 'VECTOR'].includes(node.type));
}
function getSortedChildren(frame: FrameNode | GroupNode): SceneNode[] {
  return getChildren(frame).sort((a, b) => a.absoluteTransform[1][2] - b.absoluteTransform[1][2]);
}

export function renderComponents(): { html: string; componentImports: string[]; translation: Record<string, string> } {
  // Get the currently selected layers
  const selection = figma.currentPage.selection;

  if (selection.length === 1 && selection[0].type === 'FRAME') {
    const artboard = selection[0];
    return renderArtboard(artboard);
  } else {
    throw Error('Please select an artboard.');
  }
}
