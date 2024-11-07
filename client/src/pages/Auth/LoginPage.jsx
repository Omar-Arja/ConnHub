import { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const button = document.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = "Loading...";

    if (email && password) {
      const user_data = new FormData();
      user_data.append("email", email);
      user_data.append("password", password);

      
      axios
        .post("http://localhost:8000/api/auth/login/", user_data)
        .then((res) => {
          button.disabled = false;
          button.textContent = "Success";

          const token = res.data.authorisation.token;
          const headers = "Bearer " + token;

          localStorage.setItem("headers", headers);
          setUser(res.data.user);

          console.log(res.data);

          setTimeout(() => {
            navigate("/home");
          }, 1000);
        })
        .catch((err) => {
          button.disabled = false;
          button.textContent = "Failed";
          setTimeout(() => {
            button.textContent = "Log In";
          }, 2000);
          console.log(err);
        });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>ConnHub</h2>
        <h2 class="subtitle">No matter how complicated it is, We connect you</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Log In</button>
        </form>
        <p className="auth-switch">
            Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
