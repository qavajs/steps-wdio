Feature: actions

  Background:
    When I open '$actionsPage' url

  Scenario: click
    When I click 'Button'
    Then I expect text of 'Action' to be equal 'click'

  Scenario: click with disabled actionability check
    When I click 'Button' (disable actionability wait)
    Then I expect text of 'Action' to be equal 'click'

  Scenario: right click
    When I right click 'Button'
    Then I expect text of 'Action' to be equal 'rightclick'

  Scenario: right click with disabled actionability check
    When I right click 'Button' (disable actionability wait)
    Then I expect text of 'Action' to be equal 'rightclick'

  Scenario: double click
    When I double click 'Button'
    Then I expect text of 'Action' to be equal 'dblclick'

  Scenario: double click with disabled actionability check
    When I double click 'Button' (disable actionability wait)
    Then I expect text of 'Action' to be equal 'dblclick'

  Scenario: force click
    When I force click 'Button'
    Then I expect text of 'Action' to be equal 'click'

  Scenario: type
    When I type 'test value' to 'Input'
    Then I expect text of 'Action' to be equal 'test value'

  Scenario: clear
    When I type 'test value' to 'Input'
    When I clear 'Input'
    Then I expect 'value' property of 'Input' to be equal ''

  Scenario: click in collection by text
    When I click 'Button2' text in 'Buttons' collection
    Then I expect text of 'Action' to be equal 'Button2'

  Scenario: switch to frame
    When I expect 'Button' to be visible
    When I expect 'Frame Element' not to be visible
    When I switch to 1 frame
    When I expect 'Button' not to be visible
    When I expect 'Frame Element' to be visible
    When I switch to parent frame
    When I expect 'Button' to be visible
    When I expect 'Frame Element' not to be visible

  Scenario: switch to tab by index
    When I click 'New Tab Link'
    When I wait 1000 ms
    When I switch to 2 window
    Then I expect current url to contain 'frame.html'
    When I expect 'Frame Element' to be visible

  Scenario: switch to tab by matcher
    When I click 'New Tab Link'
    When I wait 1000 ms
    When I switch to 'Frame' window
    Then I expect current url to contain 'frame.html'
    When I expect 'Frame Element' to be visible

  Scenario: refresh page
    When I type 'test value' to 'Input'
    Then I expect text of 'Action' to be equal 'test value'
    When I refresh page
    Then I expect text of 'Action' to be equal 'Nothing'

  Scenario Outline: press <Key> key
    When I press '<Key>' key
    Then I expect text of 'Action' to be equal 'keypress'

    Examples:
      | Key    |
      | w      |
      | Enter  |
      | $Enter |

  Scenario: press key with modifier
   And I press 'Alt+a' key
   Then I expect text of 'Key Dump' to contain '"keyCode":65'
   Then I expect text of 'Key Dump' to contain '"altKey":true'

  Scenario Outline: press <Key> key multiple times
    When I press '<Key>' key <Times> time<Postfix>
    Then I expect text of 'Press Counter' to be equal '<Result>'

    Examples:
      | Key    | Times | Postfix | Result                |
      | $Enter | 1     |         | pressed Enter 1 times |
      | $Space | 5     | s       | pressed Space 5 times |

  Scenario: hover
    When I hover over 'Button Hover'
    Then I expect text of 'Action' to be equal 'hover'

  Scenario: select input by text
    When I select 'two' option from 'Select' dropdown
    Then I expect text of 'Action' to be equal 'select two'

  Scenario: select input by index
    When I select 2 option from 'Select' dropdown
    Then I expect text of 'Action' to be equal 'select two'

  Scenario: browser back and forward
    When I open '$valuesPage' url
    When I click back button
    Then I expect current url to contain 'actions.html'
    When I click forward button
    Then I expect current url to contain 'values.html'

  Scenario: scroll in window
    When I scroll by '0, 100'
    And I execute 'window.scrollX' function and save result as 'scrollX'
    And I execute 'window.scrollY' function and save result as 'scrollY'
    Then I expect '$scrollX' memory value to be equal '$number(0)'
    Then I expect '$scrollY' memory value to be equal '$number(100)'

  Scenario: scroll in element
    When I scroll by '0, 50' in 'Overflow Container'
    And I execute 'document.querySelector("#overflowContainer").scrollLeft' function and save result as 'scrollX'
    And I execute 'document.querySelector("#overflowContainer").scrollTop' function and save result as 'scrollY'
    Then I expect '$scrollX' memory value to be equal '$number(0)'
    Then I expect '$scrollY' memory value to be equal '$number(50)'

  Scenario: type in ignore hierarchy component
    When I type 'test value' to 'Ignore Hierarchy Component > Input'
    Then I expect text of 'Action' to be equal 'test value'

  Scenario: type in component without selector
    When I type 'test value' to 'Component Without Selector > Input'
    Then I expect text of 'Action' to be equal 'test value'

  Scenario: upload file
    When I upload '$uploadFile' file to 'File Input'
    And I wait 3000 ms
    Then I expect text of 'Action' to be equal 'file:C:\fakepath\actions.html'

  Scenario: content editable
    When I click 'Content Editable Text'
    And I press 'Backspace' key
    Then I expect text of 'Content Editable Text' to be equal 'this is content editable tex'

  Scenario: accept alert
    When I click "Alert Button"
    And I wait for alert
    And I accept alert
    Then I expect text of 'Action' to be equal 'true'

  Scenario: dismiss alert
    When I click "Alert Button"
    And I wait for alert
    And I dismiss alert
    Then I expect text of 'Action' to be equal 'false'

  Scenario: type text to alert
    When I expect text of 'Action' to be equal 'Nothing'
    And I click "Prompt Button"
    And I type 'I am not a robot' to alert
    Then I expect text of 'Action' to be equal 'I am not a robot'

  Scenario: expect text of alert
    When I click "Alert Button"
    And I wait for alert
    Then I expect text of alert to be equal 'Are you robot?'
