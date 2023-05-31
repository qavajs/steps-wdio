# Change Log

All notable changes to the "@qavajs/steps-wdio" will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

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
