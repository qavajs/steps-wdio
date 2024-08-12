import { When } from '@cucumber/cucumber';
import { po, $, $$ } from '@qavajs/po';
import { getValue } from './transformers';

/**
 * Register selector as page object
 * @param {string} selectorKey - selector to register
 * @param {string} aliasKey - alias of element
 * @example
 * When I define '#someId' as 'My Button' element
 * And I click 'My Button'
 *
 * When I define 'li.selected' as 'Selected Items' collection
 * And I expect number of element in 'Selected Items' collection to equal '3'
 */
When('I define {string} as {string} {wdioPoType}', async function (
    selectorKey: string, aliasKey: string, poType: string
) {
    const selector = await getValue(selectorKey);
    const alias = (await getValue(aliasKey)).replace(/\s/g, '');
    const defineElement = poType === 'element' ? $ : $$;
    //@ts-ignore
    po.pageObject[alias] = defineElement(selector);
});
