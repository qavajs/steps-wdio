import { getElement } from './transformers';
import { Element } from 'webdriverio';
import { conditionValidations, conditionWait } from './conditionWait';

/**
 * Click implementation
 * @param alias - alias of element to click
 * @param disableWait - disable clickability wait
 */
export async function click(alias: string, disableWait: boolean): Promise<void> {
  const element = await getElement(alias) as Element;
  if (!disableWait) {
    await conditionWait(element, conditionValidations.CLICKABLE, config.browser.timeout.clickable);
  }
  await element.click();
}

/**
 * Double click implementation
 * @param alias - alias of element to click
 * @param disableWait - disable clickability wait
 */
export async function doubleClick(alias: string, disableWait: boolean): Promise<void> {
  const element = await getElement(alias) as Element;
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
  const element = await getElement(alias) as Element;
  if (!disableWait) {
    await conditionWait(element, conditionValidations.CLICKABLE, config.browser.timeout.clickable);
  }
  await element.click({button: 'right'});
}
