import { renderComponents } from './render';
figma.showUI(__html__);

const result = renderComponents();
figma.ui.postMessage({ type: 'html', data: result }, { origin: '*' });
