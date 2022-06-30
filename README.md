# @qavajs/steps-wdio
Step library to work with webdriverio using DSL page object

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
## Parameter Types

[types](docs/parameter_types.md)

## Steps
[action steps](docs/action_steps.md)

[validation steps](docs/validation_steps.md)

[wait steps](docs/wait_steps.md)
