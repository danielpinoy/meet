import { render } from "@testing-library/react";
import NumberOfEvents from "../component/NumberOfEvents";
import { userEvent } from "@testing-library/user-event";
describe("<NumberOfEvents /> component", () => {
    let NumberOfEventsComponent;
    beforeEach(() => {
        NumberOfEventsComponent = render(<NumberOfEvents />);
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

    test(" user enters specific numbers of events in the input field ", () => {
        const { queryByRole } = NumberOfEventsComponent;
        const inputField = queryByRole("textbox");
        expect(inputField.value).toBe("10");
    });
    test("if a specific number is entered, the page should display the specified number of events ", async () => {
        const { queryByRole, queryByText } = NumberOfEventsComponent;
        const user = userEvent.setup();

        const inputField = queryByRole("textbox");
        await user.type(inputField, "{backspace}{backspace}5");

        // Button Clicked
        const applyButton = queryByRole("button", {
            name: "Apply",
        });
        await user.click(applyButton);

        expect(inputField.value).toBe("5");
    });
});
