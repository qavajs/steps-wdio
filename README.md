[![npm version](https://badge.fury.io/js/@qavajs%2Fsteps-wdio.svg)](https://badge.fury.io/js/@qavajs%2Fsteps-wdio)

# @qavajs/steps-wdio
Step library to work with webdriverio in qavajs framework

## Installation

`npm install @qavajs/steps-wdio`

## Configuration

```typescript
import App from './page_object';

export default {
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
            element: 2000,//timeout to element to be accesible,
            value: 5000, // expect value timeout
            valueInterval: 500 //expect value interval
        },
        capabilities: {
            browserName: 'chrome'
        }
    },
    pageObject: new App()
}
```

## Screenshots
@qavajs/steps-wdio has build-in capability to take screenshot on particular event. If you need to add 
screenshot to your report add _screenshot_ property to profile config.
Supported events:
- onFail
- beforeStep
- afterStep

```typescript
export default {
    browser: {
        capabilities: {
            browserName: 'chrome'
        },
        screenshot: {
            event: ['onFail']
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

```typescript
export default {
    browser: {
        capabilities: {
            browserName: 'chrome'
        },
        snapshot: {
            event: ['onFail']
        }
    }
}
```

## reuseSession
reuseSession flag allows to share session between tests in frames of process. But setting of this flag 
transfer session control to user.

```javascript
export default {
    browser: {
        reuseSession: true
    }
}
```


