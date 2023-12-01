import { useState } from "react";
const NumberOfEvents = ({ setCurrentNOE }) => {
    const [numberOfEvents, setNumberOfEvents] = useState("0");
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
                onChange={(e) => setNumberOfEvents(e.target.value)}
            />
            <button className="btnSubmit" onClick={handleItemClick}>
                Apply
            </button>
        </div>
    );
};

export default NumberOfEvents;
