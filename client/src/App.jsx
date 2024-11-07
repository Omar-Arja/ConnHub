/* eslint-disable no-unused-vars */
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterChoicePage from "./pages/Auth/RegisterChoicePage";
import RegisterClientPage from "./pages/Auth/RegisterClientPage";
import RegisterServiceProviderPage from "./pages/Auth/RegisterServiceProviderPage";
import Login from "./pages/Auth/LoginPage";
import Search from "./pages/Main/Search";
import About from "./pages/Auth/About";
import Pricing from "./pages/Auth/Pricing";
import Profile from "./components/profile";
import ServiceProviderProfile from "../src/components/ServiceProviderProfile";

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
        <Route path="/About" element={<About/>} />
        <Route path="/home" element={<Search />} />
        <Route path="/pricing" element={<Pricing/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/service-provider/id/:id" element={<ServiceProviderProfile/>} />
      </Routes>
    </Router>
  );
};

export default App;
