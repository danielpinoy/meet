import Event from "../component/Event";
import { render, waitFor } from "@testing-library/react";
import { getEvents } from "../api";
import { userEvent } from "@testing-library/user-event";
describe("<Event /> Component", () => {
    let EventComponent;

    let allEvents;
    beforeAll(async () => {
        allEvents = await getEvents();
    });

    beforeEach(async () => {
        EventComponent = render(<Event event={allEvents[0]} />);
    });

    test("renders event summary", async () => {
        expect(EventComponent.getByText(allEvents[0].summary)).toBeInTheDocument();
    });

    test("has an element with location", () => {
        expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
    });

    test("render event details button with the title(show details)", () => {
        expect(EventComponent.queryByText("Show Details")).toBeInTheDocument();
    });

    test("by default, event's details section should be hidden", () => {
        expect(EventComponent.container.querySelector(".show-details")).not.toBeInTheDocument();
    });

    test("shows the details section when the user clicks on the 'show details' button", async () => {
        const user = userEvent.setup();

        const showDetailsButton = EventComponent.queryByText("Show Details");
        user.click(showDetailsButton);

        await waitFor(() => {
            expect(EventComponent.container.querySelector(".show-details")).toBeInTheDocument();
        });
    });

    test("hides the details section when the user clicks on the 'hide details' button", async () => {
        const user = userEvent.setup();

        // Simulate clicking on the "Hide Details" button
        const hideDetailsButton = EventComponent.queryByText("Hide Details");
        user.click(hideDetailsButton);

        await waitFor(() => {
            expect(EventComponent.container.querySelector(".show-details")).not.toBeInTheDocument();
        });
    });
});
