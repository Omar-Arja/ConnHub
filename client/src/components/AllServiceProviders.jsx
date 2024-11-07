import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import AllServiceProvidersBox from "../pages/Main/AllServiceProvidersBox";

export default function AllServiceProviders() {
    const [serviceProviders, setServiceProviders] = useState([]);
    const [categories, setCategories] = useState({});
  
    useEffect(() => {
      axios
        .get("http://localhost:8000/api/service-provider/all", {
          headers: { Authorization: localStorage.getItem("headers") }
        })
        .then((response) => {
          if (Array.isArray(response.data.data.serviceProviders)) {
            const serviceProviderList = response.data.data.serviceProviders;
            const categoriesObj = {};
  
            serviceProviderList.forEach((serviceProvider) => {
              const category = serviceProvider.service_category;
              if (!categoriesObj[category]) {
                categoriesObj[category] = [];
              }
              categoriesObj[category].push(serviceProvider);
            });
  
            setServiceProviders(serviceProviderList);
            setCategories(categoriesObj);
          } else {
            console.error('Expected an array but got:', typeof response.data.data.serviceProviders);
          }
        })
        .catch((error) => {
          console.error('Error fetching service providers:', error);
        });
    }, []);
  
    return (
      <div className="categories">
        {Object.keys(categories).map((category) => (
            <div key={category} className="category-container">
                <h2>{category}</h2>
                <ul>
                {categories[category].map((serviceProvider) => (
                   <Link 
                   to={`/service-provider/id/${serviceProvider.user.id}`}
                   key={serviceProvider.id}
                   className="service-provider-link">
                    <AllServiceProvidersBox
                    key={serviceProvider.id}
                    name={serviceProvider.user.name}
                    email={serviceProvider.user.email}
                    service_name={serviceProvider.service_name}
                    service_description={serviceProvider.service_description}
                    location={serviceProvider.location}
                    service_price_min={serviceProvider.service_price_min}
                    service_price_max={serviceProvider.service_price_max}
                    />
                    </Link>
                ))}
                </ul>
        </div>
        ))}
      </div>
    );
  }
