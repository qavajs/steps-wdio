# Validation Steps

---
### I wait until {element} {conditionWait} {text} &#9989;

Verify that text of element satisfies condition

|   param    |  type   |    description     |
|:----------:|:-------:|:------------------:|
|  element   | Element |  element to clear  |
| validation | string  |  validation type   |
|   value    | string  |  expected result   |

example:
```gherkin
   Then I expect text of '#1 of Search Results' to be equal 'google'
```
---
### I expect text of {element} element {validation} {text} &#9989;

Verify that text of element satisfies condition

|   param    |  type   |    description     |
|:----------:|:-------:|:------------------:|
|  element   | Element |  element to clear  |
| validation | string  |  validation type   |
|   value    | string  |  expected result   |

example:
```gherkin
   Then I expect text of '#1 of Search Results' to be equal 'google'
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
