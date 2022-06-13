# steps-wdio
Step library to work with webdriver io using DSL page object

```javascript
const App = require('./page_object');
module.exports = {
    default: {
        require: [
            '@yaatp/steps-config-loader',
            '@yaatp/steps-wdio'
        ],
        browser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        pageObject: new App()
    }
}
```
