import { loadFeature, defineFeature } from "jest-cucumber";
import Event from "../component/Event";
import { render, waitFor, within } from "@testing-library/react";
import { getEvents } from "../api";
import { userEvent } from "@testing-library/user-event";
const feature = loadFeature("./src/features/showHideEventDetails.feature");

defineFeature(feature, (test) => {
    let EventComponent;
    let allEvents;
    beforeAll(async () => {
        allEvents = await getEvents();
    });

    beforeEach(async () => {
        EventComponent = render(<Event event={allEvents[0]} />);
    });
    test("Show Event Details.", ({ given, when, then }) => {
        given("the user is on the event detail page", () => {
            expect(EventComponent.getByText(allEvents[0].summary)).toBeInTheDocument();
            expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
            expect(
                EventComponent.container.querySelector(".event-information")
            ).toBeInTheDocument();
        });

        when("the user clicks on (Show Details) button", async () => {
            const user = userEvent.setup();

            await waitFor(() => {
                const showDetailsButton = EventComponent.queryByText("Show Details");
                expect(showDetailsButton).toBeTruthy();

                user.click(showDetailsButton);
            });

            await waitFor(() => {
                expect(
                    EventComponent.getByText(/Have you wondered how you can ask Google/)
                ).toBeInTheDocument();
            });
        });

        then(
            "if (Show details) is clicked, the event details section should become visible and relevant information should be displayed",
            () => {
                // The description is visible
                expect(EventComponent.container.querySelector(".show-details")).toBeInTheDocument();
            }
        );
    });

    test("Hide Event Details.", ({ given, when, then }) => {
        given("the user is on the event detail page", () => {
            expect(EventComponent.getByText(allEvents[0].summary)).toBeInTheDocument();
            expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
        });
        when("the user clicks on (Hide Details) button", async () => {
            const user = userEvent.setup();

            await waitFor(() => {
                const hideDetailsButton = EventComponent.queryByText("Hide Details");
                user.click(hideDetailsButton);
            });

            await waitFor(() => {
                expect(
                    EventComponent.queryByText(/Have you wondered how you can ask Google/)
                ).not.toBeInTheDocument();
            });
        });

        then("the event details section switches back to the default state of the page", () => {
            expect(EventComponent.container.querySelector(".show-details")).not.toBeInTheDocument();
        });
    });

    test("No Interaction.", ({ given, when, then }) => {
        given("the user is on the event detail page", () => {
            expect(EventComponent.getByText(allEvents[0].summary)).toBeInTheDocument();
            expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
        });

        when("the user does not interact with the (Show/Hide) buttons", () => {
            // Nothing to do here since we're simulating no interaction
        });

        then(
            "if no interaction occurs, the state of the event details section and displayed information remains unchanged",
            () => {
                expect(EventComponent.queryByText("Hide Details")).not.toBeInTheDocument();
                expect(
                    EventComponent.queryByText(/Have you wondered how you can ask Google/)
                ).not.toBeInTheDocument();
            }
        );
    });
});
