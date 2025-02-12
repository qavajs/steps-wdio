//@ts-ignore
import { ChainablePromiseArray, ChainablePromiseElement } from 'webdriverio';

type SelectorDefinition = string | ((argument: string) => string) | ((argument: any) => any) | null;

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
 */
export interface LocatorDefinition {
    (selector: any): Selector;

    /**
     * Define selector as a template
     * @param {(argument: string) => string} selector - selector template
     */
    template: (selector: (argument: string) => string) => Selector;

    /**
     * Define selector using native wdio API
     * @param {(argument: string) => string} selector - selector function
     */
    native: (selector: (params: NativeSelectorParams) => ChainablePromiseElement) => Selector;

    /**
     * Define component
     * @param { new () => void } component
     */
    as: (component: new () => void) => Selector;
}

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

export function query(root: any, path: string) {
    const elements = path.split(/\s*>\s*/);
    const tokens = [];
    let currentComponent = typeof root === 'function' ? new root() : root;
    let currentAlias = 'App';
    for (const element of elements) {
        const groups = element.match(/^(?<alias>.+?)(?:\((?<argument>.+)\))?$/)?.groups as { alias: string, argument: string };
        const alias = groups.alias.replace(/\s/g, '');
        if (!currentComponent) throw new Error(`Alias '${currentAlias}' is not a component`);
        const currentElement = currentComponent[alias];
        if (!currentElement) throw new Error(`Alias '${alias}' has not been found in '${currentAlias}'`);
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

export interface Locator {
    (): ChainablePromiseElement;
    collection: () => ChainablePromiseArray;
}

export function element(this: any, path: string): Locator {
    const chain = query(this.config.pageObject, path);
    const driver = this.wdio.driver as WebdriverIO.Browser;
    const logger = this;
    const getter: Locator = function () {
        let current = driver as unknown as ChainablePromiseElement;
        for (const item of chain) {
            logger.log(`${item.alias} -> ${item.selector}`);
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
        return current
    }
    getter.collection = function () {
        let current = driver as unknown as ChainablePromiseElement;
        for (let i = 0; i < chain.length; i++) {
            const item = chain[i];
            logger.log(`${item.alias} -> ${item.selector}`);
            if (i === chain.length - 1) {
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