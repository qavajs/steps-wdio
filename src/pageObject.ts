//@ts-ignore
import { ChainablePromiseArray, ChainablePromiseElement } from 'webdriverio';
import { QavajsWdioWorld } from './QavajsWdioWorld';

type SelectorDefinition = string | ((argument: string) => string) | ((argument: any) => any) | null;

/**
 * Represents a selector definition with optional type and component binding.
 * @example
 * class App {
 *   Button = locator('#button');
 *   ButtonByIndex = locator.template(idx => `#list li:nth-child(${idx})`);
 * }
 */
export class Selector {
    selector: SelectorDefinition;
    component!: Function;
    type: string = 'simple';

    constructor(selector: SelectorDefinition, type?: string) {
        this.selector = selector;
        if (type) {
            this.type = type;
        }
    }

    /**
     * Define current locator as component
     * @param { new () => void } component
     * @example
     * class BodyComponent { TextElement = locator('#textValue'); }
     * class App {
     *   BodyComponent = locator('body').as(BodyComponent);
     * }
     */
    as(component: new () => void) {
        this.component = component;
        return this;
    }
}

export type NativeSelectorParams = {
    browser: WebdriverIO.Browser;
    driver: WebdriverIO.Browser;
    parent: ChainablePromiseElement;
    argument: string;
};

/**
 * Define selector
 * @example
 * class BodyComponent { TextElement = locator('#textValue'); }
 * class App {
 *   Button = locator('#button');
 *   ButtonByText = locator.template(text => `//button[.="${text}"]`);
 *   ButtonNative = locator.native(({ driver }) => driver.$('#button'));
 *   BodyComponent = locator('body').as(BodyComponent);
 *   BodyNative = locator.native(({ browser }) => browser.$('body')).as(BodyComponent);
 *   TopLevelComponent = locator.as(BodyComponent);
 * }
 */
export interface LocatorDefinition {
    (selector: any): Selector;

    /**
     * Define selector as a template
     * @param {(argument: string) => string} selector - selector template
     * @example
     * class App {
     *   ItemByIndex = locator.template(idx => `#list li:nth-child(${idx})`);
     *   ItemByText = locator.template(text => `//ul/li[contains(., "${text}")]`);
     * }
     */
    template: (selector: (argument: string) => string) => Selector;

    /**
     * Define selector using native wdio API
     * @param {(params: NativeSelectorParams) => ChainablePromiseElement} selector - selector function
     * @example
     * class App {
     *   ButtonNative = locator.native(({ driver }) => driver.$('#button'));
     *   TextNative = locator.native(({ browser }) => browser.$('#textValue'));
     * }
     */
    native: (selector: (params: NativeSelectorParams) => ChainablePromiseElement) => Selector;

    /**
     * Define component
     * @param { new () => void } component
     * @example
     * class BodyComponent { TextElement = locator('#textValue'); }
     * class App {
     *   TopLevelComponent = locator.as(BodyComponent);
     * }
     */
    as: (component: new () => void) => Selector;
}

/**
 * Create a simple selector from a CSS/XPath string or any value accepted by WebdriverIO's `$`.
 * @param selector - CSS selector, XPath, or WDIO-compatible selector string
 * @returns {Selector}
 * @example
 * class App {
 *   Button = locator('#button');
 *   Input = locator('#input');
 *   ListItems = locator('#list li');
 * }
 */
export const locator: LocatorDefinition = function locator(selector: any): Selector {
    return new Selector(selector);
}

locator.template = function(selector: (argument: string) => string) {
    return new Selector(selector, 'template');
}

locator.native = function(selector: (params: NativeSelectorParams) => ChainablePromiseElement) {
    return new Selector(selector, 'native');
}

locator.as = function (component: new () => void) {
    const selector = new Selector(null);
    selector.component = component;
    return selector;
}

/**
 * Represents a single resolved step in a page-object traversal chain.
 * Produced by {@link query} and consumed by {@link element}.
 * @example
 * // Given App with: User = locator.template(idx => `#users > li:nth-child(${idx})`)
 * // query(App, 'User(2)') returns:
 * // [ChainItem { alias: 'User', selector: fn, type: 'template', argument: '2' }]
 */
export class ChainItem {
    alias: string;
    argument?: string;
    selector: any;
    type: string;

    constructor({ alias, argument, selector, type }: { alias: string, argument?: string, selector?: string, type: string }) {
        this.alias = alias;
        this.argument = argument;
        this.selector = selector;
        this.type = type;
    }
}

/**
 * Resolve a `>` delimited alias path against a page-object root and return the
 * ordered list of {@link ChainItem}s needed to locate the element.
 *
 * Path syntax: `"Alias > ChildAlias > TemplateAlias(argument)"`
 *
 * @param root - A page-object class constructor or instance that acts as the traversal root.
 * @param path - A `>` delimited string of alias names, optionally with a single argument in parentheses.
 * @returns {ChainItem[]} Ordered chain of resolved selectors.
 * @throws {Error} When an alias is not found on the current component or a non-component is traversed.
 * @example
 * class BodyComponent { TextElement = locator('#textValue'); }
 * class App {
 *   BodyComponent = locator('body').as(BodyComponent);
 *   User = locator.template(idx => `#users > li:nth-child(${idx})`);
 * }
 *
 * query(App, 'BodyComponent > TextElement');
 * // => [
 * //   ChainItem { alias: 'BodyComponent', selector: 'body',       type: 'simple' },
 * //   ChainItem { alias: 'TextElement',   selector: '#textValue', type: 'simple' },
 * // ]
 *
 * query(App, 'User(3)');
 * // => [
 * //   ChainItem { alias: 'User', selector: fn, type: 'template', argument: '3' },
 * // ]
 */
export function query(root: any, path: string) {
    const elements = path.split(/\s*>\s*/);
    const tokens = [];
    let currentComponent = typeof root === 'function' ? new root() : root;
    let currentAlias = 'App';
    for (const element of elements) {
        const groups = element.match(/^(?<alias>.+?)(?:\((?<argument>.+)\))?$/)?.groups as { alias: string, argument: string };
        const alias = groups.alias.replace(/\s/g, '');
        if (!currentComponent) throw new Error(`Alias '${currentAlias}' is not a component`);
        let currentElement = currentComponent[alias];
        if (!currentElement && (!currentComponent.defaultResolver || typeof currentComponent.defaultResolver !== 'function')) {
            throw new Error(`Alias '${alias}' has not been found in '${currentAlias}'`);
        }
        if (!currentElement && currentComponent.defaultResolver) {
            currentElement = {};
            currentElement.selector = currentComponent.defaultResolver({ alias: groups.alias, argument: groups.argument });
            currentElement.type = 'native';
        }
        currentAlias = groups.alias;
        currentComponent = currentElement.component ? new currentElement.component() : null;

        tokens.push(new ChainItem({
            alias,
            argument: groups.argument,
            selector: currentElement.selector,
            type: currentElement.type,
        }));
    }

    return tokens;
}

/**
 * A callable that resolves the page-object path to a single WDIO element.
 * Calling it returns the element; `.collection()` returns all matching elements.
 * @example
 * // Resolves to a single element
 * const btn = await this.element('Button');
 * await btn().click();
 *
 * // Resolves to a collection
 * const items = await this.element('SimpleTextListItems');
 * await items.collection();
 */
export interface Locator {
    (): ChainablePromiseElement;
    collection: () => ChainablePromiseArray;
}

export function element(this: QavajsWdioWorld, path: string): Locator {
    const chain = query(this.config.pageObject, path);
    const driver = this.wdio.driver as WebdriverIO.Browser;
    const logger = this;
    const logItem = (item: ChainItem, collection = false) => {
        const fn = collection ? '$$' : '$';
        if (item.type === 'template') return `.${fn}('${item.selector(item.argument)}')`;
        if (item.type === 'native') return `.[native:${item.alias}]`;
        return item.selector ? `.${fn}('${item.selector}')` : '';
    };
    const log = (logChain: string) => logger.log(`${path} -> ${logChain.replace(/^\./, '')}`);
    const getter: Locator = function () {
        let current = driver as unknown as ChainablePromiseElement;
        let logChain = '';
        for (const item of chain) {
            logChain += logItem(item);
            switch (item.type) {
                case 'simple': current = item.selector ? current.$(item.selector) : current; break;
                case 'template': current = current.$(item.selector(item.argument)); break;
                case 'native': current = item.selector({
                    browser: driver,
                    driver,
                    parent: current,
                    argument: item.argument
                }); break;
            }
        }
        log(logChain);
        return current
    }
    getter.collection = function () {
        let current = driver as unknown as ChainablePromiseElement;
        let logChain = '';
        for (let i = 0; i < chain.length; i++) {
            const item = chain[i];
            const isLast = i === chain.length - 1;
            logChain += logItem(item, isLast);
            if (isLast) {
                log(logChain);
                switch (item.type) {
                    case 'simple': return current.$$(item.selector);
                    case 'template': return current.$$(item.selector(item.argument));
                    case 'native': return item.selector({
                        browser: driver,
                        driver,
                        parent: current,
                        argument: item.argument
                    });
                }
            }
            switch (item.type) {
                case 'simple': current = item.selector ? current.$(item.selector) : current; break;
                case 'template': current = current.$(item.selector(item.argument)); break;
                case 'native': current = item.selector({
                    browser: driver,
                    driver,
                    parent: current,
                    argument: item.argument
                }); break;
            }
        }
    }
    return getter;
}