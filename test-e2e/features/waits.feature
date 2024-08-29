Feature: waits

  Background:
    When I open '$waitsPage' url

  @bidi
  @wd
  Scenario Outline: wait for condition
    Then I wait until '<element>' <condition>

    Examples:
      | element                   | condition         |
      | Present Element           | to be present     |
      | Detach Element            | not to be present |
      | Not Existing Element      | not to be present |
      | #1 of Empty Collection    | not to be present |
      | #text in Empty Collection | not to be present |
      | Visible Element           | to be visible     |
      | Hidden Element            | to be invisible   |

  @bidi
  @wd
  Scenario: wait for text
    Then I wait until text of 'Loading' to be equal '100%'

  @bidi
  @wd
  Scenario: wait for text (match)
    Then I wait until text of 'Loading' to match '^\d\d\d%$'

  @bidi
  @wd
  Scenario: wait for property
    Then I wait until value of 'Loading Input' to be equal '100%'

  @bidi
  @wd
  Scenario: wait for property
    Then I wait until 'value' property of 'Loading Input' to be equal '100%'

  @bidi
  @wd
  Scenario: wait for attribute
    Then I wait until 'style' attribute of 'Hidden Element' to contain 'hidden'

  @bidi
  @wd
  Scenario: wait for css property
    Then I wait until 'visibility' css property of 'Hidden Element' to equal 'hidden'

  @bidi
  @wd
  Scenario Outline: wait for number of elements in collection
    Then I wait until number of elements in 'Wait Collection' collection <condition> '<expected>'

    Examples:
      | condition   | expected |
      | to be equal | 10       |
      | to be above | 8        |
      | to be below | 5        |

  @bidi
  @wd
  Scenario: wait for current url
    Then I wait until current url to contain '#anchor'

  @bidi
  @wd
  Scenario: wait for title
    Then I wait until page title to be equal 'title changed'

  @bidi
  @wd
  Scenario Outline: wait for condition with timeout
    Then I wait until '<element>' <condition> (timeout: 5000)

    Examples:
      | element         | condition         |
      | Present Element | to be present     |
      | Detach Element  | not to be present |
      | Visible Element | to be visible     |
      | Hidden Element  | to be invisible   |

  @bidi
  @wd
  Scenario: wait for text with timeout
    Then I wait until text of 'Loading' to be equal '100%' (timeout: 5000)

  @bidi
  @wd
  Scenario: wait for property with timeout
    Then I wait until 'value' property of 'Loading Input' to be equal '100%' (timeout: 5000)

  @bidi
  @wd
  Scenario: wait for attribute with timeout
    Then I wait until 'style' attribute of 'Hidden Element' to contain 'hidden' (timeout: 5000)

  @bidi
  @wd
  Scenario: wait for css property with timeout
    Then I wait until 'visibility' css property of 'Hidden Element' to equal 'hidden' (timeout: 5000)

  @bidi
  @wd
  Scenario Outline: wait for number of elements in collection with timeout
    Then I wait until number of elements in 'Wait Collection' collection <condition> '<expected>' (timeout: 5000)

    Examples:
      | condition   | expected |
      | to be equal | 10       |
      | to be above | 8        |
      | to be below | 5        |

  @bidi
  @wd
  Scenario: wait for current url with timeout
    Then I wait until current url to contain '#anchor' (timeout: 5000)

  @bidi
  @wd
  Scenario: wait for title with timeout
    Then I wait until page title to be equal 'title changed' (timeout: 5000)

  @bidi
  @wd
  Scenario: refresh page until element text
    Then I refresh page until text of 'Pseudo Random Text' to equal 'You are lucky' (timeout: 9000)

  @bidi
  @wd
  Scenario: refresh page until element state
    Then I refresh page until 'Randomly Disabled Button' to be enabled (timeout: 9000)

  @bidi
  @wd
  Scenario: click until text
    Then I click 'Flip Coin' until text of 'Coin' to equal 'Heads' (timeout: 9000)

  @bidi
  @wd
  Scenario: click until value
    Then I click 'Plus Button' until value of 'Digit Input' to equal '4'
