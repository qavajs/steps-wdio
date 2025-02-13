Feature: intercept

  Scenario: wait for intercepted response
    When I create interception for '**/users' as 'usersInterception'
    And I open '$mockPage' url
    And I wait for '$usersInterception' response

  Scenario: save intercepted response
    And I open '$mockPage' url
    When I create interception for '**/users' as 'usersInterception'
    And I open '$mockPage' url
    And I save '$usersInterception' response as 'spy'
    And I expect '$spy.response.status' memory value to be equal '$js(200)'