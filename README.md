# meet

1. Show/Hide Event Details


Scenario 1.1

Given: the user is on the event detail page
When: the user clicks on "Show Details" button
Then: if "Show details" is clicked, the event details section should become visible and relevant information should be displayed

Scenario 1.2

Given: the user is on the event detail page
When: the user clicks on "Hide Details" button
Then: the event details section switches back to the default state of the page


Scenario 1.3

Given: the user is on the event detail page
When: the user does not interact with the "Show/Hide" buttons
Then:tf no interaction occurs, the state of the event details section and displayed information remains unchanged

2. Specify Number of Events.

Scenario 2.1

Given: the user is on the main events page
When: the user enters specific numbers of events in the input field and click the "Apply" button
Then: if a specific number is entered, the page should display the specified number of events

Scenario 2.2

Given: the user is on the main events page
When: the user enters invalid nonnumerical or alphabets in the input field and click the "Apply" button
Then: An error message should be displayed, and the current list of events should remain unchanged


3. Use the App When Offline.

Scenario 3.1

Given: the user is on the main page 
When: user clicks to a different link to the event detail page
Then: the page changes to the event detail page

Scenario 3.2

Given: user in the event detail page
When: the user enters specific numbers of events in the input field and click the "Apply" button
Then: An error message should be displayed indicating you need internet connection

4. Add an App Shortcut to the Home Screen.

Scenario 4.1

Given: The user has the mobile device with the app installed.
Then: the user taps on the app shortcut
When: when tapping on the shortcut, the app should launch quickly and navigate to main


5. Display Charts Visualizing Event Details

Scenario 5.1

Given: the user in the event detail page
When:the user enters specific numbers of events in the input field and click the "Apply" button
Then: the page should display the data visualization and the specific amount of event you entered

