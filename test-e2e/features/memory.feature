Feature: memory

  Background:
    When I open '$valuesPage' url

  Scenario: element text
    When I save text of 'Simple Text Element' as 'memory'
    Then I expect '$memory' memory value to be equal 'text value'

  Scenario: collection number of elements
    When I save number of elements in 'Simple Text List Items' collection as 'memory'
    Then I expect '$memory' memory value to be equal '$js(3)'

  Scenario: element property
    When I save 'value' property of 'Simple Text Input' as 'memory'
    Then I expect '$memory' memory value to be equal '123'

  Scenario: element attribute
    When I save 'name' attribute of 'Simple Text Input' as 'memory'
    Then I expect '$memory' memory value to be equal 'textInputName'

  Scenario: current url
    When I save current url as 'memory'
    Then I expect '$memory' memory value to be equal '$valuesPage'

  Scenario: page title
    Then I save page title as 'memory'
    Then I expect '$memory' memory value to be equal '@qavajs'

  Scenario: collection text of elements
    Then I save text of every element of 'Simple Text List Items' collection as 'memory'
    Then I expect '$memory' memory value to be equal '$array("first value", "second value", "third value")'

  Scenario: collection attribute of elements
    Then I save 'id' attribute of every element of 'Simple Text List Items' collection as 'memory'
    Then I expect '$memory' memory value to be equal '$array("firstValue", "secondValue", "thirdValue")'

  Scenario: collection property of elements
    Then I save 'nodeName' property of every element of 'Simple Text List Items' collection as 'memory'
    Then I expect '$memory' memory value to be equal '$array("LI", "LI", "LI")'

  Scenario: element css property
    When I save 'background-color' css property of 'Simple Text Input' as 'color'
    When I save 'font-size' css property of '#1 of Simple Text List Items' as 'fontSize'
    Then I expect '$color' memory value to be equal 'rgb(95, 158, 160)'
    Then I expect '$fontSize' memory value to be equal '20px'

  Scenario: element screenshot
    When I save screenshot of 'Simple Text Input' as 'elementScreenshot'
    And I expect '$elementScreenshot' memory value to be defined

  Scenario: page screenshot
    When I save screenshot as 'pageScreenshot'
    And I expect '$pageScreenshot' memory value to be defined

  Scenario: bounding rect
    When I save bounding rect of 'Simple Text Element' as 'boundingRect'
    Then I expect '$boundingRect.height' memory value to be equal '$js(20)'
