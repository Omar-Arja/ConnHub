import { useState, useEffect } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import axios from "axios";
import "./Search.css";
import ServiceProviderBox from "./ServiceProviderBox";

const Search = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/service-provider/search?search_query=${search}`,
        { headers: { Authorization: localStorage.getItem("headers") } }
      );
      setSearchResults(res.data.data.serviceProviders);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((serviceProvider) => (
            <ServiceProviderBox key={serviceProvider.id} {...serviceProvider} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
