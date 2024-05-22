/* eslint-disable no-unused-vars */
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterChoicePage from "./pages/Auth/RegisterChoicePage";
import RegisterClientPage from "./pages/Auth/RegisterClientPage";
import RegisterServiceProviderPage from "./pages/Auth/RegisterServiceProviderPage";
import Login from "./pages/Auth/LoginPage";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterChoicePage />} />
        <Route path="/signin" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<RegisterChoicePage />} />
        <Route path="/register/client" element={<RegisterClientPage />} />
        <Route
          path="/register/service-provider"
          element={<RegisterServiceProviderPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
