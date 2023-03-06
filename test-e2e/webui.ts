import Memory from './memory';
import App from './page_object';

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
        '@qavajs/xunit-formatter:test-e2e/report.xml',
        'json:test-e2e/report.json'
    ],
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
