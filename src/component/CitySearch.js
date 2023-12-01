import { useState, useEffect } from "react";
const CitySearch = ({ allLocations, setCurrentCity }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChanged = (event) => {
        const value = event.target.value;
        const filteredLocations = allLocations
            ? allLocations.filter((location) => {
                  return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
              })
            : [];

        setQuery(value);
        setSuggestions(filteredLocations);
    };

    const handleItemClick = (event) => {
        const value = event.target.textContent;
        setQuery(value);
        setShowSuggestions(false); // to hide list
        setCurrentCity(value);
    };
    useEffect(() => {
        setSuggestions(allLocations);
    }, [`${allLocations}`]);

    return (
        <div id="city-search">
            <input
                type="text"
                className="city"
                placeholder="Search for a city"
                value={query}
                onFocus={() => setShowSuggestions(true)}
                onChange={handleInputChanged}
            />
            {showSuggestions ? (
                <ul className="suggestions">
                    {suggestions.map((suggestion) => {
                        return (
                            <li onClick={handleItemClick} key={suggestion}>
                                {suggestion}
                            </li>
                        );
                    })}
                    <li key="See all cities">
                        <b key="See all cities" onClick={handleItemClick}>
                            See all cities
                        </b>
                    </li>
                </ul>
            ) : null}
        </div>
    );
};
export default CitySearch;
