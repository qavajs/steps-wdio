# Change Log

All notable changes to the "@qavajs/steps-wdio" will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

:rocket: - new feature  

:beetle: - bugfix  

:x: - deprecation/removal  

:pencil: - chore  

:microscope: - experimental

## [2.2.0]
- :rocket: added `I expect {value} css property of every element in {wdioLocator} collection {validation} {value}` step

## [2.1.2]
- :rocket: added capability to pass object as `pageObject` property

## [2.1.1]
- :beetle: fixed resolving empty selector logic for collections

## [2.1.0]
- :rocket: added `locator.as` method to define top level components (like pages)
```typescript
export class App {
  LoginPage = locator.as(LoginPage);
}

class LoginPage {
  username = locator('#username');
  password = locator('#password');
}
```
- :beetle: fixed publishing workflow
- :pencil: update dependencies 

## [2.0.1]
- :beetle: fixed index import
- :beetle: fixed `reuseSession` flag

## [2.0.0]
- :pencil: added memory processor to playwrightLocator parameter type
- :rocket: new page object approach

## [0.55.1]
- :pencil: update wdio dependency

## [0.55.0]
- :rocket: upgraded to wdio9 (devtools protocol is deprecated)
  Breaking changes: 
- _I wait for alert step is removed_
- mock and intercept steps work only with deprecated devtools protocol
  Known issues: some step definitions are not working with bidi protocol (use `'wdio:enforceWebDriverClassic': true` capability)
- _I switch to {int} frame_
- _I switch to {int} window_
- _I switch to {string} window_

## [0.54.0]
- :rocket: updated po types

## [0.53.1]
- :beetle: fixed issue with saving data from collection

## [0.53.0]
Breaking change:
- :rocket: include page objects into step bundle
  Migration guide: replace all po-playwright lib imports `@qavajs/po` to `@qavajs/steps-wdio/po`

## [0.52.0]
- :rocket: added _I click {string} until text of {string} {wdioValidation} {string}( ){wdioTimeout}_ step
- :rocket: added _I click {string} until value of {string} {wdioValidation} {string}( ){wdioTimeout}_ step

## [0.51.0]
Breaking change: moved _@qavajs/validation_ to peer dependencies
After update please install latest version of @qavajs/validation package

## [0.50.0]
- :rocket: added _I refresh page until text of {string} {wdioValidation} {string}( ){wdioTimeout}_ step
- :rocket: added _I refresh page until {string} {wdioConditionWait}( ){wdioTimeout}_ step

## [0.49.0]
- :rocket: added value wait and validation 

## [0.48.0]
- :x: top level _config.screenshot_ property was removed. Define this property in _config.browser.screenshot_
- :pencil: updated wdio version

## [0.47.0]
- :rocket: updated webdriverio dependency

## [0.46.0]
- :rocket: added _I scroll until {string} to be visible_ step
- :rocket: added _I scroll in {string} until {string} to be visible_ step
- :rocket: reworked scroll steps to use wheel action

## [0.45.0]
- :rocket: added _I type {string} chars to {string}_ to send find-grained events

## [0.44.1]
- :rocket: added present validation before value wait to prevent promise rejection without reason error

## [0.44.0]
- :rocket: changed simple expects to poll expects
- :rocket: updated _I switch to {string} window step_ to wait window existence
- :rocket: replaced _wdioValueWait_ type with more generic _wdioValidation_ allowing more wait types
Breaking change: value waits now depends on _value_ timeout

## [0.43.0]
- :rocket: enabled logger in po

## [0.42.0]
- :rocket: added _I close current tab_ step

## [0.41.0]
- :rocket: added _match_ value wait
- :rocket: added _I wait until {string} css property of {string} {wdioValueWait} {string}( ){wdioTimeout}_ step
- :beetle: fix `Cannot read properties of undefined (reading 'status')`

## [0.40.0]
- :rocket: added _I save bounding rect of {string} as {string}_ step

## [0.39.0]
- :rocket: added _I set window size {string}_ step

## [0.38.0]
- :rocket: added _I click {string} coordinates in {string}_ step

## [0.37.0]
- :rocket: added _I push {string} file as {string}_ step
- :rocket: added _I pull {string} file as {string}_ step
- :rocket: made hooks named

## [0.36.0]
- :rocket: added experimental snapshot attach

Deprecated:
- :x: screenshot property moved to browser/driver config. 
Screenshot under root is marked as deprecated and will be removed in future releases. 

## [0.35.0]
- :rocket: added _I expect every element in {string} collection {wdioConditionWait}_ step
- :rocket: added check if returned entity is collection in collection validations

## [0.34.0]
- :rocket: added reuseSession capability

## [0.33.0]
- :rocket: added _I save screenshot of 'Element'_ step

## [0.32.0]
- :rocket: added mouse and keyboard actions steps

## [0.31.0]
- :beetle: fixed regexp in dynamic po steps

## [0.0.30]
- :rocket: added types to global members
- :rocket: added _I open new tab_
- :rocket: added steps to work with multiple browser contexts

## [0.0.29]
- :rocket: added _I drag and drop..._ step

## [0.0.28]
- :rocket: implemented steps to dynamically define page object

## [0.0.27]
- :rocket: implemented immediate resolve in case of not present wait 

## [0.0.26]
- :rocket: added network interceptor steps
- :rocket: added _I force click_ step
- :beetle: fixed cookie and local storage steps

## [0.0.25]
- :rocket: added _element_ timeout to wait element availability (instead of present that used before)
- :grey_question: removed node14 from PR pipeline
 
## [0.0.24]
- :rocket: added capability to press key with modifiers

## [0.0.23]
- :rocket: changed actionability wait to clickable in clicks
- :rocket: added capability to disable actionability check in clicks
- :beetle: fixed optional params templates in wait steps

## [0.0.22]
- :rocket: added logs for validation steps

## [0.0.21]
- :rocket: added custom timeout parameter

## [0.0.20]
- :rocket: added JS alert steps

## [0.0.19]
- :beetle: fixed browserstack timeout issue

## [0.0.18]
- :rocket: added _I upload file_ step
- :beetle: fixed key issue

## [0.0.17]
- :rocket: removed po package dependency
- :rocket: added util functions exports to build custom steps

## [0.0.16]
- :rocket: added scroll by offset steps
- :rocket: updated po dependency to support ignoreHierarchy options

## [0.0.15]
- :rocket: added mock steps

## [0.0.14]
- :rocket: updated wdio version to 8
- :rocket: added I press Y key X times step
- :rocket: added I execute steps allow to execute client functions
- :grey_question: added workaround to use keys in wdio8

## [0.0.13]
- :rocket: added I wait until current url step
- :rocket: added I wait until page title step
- :rocket: added capability to set implicit timeout

## [0.0.12]
- :rocket: added I click back/forward button step
- :rocket: added I save css property step
- :rocket: added I expect css property step
- :beetle: fixed after issue if browser not started

## [0.0.11]
- :rocket: added I scroll to {string} step
- :rocket: added to be in viewport condition validation
