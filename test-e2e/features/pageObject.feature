@bidi
@wd
Feature: page object

  Background:
    When I open '$valuesPage' url

  Scenario: simple
    Then I expect text of 'Simple Text Element' to be equal 'text value'

  Scenario: template
    Then I expect text of 'Simple Text Element Template (#textValue)' to be equal 'text value'

  Scenario: native
    Then I expect text of 'Simple Text Element Native' to be equal 'text value'

  Scenario: simple component
    Then I expect text of 'Body Component > Text Element' to be equal 'text value'

  Scenario: template component
    Then I expect text of 'Body Component Template (body) > Text Element' to be equal 'text value'

  Scenario: native component
    Then I expect text of 'Body Component Native > Text Element' to be equal 'text value'

  Scenario: template with memory
    When I save '#textValue' to memory as 'selector'
    Then I expect text of 'Simple Text Element Template ({$selector})' to be equal 'text value'

  Scenario: top level component
    Then I expect text of 'Top Level Component > Text Element' to be equal 'text value'