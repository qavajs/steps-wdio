[![npm version](https://badge.fury.io/js/@qavajs%2Fsteps-wdio.svg)](https://badge.fury.io/js/@qavajs%2Fsteps-wdio)

# @qavajs/steps-wdio

**`@qavajs/steps-wdio`** provides 100+ pre-built Cucumber step definitions for [qavajs](https://github.com/qavajs/qavajs), powered by [WebdriverIO](https://webdriver.io/).
Write browser and mobile automation in plain Gherkin — no glue code required.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Page Object](#page-object)
- [Steps Reference](#steps-reference)
  - [Actions](#actions)
  - [Validations](#validations)
  - [Waits](#waits)
  - [Memory](#memory)
  - [Mouse Actions](#mouse-actions)
  - [Keyboard Actions](#keyboard-actions)
  - [Dialogs](#dialogs)
  - [Cookies](#cookies)
  - [Storage](#storage)
  - [Execute Script](#execute-script)
  - [Mock](#mock)
  - [Intercept](#intercept)
  - [Mobile](#mobile)
- [Screenshots](#screenshots)
- [Snapshots](#snapshots)
- [Session Reuse](#session-reuse)
- [TypeScript](#typescript)

---

## Installation

```
npm install @qavajs/steps-wdio
```

---

## Configuration

Register the step definitions in your qavajs config and configure the `browser` section:

```typescript
import App from './page_object';

export default {
    require: [
        'node_modules/@qavajs/steps-wdio/index.js'
    ],
    pageObject: new App(),
    browser: {
        capabilities: {
            browserName: 'chrome'
        },
        timeout: {
            present: 10000,          // ms to wait for element to be present in DOM
            visible: 20000,          // ms to wait for element to be visible
            clickable: 15000,        // ms to wait for element to be clickable
            page: 10000,             // page load timeout
            implicit: 0,             // WebdriverIO implicit wait
            element: 2000,           // ms for element to be accessible
            value: 5000,             // timeout for value-based assertions
            valueInterval: 500,      // polling interval for value assertions
            actionInterval: 1000,    // polling interval for action retry loops
            pageRefreshInterval: 2000 // interval between page refreshes in wait steps
        }
    }
}
```

---

## Page Object

Define your page object using the `locator` helper exported from `@qavajs/steps-wdio/po`:

```typescript
import { locator } from '@qavajs/steps-wdio/po';

class BodyComponent {
    TextElement = locator('#textValue');
    SubmitButton = locator('button[type=submit]');
}

export default class App {
    // Simple CSS/XPath selector
    SearchInput = locator('#search');

    // Template selector — alias text in parentheses is passed as argument
    ListItemByIndex = locator.template(idx => `li:nth-child(${idx})`);

    // Native WebdriverIO selector — full access to browser/driver
    NativeButton = locator.native(({ driver }) => driver.$('#button'));

    // Component composition — resolves nested selectors relative to parent
    Body = locator('body').as(BodyComponent);

    // Default resolver — handles any alias not explicitly defined
    defaultResolver({ alias }: { alias: string }) {
        return ({ parent }: { parent: any }) => parent.$(`//*[text()="${alias}"]`);
    }
}
```

Reference elements in steps using the class property name in **Title Case** (spaces between words):

```gherkin
When I click 'Search Input'
Then I expect text of 'Body > Text Element' to be equal 'hello'
Then I expect text of 'List Item By Index (3)' to be equal 'item 3'
```

Use `>` to traverse component chains and parentheses to pass template arguments.

---

## Steps Reference

### Actions

| Step | Description |
|------|-------------|
| `I open {url} url` | Navigate to URL |
| `I click {element}` | Click an element |
| `I double click {element}` | Double-click an element |
| `I right click {element}` | Right-click an element |
| `I force click {element}` | Click via JS (bypasses visibility checks) |
| `I click {value} text in {element} collection` | Click element in collection matching text |
| `I click {value} coordinates in {element}` | Click at relative x,y coordinates |
| `I type {value} into {element}` | Type text into an element |
| `I type {value} chars into {element}` | Type text character by character |
| `I clear {element}` | Clear input value |
| `I press {value} key(s)` | Press key or key chord (e.g. `Control+A`) |
| `I press {value} key(s) {int} time(s)` | Press key N times |
| `I select {value} option from {element} dropdown` | Select option by text |
| `I select {int}(st\|nd\|rd\|th) option from {element} dropdown` | Select option by index |
| `I scroll to {element}` | Scroll element into view |
| `I scroll by {value}` | Scroll page by `x, y` pixels |
| `I scroll by {value} in {element}` | Scroll inside element |
| `I scroll until {element} to be visible` | Scroll page until element is visible |
| `I scroll in {element} until {element} to be visible` | Scroll inside element until target visible |
| `I hover over {element}` | Move mouse over element |
| `I drag and drop {element} to {element}` | Drag source onto target |
| `I upload {value} file to {element}` | Set file path on a file input |
| `I switch to {int} frame` | Switch to frame by index |
| `I switch to {element} frame` | Switch to frame by element |
| `I switch to parent frame` | Switch back to parent frame |
| `I switch to {int} window` | Switch to browser tab by index |
| `I switch to {value} window` | Switch to browser tab by title |
| `I open new tab` | Open a new browser tab |
| `I close current tab` | Close the current browser tab |
| `I refresh page` | Reload the current page |
| `I click {button} button` | Click browser Back or Forward button |
| `I set window size {value}` | Resize window to `width x height` |

---

### Validations

Conditions: `present`, `not present`, `visible`, `not visible`, `clickable`, `not clickable`, `enabled`, `disabled`, `in viewport`, `not in viewport`, `fully in viewport`, `not fully in viewport`

| Step | Description |
|------|-------------|
| `I expect {element} {condition}` | Assert element state |
| `I expect text of {element} {validation} {value}` | Assert element text |
| `I expect value of {element} {validation} {value}` | Assert input value |
| `I expect {property} property of {element} {validation} {value}` | Assert JS property |
| `I expect {attribute} attribute of {element} {validation} {value}` | Assert HTML attribute |
| `I expect {property} css property of {element} {validation} {value}` | Assert CSS property |
| `I expect {customProperty} custom property of {element} {validation} {value}` | Assert custom script result |
| `I expect number of elements in {element} collection {validation} {value}` | Assert collection size |
| `I expect text of every element in {element} collection {validation} {value}` | Assert all texts match |
| `I expect every element in {element} collection {condition}` | Assert all elements match condition |
| `I expect {attribute} attribute of every element in {element} collection {validation} {value}` | Assert attribute on each element |
| `I expect {property} property of every element in {element} collection {validation} {value}` | Assert property on each element |
| `I expect {property} css property of every element in {element} collection {validation} {value}` | Assert CSS on each element |
| `I expect {customProperty} custom property of every element in {element} collection {validation} {value}` | Assert custom property on each element |
| `I expect current url {validation} {value}` | Assert current page URL |
| `I expect page title {validation} {value}` | Assert page title |

---

### Waits

| Step | Description |
|------|-------------|
| `I wait {int} ms` | Pause execution for N milliseconds |
| `I refresh page until {element} {condition}( ){timeout}` | Refresh until element meets condition |
| `I refresh page until text of {element} {validation} {value}( ){timeout}` | Refresh until text matches |
| `I click {element} until text of {element} {validation} {value}( ){timeout}` | Click until text matches |
| `I click {element} until value of {element} {validation} {value}( ){timeout}` | Click until value matches |

Timeout is optional and expressed as `{int}ms` or `{int}s` (e.g. `3000ms`, `10s`).

---

### Memory

Save element state to memory and reference it later with `$key` syntax.

| Step | Description |
|------|-------------|
| `I save text of {element} as {key}` | Save element text |
| `I save value of {element} as {key}` | Save input value |
| `I save {property} property of {element} as {key}` | Save JS property |
| `I save {attribute} attribute of {element} as {key}` | Save HTML attribute |
| `I save {cssProperty} css property of {element} as {key}` | Save CSS property value |
| `I save {customProperty} custom property of {element} as {key}` | Save custom script result |
| `I save number of elements in {element} collection as {key}` | Save collection count |
| `I save text of every element of {element} collection as {key}` | Save array of texts |
| `I save {attribute} attribute of every element of {element} collection as {key}` | Save array of attributes |
| `I save {property} property of every element of {element} collection as {key}` | Save array of properties |
| `I save {customProperty} custom property of every element of {element} collection as {key}` | Save array of custom properties |
| `I save current url as {key}` | Save current URL |
| `I save page title as {key}` | Save page title |
| `I save screenshot as {key}` | Save full-page screenshot as base64 |
| `I save screenshot of {element} as {key}` | Save element screenshot as base64 |
| `I save bounding rect of {element} as {key}` | Save element bounding rect object |

```gherkin
When I save text of 'Header' as 'heading'
Then I expect text of 'Title' to be equal '$heading'
```

---

### Mouse Actions

| Step | Description |
|------|-------------|
| `I hover over {element}` | Move pointer over element |
| `I press {button} mouse button` | Hold left / right / middle button |
| `I release {button} mouse button` | Release held mouse button |

---

### Keyboard Actions

| Step | Description |
|------|-------------|
| `I hold down {string} key` | Hold a key (e.g. `"Shift"`) |
| `I release {string} key` | Release a held key |
| `I press {value} key(s)` | Press key or chord (e.g. `Control+A`) |
| `I press {value} key(s) {int} time(s)` | Press key N times |

---

### Dialogs

| Step | Description |
|------|-------------|
| `I will wait for alert` | Register expectation for an upcoming alert |
| `I accept alert` | Accept (OK) the dialog |
| `I dismiss alert` | Dismiss (Cancel) the dialog |
| `I expect alert text {validation} {value}` | Assert dialog message text |

---

### Cookies

| Step | Description |
|------|-------------|
| `I set {name} cookie as {value}` | Set a cookie by name |
| `I save value of {name} cookie as {key}` | Save cookie value to memory |

---

### Storage

| Step | Description |
|------|-------------|
| `I set {key} {storageType} storage value as {value}` | Set `local` or `session` storage item |
| `I save value of {key} {storageType} storage as {key}` | Save storage item to memory |

---

### Execute Script

| Step | Description |
|------|-------------|
| `I execute {script} function` | Execute a JS function from memory/config |
| `I execute {script} script` | Execute an inline JS expression |
| `I execute {script} function and save result as {key}` | Execute function and save return value |
| `I execute {script} script and save result as {key}` | Execute script and save return value |

---

### Mock

Network mocking requires WebdriverIO's `mock` capability (Chrome DevTools / BiDi).

| Step | Description |
|------|-------------|
| `I create mock for {urlTemplate} as {key}` | Create network mock and save reference |
| `I mock {mockKey} to respond with {statusCode} and {body}` | Respond with custom status and body |
| `I mock {mockKey} to abort with {reason}` | Abort matched requests with error reason |
| `I expect mock {mockKey} to {callCount} calls` | Assert number of intercepted calls |

---

### Intercept

| Step | Description |
|------|-------------|
| `I create interception for {urlPattern} as {key}` | Register request interception |
| `I wait for {interceptionKey} response` | Wait until intercepted response arrives |
| `I save request of {interceptionKey} as {key}` | Save intercepted request to memory |
| `I save response of {interceptionKey} as {key}` | Save intercepted response to memory |

---

### Mobile

Additional steps for native mobile automation (Appium):

| Step | Description |
|------|-------------|
| `I tap {element}` | Tap an element |
| `I swipe {direction}` | Swipe up / down / left / right on screen |
| `I swipe {direction} in {element}` | Swipe within a specific element |
| `I shake device` | Shake the device |
| `I lock device` | Lock the device screen |
| `I unlock device` | Unlock the device screen |
| `I set {orientation} orientation` | Set `portrait` or `landscape` orientation |
| `I set device time {value}` | Set device time (format: `HH:mm` or custom) |

---

## Screenshots

Built-in screenshot capture on specific events. Add `screenshot` to the `browser` config:

```typescript
export default {
    browser: {
        capabilities: { browserName: 'chrome' },
        screenshot: {
            event: ['onFail']   // 'onFail' | 'beforeStep' | 'afterStep'
        }
    }
}
```

---

## Snapshots

Built-in page snapshot capture. Add `snapshot` to the `browser` config:

```typescript
export default {
    browser: {
        capabilities: { browserName: 'chrome' },
        snapshot: {
            event: ['onFail']   // 'onFail' | 'beforeStep' | 'afterStep'
        }
    }
}
```

---

## Session Reuse

By default a new browser session is started and closed for each test run. Set `reuseSession: true` to share the session across tests in the same process — session lifecycle then becomes your responsibility:

```typescript
export default {
    browser: {
        reuseSession: true
    }
}
```

---

## TypeScript

The package ships with TypeScript declarations. Extend the config interface and world type in your project:

```typescript
import { IQavajsWdioConfig, QavajsWdioWorld } from '@qavajs/steps-wdio';

// Augment config type
const config: IQavajsWdioConfig = { ... };

// Access wdio browser in custom steps
import { When } from '@cucumber/cucumber';

When('I do something custom', async function (this: QavajsWdioWorld) {
    const browser = this.wdio.browser;
    await browser.execute(() => console.log('hello'));
});
```