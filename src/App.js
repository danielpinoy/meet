import "./App.css";
import { useState, useEffect } from "react";
import EventList from "./component/EventList";
import CitySearch from "./component/CitySearch";
import NumberOfEvents from "./component/NumberOfEvents";
import { extractLocations, getEvents } from "./api";
import { InfoAlert, ErrorAlert } from "./component/Alert";
export default function App() {
    const [events, setEvents] = useState([]);
    const [currentNOE, setCurrentNOE] = useState(32);
    const [allLocations, setAllLocations] = useState([]);
    const [currentCity, setCurrentCity] = useState("See all cities");
    const [infoAlert, setInfoAlert] = useState("");
    const [errorAlert, setErrorAlert] = useState("");
    useEffect(() => {
        fetchData();
    }, [currentCity, currentNOE]);
    const fetchData = async () => {
        const allEvents = await getEvents();
        const filteredEvents =
            currentCity === "See all cities"
                ? allEvents
                : allEvents.filter((event) => event.location === currentCity);
        setEvents(filteredEvents.slice(0, currentNOE));
        setAllLocations(extractLocations(allEvents));
    };
    // console.log(currentNOE, "currentNOEcurrentNOE");
    return (
        <div className="App">
            <div className="alerts-container">
                {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
                {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
            </div>
            <CitySearch
                setInfoAlert={setInfoAlert}
                allLocations={allLocations}
                setCurrentCity={setCurrentCity}
            />
            <NumberOfEvents setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert} />
            <EventList events={events} />
        </div>
    );
}
