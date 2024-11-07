import { useState, useEffect } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import axios from "axios";
import "../Auth/style.css";
import "./Search.css";
import ServiceProviderBox from "./ServiceProviderBox";
import Navbar  from "../../components/navbar";
import HomeCarousel from "../../components/HomeCarousel";
import AllServiceProviders from "../../components/AllServiceProviders";
import { Link } from "react-router-dom";

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
    <div className="main">
      <div>
      <Navbar></Navbar>
      
      <section class="intro intro--white intro--centerText">
                <div class="intro__body">
                    <div class="intro__container">  
                        <div class="columns columns--center">
                            <div class="column">
                                <h1 class="title title--spaces desktop-xxl mobile-l">ConnHub</h1>
                                <h2 class="subtitle">No matter how complicated it is, We connect you</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
      </div>
      <HomeCarousel/>
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
                <Link to={`/service-provider/id/${serviceProvider.user_id}`} key={serviceProvider.user_id} className="service-provider-link">
                  <ServiceProviderBox {...serviceProvider} />
                </Link>
              ))}
            </div>
         )}
        </div>
        <div>
        </div>
        <h1>Categories:</h1>
        <AllServiceProviders/>
    </div>
  );
};

export default Search;
