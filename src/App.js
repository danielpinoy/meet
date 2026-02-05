import "./minified/AppMinifier.css";
import { useState, useEffect } from "react";
import EventList from "./component/EventList";
import CitySearch from "./component/CitySearch";
import NumberOfEvents from "./component/NumberOfEvents";
import { extractLocations, getEvents } from "./api";
import { InfoAlert, ErrorAlert, WarningAlert } from "./component/Alert";
import CityEventsChart from "./component/CityEventsChart";
import EventGenresChart from "./component/EventGenresChart";

export default function App() {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");
  const [loading, setLoading] = useState();
  const [allEvents, setAllEvents] = useState([]); // ✅ ADDED: Store all events for charts

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      setWarningAlert("you are currently in offline mode");
    }
    fetchData();
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    const fetchedEvents = await getEvents(setLoading);
    const filteredEvents =
      currentCity === "See all cities"
        ? fetchedEvents
        : fetchedEvents.filter((event) => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllEvents(fetchedEvents); // ✅ FIXED: Store all events for charts
    setAllLocations(extractLocations(fetchedEvents));
  };

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="App">
          <div className="alerts-container">
            {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
            {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
            {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
          </div>
          <CitySearch
            setInfoAlert={setInfoAlert}
            allLocations={allLocations}
            setCurrentCity={setCurrentCity}
          />
          <NumberOfEvents
            setCurrentNOE={setCurrentNOE}
            setErrorAlert={setErrorAlert}
          />
          <div className="charts-container">
            <EventGenresChart events={events} />
            <CityEventsChart allLocations={allLocations} events={allEvents} />
          </div>
          <EventList events={events} />
        </div>
      )}
    </>
  );
}
