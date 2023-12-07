import { render, within } from "@testing-library/react";
import NumberOfEvents from "../component/NumberOfEvents";
import { userEvent } from "@testing-library/user-event";
import App from "../App";

describe("<NumberOfEvents /> component", () => {
    let NumberOfEventsComponent;
    beforeEach(() => {
        NumberOfEventsComponent = render(
            <NumberOfEvents setCurrentNOE={() => {}} setErrorAlert={() => {}} />
        );
    });
    test("main event page heading", () => {
        const h1Element = NumberOfEventsComponent.queryByRole("heading", { level: 1 });

        expect(h1Element).toBeInTheDocument();
        expect(NumberOfEventsComponent.queryByText("Main Event Page"));
    });

    test("renders input field and click the 'Apply' button", () => {
        const { queryByRole } = NumberOfEventsComponent;

        // input field
        const inputField = queryByRole("textbox");

        // button
        const NumberOfEventsButton = NumberOfEventsComponent.queryByRole("button", {
            name: "Apply",
        });

        expect(NumberOfEventsButton).toBeInTheDocument();
        expect(inputField).toBeInTheDocument();
        expect(inputField).toHaveClass("event-input");
    });

    test(" user enters specific numbers of events in the input field ", async () => {
        const { queryByRole } = NumberOfEventsComponent;
        const inputField = queryByRole("textbox");
        await userEvent.type(inputField, "{backspace}{backspace}10");

        expect(inputField.value).toBe("10");
    });
    test("if a specific number is entered, the page should display the specified number of events ", async () => {
        const { queryByRole } = NumberOfEventsComponent;
        const user = userEvent.setup();

        const inputField = queryByRole("textbox");
        await user.type(inputField, "{backspace}{backspace}5");

        expect(inputField.value).toBe("5");
    });
});

describe("<NumberOfEvents /> integration", () => {
    test("renders different numbers of events depending on the input", async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        const NumberOfEventsDOM = AppDOM.querySelector("#number-of-events");

        // Input Field
        const InputField = within(NumberOfEventsDOM).getByRole("textbox");
        await user.type(InputField, "{backspace}{backspace}5");

        // Change the expectation to compare with a string
        expect(InputField.value).toEqual("5");

        // Apply Button
        const ApplyButton = within(NumberOfEventsDOM).getByRole("button");
        await user.click(ApplyButton);

        const EventListDOM = AppDOM.querySelector("#event-list");
        const allRenderedEventItems = within(EventListDOM).queryAllByRole("listitem");

        console.log("Actual number of rendered events:", allRenderedEventItems.length);

        // Assertion
        expect(allRenderedEventItems.length).toEqual(5);
    });
});
