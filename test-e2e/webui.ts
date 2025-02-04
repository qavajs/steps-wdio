import Memory from './memory';
import App from './page_object';
import localServer from './support/server';
import { IQavajsWdioConfig } from '../src/IQavajsWdioConfig';

const common = {
    paths: ['test-e2e/features/*.feature'],
    require: ['test-e2e/step-definitions/*.ts', 'src/*.ts'],
    browser: {
        logLevel: 'warn',
        capabilities: {
            browserName: 'chrome',
            'wdio:enforceWebDriverClassic': true,
            'goog:chromeOptions': {
                args: [
                    '--headless',
                    '--window-size=1280,720',
                    '--disable-search-engine-choice-screen'
                ]
            }
        }
    },
    format: [
        '@qavajs/console-formatter',
        ['junit', 'test-e2e/report.xml'],
        ['@qavajs/html-formatter', 'test-e2e/report.html']
    ],
    formatOptions: {
        console: {
            showLogs: true,
            showProgress: false
        }
    },
    service: [localServer],
    memory: new Memory(),
    pageObject: App,
    parallel: 4,
    retry: 2,
    defaultTimeout: 30000
} as IQavajsWdioConfig

export const wd = {
    ...common,
    tags: '@wd'
};

export const bidi = {
    ...common,
    tags: '@bidi',
    browser: {
        logLevel: 'warn',
        capabilities: {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    '--headless',
                    '--window-size=1280,720',
                    '--disable-search-engine-choice-screen'
                ]
            }
        }
    },
}
export const debugWd = {
    ...common,
    tags: '@debug and @wd',
    retry: 0,
    parallel: 1,
    browser: {
        logLevel: 'warn',
        capabilities: {
            browserName: 'chrome',
            'wdio:enforceWebDriverClassic': true,
            'goog:chromeOptions': {
                args: [
                    '--window-size=1280,720',
                    '--disable-search-engine-choice-screen'
                ]
            }
        }
    },
}

export const debugBidi = {
    ...common,
    tags: '@debug and @bidi',
    retry: 0,
    parallel: 1,
    browser: {
        logLevel: 'warn',
        capabilities: {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    '--window-size=1280,720',
                    '--disable-search-engine-choice-screen'
                ]
            }
        }
    },
}
