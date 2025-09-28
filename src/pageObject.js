"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainItem = exports.locator = exports.Selector = void 0;
exports.query = query;
exports.element = element;
var Selector = /** @class */ (function () {
    function Selector(selector, type) {
        this.type = 'simple';
        this.selector = selector;
        if (type) {
            this.type = type;
        }
    }
    /**
     * Define current locator as component
     * @param { new () => void } component
     */
    Selector.prototype.as = function (component) {
        this.component = component;
        return this;
    };
    return Selector;
}());
exports.Selector = Selector;
var locator = function locator(selector) {
    return new Selector(selector);
};
exports.locator = locator;
exports.locator.template = function (selector) {
    return new Selector(selector, 'template');
};
exports.locator.native = function (selector) {
    return new Selector(selector, 'native');
};
exports.locator.as = function (component) {
    var selector = new Selector(null);
    selector.component = component;
    return selector;
};
var ChainItem = /** @class */ (function () {
    function ChainItem(_a) {
        var alias = _a.alias, argument = _a.argument, selector = _a.selector, type = _a.type;
        this.alias = alias;
        this.argument = argument;
        this.selector = selector;
        this.type = type;
    }
    return ChainItem;
}());
exports.ChainItem = ChainItem;
function query(root, path) {
    var _a;
    var elements = path.split(/\s*>\s*/);
    var tokens = [];
    var currentComponent = typeof root === 'function' ? new root() : root;
    var currentAlias = 'App';
    for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
        var element_1 = elements_1[_i];
        var groups = (_a = element_1.match(/^(?<alias>.+?)(?:\((?<argument>.+)\))?$/)) === null || _a === void 0 ? void 0 : _a.groups;
        var alias = groups.alias.replace(/\s/g, '');
        if (!currentComponent)
            throw new Error("Alias '".concat(currentAlias, "' is not a component"));
        var currentElement = currentComponent[alias];
        if (!currentElement && (!currentComponent.defaultResolver || typeof currentComponent.defaultResolver !== 'function')) {
            throw new Error("Alias '".concat(alias, "' has not been found in '").concat(currentAlias, "'"));
        }
        if (!currentElement && currentComponent.defaultResolver) {
            currentElement = {};
            currentElement.selector = currentComponent.defaultResolver({ alias: groups.alias, argument: groups.argument });
            currentElement.type = 'native';
        }
        currentAlias = groups.alias;
        currentComponent = currentElement.component ? new currentElement.component() : null;
        tokens.push(new ChainItem({
            alias: alias,
            argument: groups.argument,
            selector: currentElement.selector,
            type: currentElement.type,
        }));
    }
    return tokens;
}
function element(path) {
    var chain = query(this.config.pageObject, path);
    var driver = this.wdio.driver;
    var logger = this;
    var logItem = function (item) { return ".$('".concat(item.type === 'template' ? item.selector(item.argument) : item.selector, "')"); };
    var log = function (logChain) { return logger.log("".concat(path, " -> ").concat(logChain.replace(/^\./, ''))); };
    var getter = function () {
        var current = driver;
        var logChain = '';
        for (var _i = 0, chain_1 = chain; _i < chain_1.length; _i++) {
            var item = chain_1[_i];
            logChain += logItem(item);
            switch (item.type) {
                case 'simple':
                    current = item.selector ? current.$(item.selector) : current;
                    break;
                case 'template':
                    current = current.$(item.selector(item.argument));
                    break;
                case 'native':
                    current = item.selector({
                        browser: driver,
                        driver: driver,
                        parent: current,
                        argument: item.argument
                    });
                    break;
            }
        }
        log(logChain);
        return current;
    };
    getter.collection = function () {
        var current = driver;
        var logChain = '';
        for (var i = 0; i < chain.length; i++) {
            var item = chain[i];
            logChain += logItem(item);
            if (i === chain.length - 1) {
                log(logChain);
                switch (item.type) {
                    case 'simple': return current.$$(item.selector);
                    case 'template': return current.$$(item.selector(item.argument));
                    case 'native': return item.selector({
                        browser: driver,
                        driver: driver,
                        parent: current,
                        argument: item.argument
                    });
                }
            }
            switch (item.type) {
                case 'simple':
                    current = item.selector ? current.$(item.selector) : current;
                    break;
                case 'template':
                    current = current.$(item.selector(item.argument));
                    break;
                case 'native':
                    current = item.selector({
                        browser: driver,
                        driver: driver,
                        parent: current,
                        argument: item.argument
                    });
                    break;
            }
        }
    };
    return getter;
}
