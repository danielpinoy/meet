import "./App.css";
import EventList from "./component/EventList";
import CitySearch from "./component/CitySearch";
import NumberOfEvents from "./component/NumberOfEvents";
export default function App() {
    return (
        <div className="App">
            <EventList />
            <CitySearch />
            <NumberOfEvents />
        </div>
    );
}
