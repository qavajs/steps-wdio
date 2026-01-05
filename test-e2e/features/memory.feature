Feature: memory

  Background:
    When I open '$valuesPage' url

  @bidi
  @wd
  Scenario: element text
    When I save text of 'Simple Text Element' as 'memory'
    Then I expect '$memory' memory value to be equal 'text value'

  @bidi
  @wd
  Scenario: element input value
    When I save value of 'Simple Text Input' as 'memory'
    Then I expect '$memory' memory value to be equal '123'


  @bidi
  @wd
  Scenario: collection number of elements
    When I save number of elements in 'Simple Text List Items' collection as 'memory'
    Then I expect '$memory' memory value to be equal '$js(3)'

  @bidi
  @wd
  Scenario: element property
    When I save 'value' property of 'Simple Text Input' as 'memory'
    Then I expect '$memory' memory value to be equal '123'

  @bidi
  @wd
  Scenario: element custom property
    When I save '$js(element => element.value)' custom property of 'Simple Text Input' as 'memory'
    Then I expect '$memory' memory value to be equal '123'

  @bidi
  @wd
  Scenario: element attribute
    When I save 'name' attribute of 'Simple Text Input' as 'memory'
    Then I expect '$memory' memory value to be equal 'textInputName'

  @bidi
  @wd
  Scenario: current url
    When I save current url as 'memory'
    Then I expect '$memory' memory value to be equal '$valuesPage'

  @bidi
  @wd
  Scenario: page title
    Then I save page title as 'memory'
    Then I expect '$memory' memory value to be equal '@qavajs'

  @bidi
  @wd
  Scenario: collection text of elements
    Then I save text of every element of 'Simple Text List Items' collection as 'memory'
    Then I expect '$memory' memory value to be equal '$array("first value", "second value", "third value")'

  @bidi
  @wd
  Scenario: collection attribute of elements
    Then I save 'id' attribute of every element of 'Simple Text List Items' collection as 'memory'
    Then I expect '$memory' memory value to be equal '$array("firstValue", "secondValue", "thirdValue")'

  @bidi
  @wd
  Scenario: collection property of elements
    Then I save 'nodeName' property of every element of 'Simple Text List Items' collection as 'memory'
    Then I expect '$memory' memory value to be equal '$array("LI", "LI", "LI")'

  @bidi
  @wd
  Scenario: collection custom property of elements
    Then I save '$js(element => element.nodeName)' custom property of every element of 'Simple Text List Items' collection as 'memory'
    Then I expect '$memory' memory value to be equal '$array("LI", "LI", "LI")'

  @bidi
  @wd
  Scenario: element css property
    When I save 'background-color' css property of 'Simple Text Input' as 'color'
    When I save 'font-size' css property of 'Simple Text List Item By Index (1)' as 'fontSize'
    Then I expect '$color' memory value to be equal 'rgb(95, 158, 160)'
    Then I expect '$fontSize' memory value to be equal '20px'

  @bidi
  @wd
  Scenario: element screenshot
    When I save screenshot of 'Simple Text Input' as 'elementScreenshot'
    And I expect '$elementScreenshot' memory value to be defined

  @bidi
  @wd
  Scenario: page screenshot
    When I save screenshot as 'pageScreenshot'
    And I expect '$pageScreenshot' memory value to be defined

  @bidi
  @wd
  Scenario: bounding rect
    When I save bounding rect of 'Simple Text Element' as 'boundingRect'
    Then I expect '$boundingRect.height' memory value to be equal '$js(20)'
