import { useNavigate } from "react-router-dom";
import "./style.css";

const RegisterChoicePage = () => {
  const navigate = useNavigate();

  const handleChoice = (userType) => {
    navigate(`/register/${userType}`);
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Register as:</h2>
        <div className="register-choice-btns">
          <button onClick={() => handleChoice("client")}>Client</button>
          <button onClick={() => handleChoice("service-provider")}>
            Service Provider
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterChoicePage;
