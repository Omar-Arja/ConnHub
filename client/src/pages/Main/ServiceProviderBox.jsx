/* eslint-disable react/prop-types */
const ServiceProviderBox = ({
  service_name,
  service_description,
  service_category,
  location,
  service_price_min,
  service_price_max,
  calendly_link,
}) => {
  return (
    <div className="service-provider-box">
      <h3>{service_name}</h3>
      <p>
        <strong>Description:</strong> {service_description}
      </p>
      <p>
        <strong>Category:</strong> {service_category}
      </p>
      <p>
        <strong>Location:</strong> {location}
      </p>
      <p>
        <strong>Price Range:</strong> ${service_price_min} - $
        {service_price_max}
      </p>
      <a href={calendly_link} target="_blank" rel="noopener noreferrer">
        Schedule Appointment
      </a>
    </div>
  );
};

export default ServiceProviderBox;
