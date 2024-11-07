import React, { useState, useRef, useEffect } from 'react';
import './SettingsDropdown.css'; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SettingsDropdown = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        const button = document.querySelector('button[type="logout"]');
        button.disabled = true;
        button.textContent = "Bye...";
        
        try {
            const token = localStorage.getItem('headers');
            if (!token) {
                throw new Error('No authentication token found');
            }

            await axios.post('http://localhost:8000/api/auth/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            localStorage.removeItem('headers');
            setTimeout(() => {
                navigate("/signin");
              }, 500);
        } catch (error) {
            console.error('Error logging out', error);

        }
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="settings-dropdown" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="settings-button">
                Settings
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    <a href="/profile" className="dropdown-item">Profile</a>
                    <button type='logout' className='settings-button' onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
};

export default SettingsDropdown;