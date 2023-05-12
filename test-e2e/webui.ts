import Memory from './memory';
import App from './page_object';
import localServer from './support/server';
import wdioService from '@qavajs/wdio-service-adapter';

const common = {
    paths: ['test-e2e/features/*.feature'],
    require: ['test-e2e/step-definitions/*.ts', 'src/*.ts'],
    browser: {
        logLevel: 'warn',
        capabilities: {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    '--headless',
                    '--window-size=1280,720'
                ]
            }
        }
    },
    format: [
        '@qavajs/console-formatter',
        '@qavajs/xunit-formatter:test-e2e/report.xml',
        'json:test-e2e/report.json'
    ],
    service: [localServer],
    memory: new Memory(),
    pageObject: new App(),
    parallel: 4,
    retry: 1,
    publishQuiet: true
}

export default common;

export const debug = {
    ...common,
    tags: '@debug',
    retry: 0,
    parallel: 1,
    browser: {
        logLevel: 'warn',
        capabilities: {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    '--window-size=1280,720'
                ]
            }
        }
    },
}

export const selenium = {
    ...common,
    defaultTimeout: 30000,
    service: [...common.service, wdioService('@wdio/selenium-standalone-service')]
}

export const debugSelenium = {
    ...debug,
    defaultTimeout: 30000,
    service: [...common.service, wdioService('@wdio/selenium-standalone-service')]
}
