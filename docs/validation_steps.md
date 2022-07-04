# Validation Steps

---
### I expect {element} {conditionWait} &#9989;

Verify that element satisfies certain condition

|     param     |   type   |        description         |             example              |
|:-------------:|:--------:|:--------------------------:|:--------------------------------:|
|    element    | Element  | element to check condition |           Search Input           |
| conditionWait | Function | function to wait condition | to be visible, not to be present |
example:
```gherkin
    Then I expect 'Header' to be visible
    Then I expect 'Loading' not to be present
    Then I expect 'Search Bar > Submit Button' to be clickable
```

---
### I expect number of elements in {element} collection {validation} {text} &#9989;

Verify that number of element in collection satisfies condition

|     param     |     type     |          description          |                example                |
|:-------------:|:------------:|:-----------------------------:|:-------------------------------------:|
|  collection   | ElementArray | collection to check condition |            Search Results             |
|  validation   |   Function   | function to verify condition  | to be equal, to be above, to be below |
| expectedValue |    number    |        expected value         |                                       |
example:
```gherkin
    Then I expect number of elements in 'Search Results' collection to be equal '50'
    Then I expect number of elements in 'Search Results' collection to be above '49'
    Then I expect number of elements in 'Search Results' collection to be below '51'
```

---
### I expect text of {element} {validation} {text} &#9989;

Verify that text of element satisfies condition

|     param     |   type   |        description         |                example                |
|:-------------:|:--------:|:--------------------------:|:-------------------------------------:|
|    element    | Element  | element to check condition |  Label, #1 of Search Results > Title  |
|  validation   | Function |      validation type       | to be equal, to contain, not to match |
| expectedValue |  string  |      expected result       |                                       |

example:
```gherkin
   Then I expect text of '#1 of Search Results' to be equal 'google'
```
---
### I expect {text} property of {element} {validation} {text} &#9989;

Verify that property of element satisfies condition

|     param     |   type   |        description         |                example                |
|:-------------:|:--------:|:--------------------------:|:-------------------------------------:|
|   property    |  string  |  property check condition  |    value, href, checked, innerHTML    |
|    element    | Element  | element to check condition |  Label, #1 of Search Results > Title  |
|  validation   | Function |      validation type       | to be equal, to contain, not to match |
| expectedValue |  string  |      expected result       |                                       |

example:
```gherkin
    Then I expect 'value' property of 'Search Input' to be equal 'text'
    Then I expect 'innerHTML' property of 'Label' to contain '<b>'
```
---
### I expect {text} attribute of {element} {validation} {text} &#9989;

Verify that attribute of element satisfies condition

|     param     |   type   |        description         |                example                |
|:-------------:|:--------:|:--------------------------:|:-------------------------------------:|
|   attribute   |  string  | attribute check condition  |             href, checked             |
|    element    | Element  | element to check condition |  Label, #1 of Search Results > Title  |
|  validation   | Function |      validation type       | to be equal, to contain, not to match |
| expectedValue |  string  |      expected result       |                                       |

example:
```gherkin
    Then I expect 'href' attribute of 'Home Link' to contain '/home''
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
