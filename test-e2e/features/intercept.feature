Feature: intercept

  Scenario: wait for intercepted response
    When I create interception for '**/users' as 'usersInterception'
    And I open '$mockPage' url
    And I wait for '$usersInterception' response

  Scenario: save intercepted response
    When I create interception for '**/users' as 'usersInterception'
    And I open '$mockPage' url
    And I save '$usersInterception' response as 'response'
    And I expect '$response.statusCode' memory value to be equal '$js(200)'
