import { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterServiceProviderPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    service_name: "",
    service_description: "",
    service_category: "",
    location: "",
    service_price_min: "",
    service_price_max: "",
    calendly_link: "",
  });

  const {
    first_name,
    last_name,
    username,
    email,
    password,
    service_name,
    service_description,
    service_category,
    location,
    service_price_min,
    service_price_max,
    calendly_link,
  } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const button = document.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = "Loading...";

    if (
      first_name &&
      last_name &&
      username &&
      email &&
      password &&
      service_name &&
      service_description &&
      service_category &&
      location &&
      service_price_min &&
      service_price_max &&
      calendly_link
    ) {
      try {
        // First, register the user
        const user_data = new FormData();
        const name = first_name + " " + last_name;
        user_data.append("name", name);
        user_data.append("username", username);
        user_data.append("email", email);
        user_data.append("password", password);

        const userRes = await axios.post(
          "http://localhost:8000/api/auth/register/",
          user_data
        );
        const token = userRes.data.authorisation.token;

        // Then, register as service provider
        const serviceProviderData = {
          service_name,
          service_description,
          service_category,
          location,
          service_price_min,
          service_price_max,
          calendly_link,
        };

        const res = await axios.post(
          "http://localhost:8000/api/service-provider/profile",
          serviceProviderData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.data.status == "success") {
          throw new Error("Failed to register as service provider");
        }

        button.disabled = false;
        button.textContent = "Success";
        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      } catch (err) {
        button.disabled = false;
        button.textContent = "Failed";
        setTimeout(() => {
          button.textContent = "Sign Up";
        }, 2000);
        console.log(err);
      }
    }
  };

  return (
    <div>
    <div className="auth-container">
      <div className="auth-form">
        <h1 class="title--spaces desktop-xxl mobile-l">ConnHub</h1>
        <h2 class="subtitle">No matter how complicated it is, We connect you</h2>
        <h2>Register as Service Provider</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            name="first_name"
            value={first_name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="last_name"
            value={last_name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Service Name"
            name="service_name"
            value={service_name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Service Description"
            name="service_description"
            value={service_description}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Service Category"
            name="service_category"
            value={service_category}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Min Price"
            name="service_price_min"
            value={service_price_min}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Max Price"
            name="service_price_max"
            value={service_price_max}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Calendly Link"
            name="calendly_link"
            value={calendly_link}
            onChange={handleChange}
          />
          <button type="submit">Sign Up</button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/signin">Log In</Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default RegisterServiceProviderPage;
