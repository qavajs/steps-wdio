# Memory Steps
 
---
### I save text of {element} as {string} &#9989;

Save text of element to memory

|  param  |  type   |     description      |               example               |
|:-------:|:-------:|:--------------------:|:-----------------------------------:|
| element | Element | element to get value | Label, #1 of Search Results > Title |
|   key   | string  |  key to store value  |                                     |

example:
```gherkin
   When I save text of '#1 of Search Results' as 'firstSearchResult'
```
---
### I save {text} property of {element} as {string} &#9989;

Save property of element to memory

|  param   |  type   |     description      |               example               |
|:--------:|:-------:|:--------------------:|:-----------------------------------:|
| property | string  |  property to store   |   value, href, checked, innerHTML   |
| element  | Element | element to get value | Label, #1 of Search Results > Title |
|   key    | string  |  key to store value  |                                     |


example:
```gherkin
    When I save 'checked' property of 'Checkbox' as 'checked'
    When I save '$prop' property of 'Checkbox' as 'checked'
```
---
### I save {text} attribute of {element} as {string} &#9989;

Save attribute of element to memory

|   param   |  type   |     description      |               example               |
|:---------:|:-------:|:--------------------:|:-----------------------------------:|
| attribute | string  |  attribute to store  |            href, checked            |
|  element  | Element | element to get value | Label, #1 of Search Results > Title |
|    key    | string  |  key to store value  |                                     |

example:
```gherkin
    When I save 'href' attribute of 'Link' as 'linkHref'
    When I save '$prop' attribute of 'Link' as 'linkHref'
```
---
### I save number of elements in {element} collection as {string} &#9989;

Save number of elements in collection to memory

|   param    |     type     |       description       |                example                |
|:----------:|:------------:|:-----------------------:|:-------------------------------------:|
| collection | ElementArray | collection to get value |            Search Results             |
|    key     |    string    |   key to store value    |                                       |
example:
```gherkin
    When I save number of elements in 'Search Results' as 'numberOfSearchResults'
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
