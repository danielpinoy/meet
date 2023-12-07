import { useState } from "react";
const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
    const [numberOfEvents, setNumberOfEvents] = useState("");

    const handleInputChanged = (event) => {
        const value = event.target.value;
        setNumberOfEvents(value);

        if (isNaN(value) || parseInt(value) < 0) {
            setErrorAlert("Please enter a valid positive number.");
        } else {
            setErrorAlert("");
        }
    };
    const handleItemClick = () => {
        setCurrentNOE(numberOfEvents);

        setNumberOfEvents("");
    };

    return (
        <div id="number-of-events">
            <h1>Main Event Page</h1>
            <input
                type="text"
                className="event-input"
                value={numberOfEvents}
                onChange={handleInputChanged}
            />
            {isNaN(numberOfEvents) || parseInt(numberOfEvents) < 0 ? (
                <button className="btnError">Locked</button>
            ) : (
                <button className="btnSubmit" onClick={handleItemClick}>
                    Apply
                </button>
            )}
        </div>
    );
};

export default NumberOfEvents;
