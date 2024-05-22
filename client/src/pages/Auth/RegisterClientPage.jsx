import { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterClientPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const { first_name, last_name, email, password } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const button = document.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = "Loading...";

    if (first_name && last_name && email && password) {
      const user_data = new FormData();
      const name = first_name + " " + last_name;
      user_data.append("name", name);
      user_data.append("email", email);
      user_data.append("password", password);

      try {
        const response = await axios.post(
          "http://localhost:8000/api/auth/register/",
          user_data
        );
        if (response.status === 200) {
          const token = response.data.authorisation.token;
          await axios.post(
            "http://localhost:8000/api/client/profile/",
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          button.disabled = false;
          button.textContent = "Success";
          setTimeout(() => {
            navigate("/signin");
          }, 1000);
        }
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
    <div className="auth-container">
      <div className="auth-form">
        <h2>Register as Client</h2>
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
          <button type="submit">Sign Up</button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/signin">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterClientPage;
