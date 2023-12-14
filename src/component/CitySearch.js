import { useState, useEffect, useRef } from "react";
const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const inputRef = useRef(null);

    const handleInputChanged = (event) => {
        const value = event.target.value;
        const filteredLocations = allLocations
            ? allLocations.filter((location) => {
                  return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
              })
            : [];

        setQuery(value);
        setSuggestions(filteredLocations);

        let infoText;
        if (filteredLocations.length === 0) {
            infoText = "We can not find the city you are looking for. Please try another city";
        } else {
            infoText = "";
        }
        setInfoAlert(infoText);
    };

    const handleItemClick = (event) => {
        const value = event.target.textContent;
        setQuery(value);
        setShowSuggestions(false);
        setCurrentCity(value);
        setInfoAlert("");
    };

    const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            setShowSuggestions(false);
        }
    };
    useEffect(() => {
        setSuggestions(allLocations);
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [allLocations]);
    return (
        <div id="city-search">
            <input
                ref={inputRef}
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
