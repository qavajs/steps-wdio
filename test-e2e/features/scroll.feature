Feature: scroll

  Background:
    When I open '$scrollPage' url

  @bidi
  @wd
  Scenario: scroll to element wait
    When I scroll to 'Scroll Element'
    Then I expect 'Scroll Element' to be in viewport

  @bidi
  @wd
  Scenario: scroll to element wait
    Then I expect 'Scroll Element' not to be in viewport
