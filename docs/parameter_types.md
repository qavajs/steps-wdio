## Parameter types

-------
### {element}
Type that resolves string selector to wdio element

usage:
```gherkin
When I click 'Login Form > Login Button'
```
In step definition it will be resolved into 
corresponding element from page object
```javascript
When('I click {element}', async function (element: Element<'async'>) {
    await (await element).click();
});
```

-------
### {locator}
Type that resolves into function that returns wdio element

usage:
```gherkin
When I click 'Login Form > Login Button'
```
In step definition it will be resolved function that 
returns wdio element. It helps to handle element 
that dynamically created and removed in DOM.  
```javascript
When('I click {locator}', async function (locator: Locator) {
    const element = await locator();
    await element.click();
});
```

-------
### {conditionWait}
Type that resolves into function 
that perform wait for element certain condition like visibility, existing, etc

possible values:
* to be visible
* to be present
* to be clickable
* to be invisible

values can re reversed by adding _not_ before: not to be visible

usage:
```gherkin
When I wait until 'Header' to be visible
```
In step definition it will be resolved into function that
takes element and timeout and perform necessary wait
```javascript
When('I wait until {element} {conditionWait}', async function (element, wait) {
    await wait(await element, config.browser.timeout.page);
});
```

-------
### {valueWait}
Type that resolves into function
that perform wait of changing value provided in for of
get function

possible values:
* to be equal
* to contain
* to be above
* to be below

values can re reversed by adding _not_ before: not to be equal

usage:
```gherkin
When I wait until text of 'Header' to be equal 'Javascript'
```
In step definition it will be resolved into function that
takes function that returns changing value, expected value and timeout
```javascript
When(
    'I wait until text of {element} {valueWait} {text}',
    async function (element: Element<'async'>, wait: Function, expectedValue: any) {
        const getValue = async () => (await element).getText();
        await wait(getValue, expectedValue, config.browser.timeout.page);
    }
);
```

