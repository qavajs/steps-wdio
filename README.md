[![npm version](https://badge.fury.io/js/@qavajs%2Fsteps-wdio.svg)](https://badge.fury.io/js/@qavajs%2Fsteps-wdio)

# @qavajs/steps-wdio
Step library to work with webdriverio in qavajs framework

## installation

`npm install @qavajs/steps-wdio`

## configuration
```javascript
const App = require('./page_object');
module.exports = {
    default: {
        require: [
            'node_modules/@qavajs/steps-wdio/index.js'
        ],
        browser: {
            timeout: {
                present: 10000,
                visible: 20000,
                clickable: 15000,
                page: 10000,
                implicit: 0, //wdio implicit wait for element,
                element: 2000 //timeout to element to be accesible 
            },
            capabilities: {
                browserName: 'chrome'
            }
        },
        pageObject: new App()
    }
}
```

## screenshot strategy
@qavajs/steps-wdio has build-in capability to take screenshot on particular event. If you need to add 
screenshot to your report add _screenshot_ property to profile config.
Supported events:
- onFail
- beforeStep
- afterStep

```javascript
module.exports = {
    default: {
        screenshot: ['onFail']
    }
}
```
