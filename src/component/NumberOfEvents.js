import { useState } from "react";
const NumberOfEvents = ({ setCurrentNOE }) => {
    const [numberOfEvents, setNumberOfEvents] = useState("0");
    const [error, setError] = useState("");

    const handleItemClick = () => {
        if (isNaN(numberOfEvents) || numberOfEvents <= 0) {
            setError("Please enter a valid positive number.");
        } else {
            setCurrentNOE(numberOfEvents);
            setNumberOfEvents("");
            setError("");
        }
    };

    return (
        <div id="number-of-events">
            <h1>Main Event Page</h1>
            <input
                type="text"
                className="event-input"
                value={numberOfEvents}
                onChange={(e) => setNumberOfEvents(e.target.value)}
            />
            <button className="btnSubmit" onClick={handleItemClick}>
                Apply
            </button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default NumberOfEvents;
