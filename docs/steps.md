# Steps

### open {memory} url &#9989;

Opens provided url

| param |  type  |   description   |
|:-----:|:------:|:---------------:|
|  url  | string | url to navigate |
example:
```gherkin
   When open 'https://google.com' url
```
---
### type {string} to {element} &#9989;

Type text to element

|  param  |  type   |   description   |
|:-------:|:-------:|:---------------:|
| element | Element | element to type |
|  value  | string  |  value to type  |
example:
```gherkin
   When type 'wikipedia' to 'Google Input'
```
---
### click {element} &#9989;

Click element

|  param  |  type   |   description    |
|:-------:|:-------:|:----------------:|
| element | Element | element to click |
example:
```gherkin
   When click 'Google Button'
```
---
### clear {element} &#9989;

Clear element

|  param  |  type   |   description    |
|:-------:|:-------:|:----------------:|
| element | Element | element to clear |
example:
```gherkin
   When clear 'Google Button'
```
---
### text of {element} element should{reverse} {validation} {memory} &#9989;

Verify that text of element satisfies condition

|   param    |  type   |    description     |
|:----------:|:-------:|:------------------:|
|  element   | Element |  element to clear  |
|  reverse   | boolean | reverse validation |
| validation | string  |  validation type   |
|   value    | string  |  expected result   |

example:
```gherkin
   Then text of '#1 of Search Results' should be equal 'google'
```
---
### template &#9989;&#10060;

Description

| param | type |    description    |
|:-----:|:----:|:-----------------:|
| param | type | param description |
example:
```gherkin
   When example
```
