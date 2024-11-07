import React from 'react';
import SettingsDropdown from '../pages/Auth/SettingsPage';

const Navbar = () => {
  return (
    <div className="navbar">
        <div className='navbar-header'><h2>ConnHub</h2></div>
        <nav class="navbar">
          <ul class="nav-links">

                        
            <input type="checkbox" id="checkbox_toggle" />
            <label for="checkbox_toggle" class="hamburger">&#9776;</label>


            <div class="menu">
              <li><a href="/home">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/pricing">Pricing</a></li>
              <SettingsDropdown/>
            </div>
          </ul>
        </nav>
      </div>
  );
};

export default Navbar;