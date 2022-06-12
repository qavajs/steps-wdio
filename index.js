const { Before, After, When, Then, defineParameterType } = require('@cucumber/cucumber');
const { remote } = require('webdriverio');
const memory = require('@cucumber-e2e/memory2');
const { po } = require('@cucumber-e2e/po2');
const { wait, BECOME_VISIBLE, WAIT_ELEMENT_TIMEOUT } = require('./wait');
const { verify } = require('./verify');

defineParameterType({
    name: 'element',
    regexp: /'(.+)'/,
    transformer: async p => po.getElement(await memory.getValue(p))
});

defineParameterType({
    name: 'reverse',
    regexp: /( not)?/,
    transformer: p => p ?? false
});

defineParameterType({
    name: 'validation',
    regexp: /(be equal to|contain)/,
    transformer: p => p
});

Before(async function () {
    global.browser = await remote(config.browser);
    po.init(browser, { timeout: 10000 });
    po.register(config.pageObject);
});

After(async function() {
    await browser.deleteSession();
});

When('open {memory} url', async function(url) {
    await browser.url(await url);
});

When('type {string} to {element}', async function(value, element) {
    await (await element).waitForDisplayed();
    await (await element).addValue(await value);
});

When('click {element}', async function(element) {
    await (await element).waitForDisplayed();
    await (await element).click();
});

When('clear {element}', async function(element) {
    await (await element).waitForDisplayed();
    await (await element).clearValue();
});

Then(
    'text of {element} element should{reverse} {validation} {memory}',
    async function (element, reverse, validation, value) {
        await wait(element, BECOME_VISIBLE, WAIT_ELEMENT_TIMEOUT);
        const elementText = await (await element).getText();
        verify({
            ar: elementText,
            er: await value,
            reverse,
            validation
        });
    }
);
