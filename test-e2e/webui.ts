import Memory from './memory';
import App from './page_object';

export default {
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
        '@qavajs/xunit-formatter:test-e2e/report.xml'
    ],
    memory: new Memory(),
    pageObject: new App(),
    parallel: 1,
    publishQuiet: true
}
