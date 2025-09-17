Feature: actions

  Background:
    When I open '$actionsPage' url

  @bidi
  @wd
  Scenario: click
    When I click 'Button'
    Then I expect text of 'Action' to be equal 'click'

  @bidi
  @wd
  Scenario: right click
    When I right click 'Button'
    Then I expect text of 'Action' to be equal 'rightclick'

  @bidi
  @wd
  Scenario: double click
    When I double click 'Button'
    Then I expect text of 'Action' to be equal 'dblclick'

  @bidi
  @wd
  Scenario: force click
    When I force click 'Button'
    Then I expect text of 'Action' to be equal 'click'

  @bidi
  @wd
  Scenario Outline: type (<word>)
    When I type 'test value' <word> 'Input'
    Then I expect text of 'Action' to be equal 'test value'

    Examples:
      | word |
      | to   |
      | into |

  @bidi
  @wd
  Scenario Outline: type chars (<word>)
    When I type 'test value' chars <word> 'Input'
    Then I expect text of 'Action' to be equal 'test value'

    Examples:
      | word |
      | to   |
      | into |

  @bidi
  @wd
  Scenario: clear
    When I type 'test value' to 'Input'
    When I clear 'Input'
    Then I expect 'value' property of 'Input' to be equal ''

  @bidi
  @wd
  Scenario: click in collection by text
    When I click 'Button2' text in 'Buttons' collection
    Then I expect text of 'Action' to be equal 'Button2'

  @bidi
  @wd
  Scenario: switch to frame
    When I expect 'Button' to be visible
    When I expect 'Frame Element' not to be visible
    When I switch to 1 frame
    When I expect 'Button' not to be visible
    When I expect 'Frame Element' to be visible
    When I switch to parent frame
    When I expect 'Button' to be visible
    When I expect 'Frame Element' not to be visible

  @bidi
  @wd
  Scenario: switch to tab by index
    When I click 'New Tab Link'
    When I switch to 2 window
    Then I expect current url to contain 'frame.html'
    When I expect 'Frame Element' to be visible

  @bidi
  @wd
  Scenario: switch to tab by matcher
    When I click 'New Tab Link'
    When I switch to 'Frame' window
    Then I expect current url to contain 'frame.html'
    When I expect 'Frame Element' to be visible

  @bidi
  @wd
  Scenario: refresh page
    When I type 'test value' to 'Input'
    Then I expect text of 'Action' to be equal 'test value'
    When I refresh page
    Then I expect text of 'Action' to be equal 'Nothing'

  @bidi
  @wd
  Scenario Outline: press <Key> key
    When I press '<Key>' key
    Then I expect text of 'Action' to be equal 'keypress'

    Examples:
      | Key    |
      | w      |
      | Enter  |

  @bidi
  @wd
  Scenario: press key with modifier
    And I press 'Alt+a' key
    Then I expect text of 'Key Dump' to contain '"keyCode":65'
    Then I expect text of 'Key Dump' to contain '"altKey":true'

  @bidi
  @wd
  Scenario Outline: press <Key> key multiple times
    When I press '<Key>' key <Times> time<Postfix>
    Then I expect text of 'Press Counter' to contain '<Result>'

    Examples:
      | Key   | Times | Postfix | Result  |
      | Enter | 1     |         | 1 times |
      | Space | 5     | s       | 5 times |

  @bidi
  @wd
  Scenario: hover
    When I hover over 'Button Hover'
    Then I expect text of 'Action' to be equal 'hover'

  @bidi
  @wd
  Scenario: select input by text
    When I select 'two' option from 'Select' dropdown
    Then I expect text of 'Action' to be equal 'select two'

  @bidi
  @wd
  Scenario: select input by index
    When I select 2 option from 'Select' dropdown
    Then I expect text of 'Action' to be equal 'select two'

  @bidi
  @wd
  Scenario: browser back and forward
    When I open '$valuesPage' url
    When I click back button
    Then I expect current url to contain 'actions.html'
    When I click forward button
    Then I expect current url to contain 'values.html'

  @wd
  @bidi
  Scenario: scroll in window
    When I scroll by '0, 100'
    And I execute 'return window.scrollX' function and save result as 'scrollX'
    And I execute 'return window.scrollY' function and save result as 'scrollY'
    Then I expect '$scrollX' memory value to be equal '$js(0)'
    Then I expect '$scrollY' memory value to be equal '$js(100)'

  @wd
  @bidi
  Scenario: scroll in element
    When I scroll by '0, 50' in 'Overflow Container'
    And I wait 500 ms
    And I execute 'return document.querySelector("#overflowContainer").scrollLeft' function and save result as 'scrollX'
    And I execute 'return document.querySelector("#overflowContainer").scrollTop' function and save result as 'scrollY'
    Then I expect '$scrollX' memory value to be equal '$js(0)'
    Then I expect '$scrollY' memory value to be equal '$js(50)'

  @bidi
  @wd
  Scenario: upload file
    When I upload '$uploadFile' file to 'File Input'
    And I wait 3000 ms
    Then I expect text of 'Action' to be equal 'file:C:\fakepath\actions.html'

  @bidi
  @wd
  Scenario: content editable
    When I click 'Content Editable Text'
    And I press 'Backspace' key
    Then I expect text of 'Content Editable Text' to be equal 'this is content editable tex'

  @bidi
  @wd
  Scenario: click on coordinates
    When I click '3, 3' coordinates in 'Button'
    Then I expect text of 'Action' to be equal 'click'

  @bidi
  @wd
  Scenario: resize browser's window
    When I set window size '640,480'
    Then I expect viewport size to equal '$js({ width: 640, height: 480 })'
    And I set window size '800,600'
    Then I expect viewport size to equal '$js({ width: 800, height: 600 })'

  @bidi
  @wd
  Scenario: close current browser tab
    When I expect current url to contain 'actions.html'
    And I open new tab
    And I switch to 2 window
    And I close current tab
    Then I expect current url to contain 'actions.html'

  @bidi
  @wd
  Scenario: scroll until visible in element
    When I scroll in 'Infinite Scroll' until 'Infinite Scroll Item By Index (26)' to be visible
