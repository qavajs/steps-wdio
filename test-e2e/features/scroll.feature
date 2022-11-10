Feature: actions

  Background:
    When I open '$scrollPage' url

  Scenario: scroll to element
    When I scroll to 'Scroll Element'
    Then I expect scroll position to be 747.5, 3000
