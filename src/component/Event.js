import { useState } from "react";
const Event = ({ event }) => {
    const isoDateString = event.created;
    const isoDate = new Date(isoDateString);
    const [openDescription, setOpenDescription] = useState(false);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const readableDate = isoDate.toLocaleString(undefined, options);
    const toggleDescription = () => {
        setOpenDescription(!openDescription);
    };
    return (
        <li className="event">
            <div className="event-title">{event.summary}</div>
            <div className="event-information">
                <div>{readableDate}</div>
                <div>{event.location}</div>
            </div>
            {!openDescription ? (
                <button className="details-btn" onClick={toggleDescription}>
                    Show Details
                </button>
            ) : (
                <button className="details-btn" onClick={toggleDescription}>
                    Hide Details
                </button>
            )}
            {openDescription && <div className="show-details">{event.description}</div>}
        </li>
    );
};
export default Event;
