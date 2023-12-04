Feature: Event Details Interaction

  Scenario: Show Event Details.
    Given the user is on the event detail page
    When the user clicks on (Show Details) button
    Then if (Show details) is clicked, the event details section should become visible and relevant information should be displayed

  Scenario: Hide Event Details.
    Given the user is on the event detail page
    When the user clicks on (Hide Details) button
    Then the event details section switches back to the default state of the page

  Scenario: No Interaction.
    Given the user is on the event detail page
    When the user does not interact with the (Show/Hide) buttons
    Then if no interaction occurs, the state of the event details section and displayed information remains unchanged
