[![npm version](https://badge.fury.io/js/@qavajs%2Fsteps-wdio.svg)](https://badge.fury.io/js/@qavajs%2Fsteps-wdio)

# @qavajs/steps-wdio
Step library to work with webdriverio in qavajs framework

## Installation

`npm install @qavajs/steps-wdio`

## Configuration
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
                element: 2000 ,//timeout to element to be accesible,
                value: 5000, // expect value timeout
                valueInterval: 500 //expect value interval
            },
            capabilities: {
                browserName: 'chrome'
            }
        },
        pageObject: new App()
    }
}
```

## Screenshots
@qavajs/steps-wdio has build-in capability to take screenshot on particular event. If you need to add 
screenshot to your report add _screenshot_ property to profile config.
Supported events:
- onFail
- beforeStep
- afterStep

```javascript
module.exports = {
    default: {
        browser: {
            capabilities: {
                browserName: 'chrome'
            },
            screenshot: {
                event: ['onFail']
            }
        }
    }
}
```

## Snapshot
@qavajs/steps-wdio has build-in capability to take page snapshot on particular event.
Supported events:
- onFail
- beforeStep
- afterStep

```javascript
module.exports = {
    default: {
        browser: {
            capabilities: {
                browserName: 'chrome'
            },
            snapshot: {
                event: ['onFail']
            }
        }
    }
}
```

## Typescript
To properly use globals exposed by @qavajs/steps-wdio add corresponding types to tsconfig.json
```json
{
  "compilerOptions": {
    "types": [
      "@qavajs/steps-wdio/globals"
    ]
  }
}
```

## Reuse Session
_reuseSession_ flag allows to share session between tests in frames of process. But setting of this flag 
transfer session control to user.

```javascript
module.exports = {
    default: {
        browser: {
            reuseSession: true
        }
    }
}
```

## Limitations
- mocks and interception work only with _puppeteer-core_ peer dependency installed


