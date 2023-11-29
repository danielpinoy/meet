import { useState } from "react";
const NumberOfEvents = () => {
    const [numberOfEvents, setNumberOfEvents] = useState("10");

    return (
        <div id="number-of-events">
            <h1>Main Event Page</h1>
            <input
                type="text"
                className="event-input"
                value={numberOfEvents}
                onChange={(e) => setNumberOfEvents(e.target.value)}
            />
            <button className="">Apply</button>
        </div>
    );
};

export default NumberOfEvents;
