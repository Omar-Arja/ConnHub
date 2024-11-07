import React, { useState, useEffect } from 'react';
import './profile.css';
import Navbar from './navbar';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState({ 
        name: '', 
        email: '', 
        usertype_id: null 
    });
    const [serviceProviderProfile, setServiceProviderProfile] = useState({
        service_name: '', 
        service_description: '', 
        service_category: '', 
        location: '', 
        service_price_min: '', 
        service_price_max: '', 
        calendly_link: ''
    });

    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '', 
        email: '', 
        service_name: '', 
        service_description: '', 
        service_category: '', 
        location: '', 
        service_price_min: '', 
        service_price_max: '', 
        calendly_link: ''
    });
    const [error, setError] = useState(null);

    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/client/view-client', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('headers')}`
                }
            });
            return response.data.profile;
        } catch {
            const response = await axios.get('http://localhost:8000/api/service-provider/view-current', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('headers')}`
                }
            });
            return response.data.data.serviceProviderProfile;
        }
    };
    
    useEffect(() => {
        const getUserData = async () => {
            const userData = await fetchCurrentUser();
            if (userData) {
                setUser(userData);
                if (userData.usertype_id === 4 && userData.service_provider_profile) {
                    setServiceProviderProfile(userData.service_provider_profile);
                    setFormData({
                        name: userData.name,
                        email: userData.email,
                        service_name: userData.service_provider_profile.service_name,
                        service_description: userData.service_provider_profile.service_description,
                        service_category: userData.service_provider_profile.service_category,
                        location: userData.service_provider_profile.location,
                        service_price_min: userData.service_provider_profile.service_price_min,
                        service_price_max: userData.service_provider_profile.service_price_max,
                        calendly_link: userData.service_provider_profile.calendly_link
                    });
                } else {
                    setFormData({
                        name: userData.name,
                        email: userData.email
                    });
                }
            }
        };
        getUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCancel = () => {
        setEditing(false);
        if (user.usertype_id === 4) {
            setFormData({
                name: user.name,
                email: user.email,
                service_name: serviceProviderProfile.service_name,
                service_description: serviceProviderProfile.service_description,
                service_category: serviceProviderProfile.service_category,
                location: serviceProviderProfile.location,
                service_price_min: serviceProviderProfile.service_price_min,
                service_price_max: serviceProviderProfile.service_price_max,
                calendly_link: serviceProviderProfile.calendly_link
            });
        } else {
            setFormData({
                name: user.name,
                email: user.email
            });
        }
    };

    const handleSave = async () => {
        const button = document.querySelector('button[type="submit"]');
        button.disabled = true;
        button.textContent = "Loading...";

        try {
            let response;
            if (user.usertype_id === 3) { // Client
                response = await axios.put('http://localhost:8000/api/client/update', formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('headers')}`
                    }
                });
            } else { // Service Provider
                response = await axios.put('http://localhost:8000/api/service-provider/update', formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('headers')}`
                    }
                });
            }
            setUser(response.data.profile);
            setEditing(false);
            window.location.reload();
        } catch (error) {
            console.error('Error updating profile', error);
        }
    };
    

    return (
        <div>
        <Navbar />
        <div className="profile-container">
            <h1 className="profile-title">User Profile</h1>
            <div className="profile-content">
                <div className="profile-field">
                    <label>Name: </label>
                    {editing ? (
                        <input
                            type="text"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <span>{user.name}</span>
                    )}
                </div>
                <div className="profile-field">
                    <label>Email: </label>
                    {editing ? (
                        <input
                            type="email"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <span>{user.email}</span>
                    )}
                </div>
                {user.usertype_id === 4 && (
                    <>
                        <div className="profile-field">
                            <label>Service Name: </label>
                            {editing ? (
                                <input
                                    type="text"
                                    name="service_name"
                                    value={formData.service_name || ''}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <span>{serviceProviderProfile.service_name}</span>
                            )}
                        </div>
                        <div className="profile-field">
                            <label>Service Description: </label>
                            {editing ? (
                                <input
                                    type="text"
                                    name="service_description"
                                    value={formData.service_description || ''}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <span>{serviceProviderProfile.service_description}</span>
                            )}
                        </div>
                        <div className="profile-field">
                            <label>Service Category: </label>
                            {editing ? (
                                <input
                                    type="text"
                                    name="service_category"
                                    value={formData.service_category || ''}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <span>{serviceProviderProfile.service_category}</span>
                            )}
                        </div>
                        <div className="profile-field">
                            <label>Location: </label>
                            {editing ? (
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location || ''}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <span>{serviceProviderProfile.location}</span>
                            )}
                        </div>
                        <div className="profile-field">
                            <label>Price Range: </label>
                            {editing ? (
                                <>
                                    <input
                                        type="number"
                                        name="service_price_min"
                                        value={formData.service_price_min || ''}
                                        onChange={handleInputChange}
                                        placeholder="Min Price"
                                    />
                                    <input
                                        type="number"
                                        name="service_price_max"
                                        value={formData.service_price_max || ''}
                                        onChange={handleInputChange}
                                        placeholder="Max Price"
                                    />
                                </>
                            ) : (
                                <span>{serviceProviderProfile.service_price_min} - {serviceProviderProfile.service_price_max}</span>
                            )}
                        </div>
                        <div className="profile-field">
                            <label>Calendly Link: </label>
                            {editing ? (
                                <input
                                    type="text"
                                    name="calendly_link"
                                    value={formData.calendly_link || ''}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <span>{serviceProviderProfile.calendly_link}</span>
                            )}
                        </div>
                    </>
                )}
                <div className="profile-field">
                    <label>Password: can't be changed</label>
                </div>
                <div className="profile-actions">
                    {editing ? (
                        <div className="buttons">
                            <button type='submit' className="save-btn" onClick={handleSave}>Save</button>
                            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                        </div>
                    ) : (
                        <button className="edit-btn" onClick={() => setEditing(true)}>Edit</button>
                    )}
                </div>
            </div>
        </div>
    </div>
        
    );
};
export default Profile;