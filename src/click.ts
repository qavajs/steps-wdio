import { getElement } from './transformers';
import { conditionValidations, conditionWait } from './conditionWait';

/**
 * Click implementation
 * @param alias - alias of element to click
 * @param disableWait - disable clickability wait
 * @param coords - coordinates to click (counts from top/left corner)
 */
export async function click(alias: string, disableWait: boolean, coords?: { x: number, y: number }): Promise<void> {
  const element = await getElement(alias);
  if (!disableWait) {
    await conditionWait(element, conditionValidations.CLICKABLE, config.browser.timeout.clickable);
  }
  if (coords) {
    const width = await element.getSize('width');
    const height = await element.getSize('height');
    coords.x -= Math.floor(width / 2);
    coords.y -= Math.floor(height / 2);
  }
  await element.click(coords);
}

/**
 * Double click implementation
 * @param alias - alias of element to click
 * @param disableWait - disable clickability wait
 */
export async function doubleClick(alias: string, disableWait: boolean): Promise<void> {
  const element = await getElement(alias);
  if (!disableWait) {
    await conditionWait(element, conditionValidations.CLICKABLE, config.browser.timeout.clickable);
  }
  await element.doubleClick();
}

/**
 * Right click implementation
 * @param alias - alias of element to click
 * @param disableWait - disable clickability wait
 */
export async function rightClick(alias: string, disableWait: boolean): Promise<void> {
  const element = await getElement(alias);
  if (!disableWait) {
    await conditionWait(element, conditionValidations.CLICKABLE, config.browser.timeout.clickable);
  }
  await element.click({button: 'right'});
}
