import { useNavigate } from "react-router-dom";
import "./style.css";

const RegisterChoicePage = () => {
  const navigate = useNavigate();

  const handleChoice = (userType) => {
    navigate(`/register/${userType}`);
  };

  return (
    <div>
      <div className="auth-container">
        <div className="auth-form">
        <h1 class="title title--spaces desktop-xxl mobile-l">ConnHub</h1>
        <h2 class="subtitle">No matter how complicated it is, We connect you</h2>
          <h3>Register as:</h3>
          <div className="register-choice-btns">
            <button onClick={() => handleChoice("client")}>Client</button>
            <button onClick={() => handleChoice("service-provider")}>
              Service Provider
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterChoicePage;
