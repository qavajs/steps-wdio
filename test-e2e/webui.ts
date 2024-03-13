import Memory from './memory';
import App from './page_object';
import localServer from './support/server';

const common = {
    paths: ['test-e2e/features/*.feature'],
    require: ['test-e2e/step-definitions/*.ts', 'src/*.ts'],
    browser: {
        logLevel: 'trace',
        capabilities: {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    '--headless',
                    '--window-size=1280,720'
                ]
            }
        },
        snapshot: {
            event: ['onFail']
        },
        screenshot: {
            event: ['onFail']
        },
    },
    format: [
        '@qavajs/console-formatter',
        'junit:test-e2e/report.xml',
        'json:test-e2e/report.json',
        '@qavajs/html-formatter:test-e2e/report.html'
    ],
    formatOptions: {
        console: {
            showLogs: true,
            showProgress: false
        }
    },
    service: [localServer],
    memory: new Memory(),
    pageObject: new App(),
    parallel: 4,
    retry: 1,
    defaultTimeout: 30000
}

export default common;

export const debug = {
    ...common,
    tags: '@debug',
    retry: 0,
    parallel: 4,
    browser: {
        logLevel: 'trace',
        capabilities: {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    '--window-size=1280,720'
                ]
            }
        },
        snapshot: {
            event: ['onFail']
        },
        screenshot: {
            event: ['onFail']
        },
    }
}
