# @qavajs/steps-wdio
Step library to work with webdriverio using DSL page object

## installation

`npm install @qavajs/steps-wdio`

## configuration
```javascript
const App = require('./page_object');
module.exports = {
    default: {
        require: [
            '@qavajs/steps-wdio'
        ],
        browser: {
            timeout: {
                present: 10000,
                visible: 20000    
            },
            capabilities: {
                browserName: 'chrome'
            }
        },
        pageObject: new App()
    }
}
```
