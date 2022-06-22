# @qavajs/steps-wdio
Step library to work with webdriver io using DSL page object

```javascript
const App = require('./page_object');
module.exports = {
    default: {
        require: [
            '@qavajs/steps-config-loader',
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

## Steps
[implemented steps](docs/steps.md)
