@backend
Feature: Request tests on the Widget endpoint

  Scenario Outline: Get correct content in the Widget endpoint
    Given I give a widget header with valid information
    When I submit a request GET to "Widget Endpoint" with <widgetId> id
    Then The response status should be 200
    And I successfully receive the widget information with <widgetId> id
    Examples:
    | widgetId                  |
    | "cq9iju5hbebiwwgzteig"    |
    | "e8e3hqjgonkltkcbe0l9"    |
    | "ejyythluqpyffs8aotyq"    |