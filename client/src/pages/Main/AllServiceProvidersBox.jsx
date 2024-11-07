
const AllServiceProvidersBox = ({
    name,
    email,
    service_name,
    service_description,
    location,
    service_price_min,
    service_price_max
  }) => {
    return (
      <div className="service-provider-box">
      <div className="name">{name}</div>
      <div className="email">{email}</div>
      <div className="service-name">{service_name}</div>
      <div className="service-description">{service_description}</div>
      <div className="location">{location}</div>
      <div className="price-range">
        ${service_price_min} - ${service_price_max}
      </div>
    </div>
    );
  };
  export default AllServiceProvidersBox;