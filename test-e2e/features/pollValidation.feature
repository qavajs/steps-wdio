Feature: waits

  Background:
    When I open '$waitsPage' url

  @bidi
  @wd
  Scenario Outline: wait for condition
    Then I expect '<element>' <condition>

    Examples:
      | element                   | condition         |
      | Present Element           | to be present     |
      | Detach Element            | not to be present |
      | Not Existing Element      | not to be present |
      | Visible Element           | to be visible     |
      | Hidden Element            | to be invisible   |

  @bidi
  @wd
  Scenario: wait for text
    Then I expect text of 'Loading' to be equal '100%'

  @bidi
  @wd
  Scenario: wait for text (match)
    Then I expect text of 'Loading' to match '^\d\d\d%$'

  @bidi
  @wd
  Scenario: wait for property
    Then I expect value of 'Loading Input' to be equal '100%'

  @bidi
  @wd
  Scenario: wait for property
    Then I expect 'value' property of 'Loading Input' to be equal '100%'

  @bidi
  @wd
  Scenario: wait for attribute
    Then I expect 'style' attribute of 'Hidden Element' to contain 'hidden'

  @bidi
  @wd
  Scenario: wait for css property
    Then I expect 'visibility' css property of 'Hidden Element' to equal 'hidden'

  @bidi
  @wd
  Scenario Outline: wait for number of elements in collection
    Then I expect number of elements in 'Wait Collection' collection <condition> '<expected>'

    Examples:
      | condition   | expected |
      | to be equal | 10       |
      | to be above | 8        |
      | to be below | 5        |

  @bidi
  @wd
  Scenario: wait for current url
    Then I expect current url to contain '#anchor'

  @bidi
  @wd
  Scenario: wait for title
    Then I expect page title to be equal 'title changed'


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
