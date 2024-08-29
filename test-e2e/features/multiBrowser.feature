Feature: multiBrowser

  Background:
    When I open '$actionsPage' url

  @bidi
  @wd
  Scenario: new browser
    Then I expect current url to contain 'actions.html'
    When I open new browser as 'browser2'
    And I switch to 'browser2' browser
    And I open '$valuesPage' url
    And I switch to 'default' browser
    Then I expect current url to contain 'actions.html'
    When I switch to 'browser2' browser
    Then I expect current url to contain 'values.html'
    When I close 'browser2' browser
    Then I expect current url to contain 'actions.html'
