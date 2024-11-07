import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar';
import './ServiceProviderProfile.css';

const ServiceProviderProfile = () => {
    const [serviceProviderProfile1, setServiceProviderProfile] = useState({
        service_name: '', 
        service_description: '', 
        service_category: '', 
        location: '', 
        service_price_min: '', 
        service_price_max: '', 
        calendly_link: '',
    });
    const { id } = useParams();
    const [profile, setProfile] = useState(null);

    const handleSchedule = () => {
        window.open(serviceProviderProfile1.calendly_link, '_blank');
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/service-provider/id/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem('headers')
                    }
                });
                console.log(response.data.data.user[0]);
                setProfile(response.data.data.user[0]);
                setServiceProviderProfile(response.data.data.user[0].service_provider);
            } catch (error) {
                console.error('Error fetching service provider profile:', error);
            }
        };

        fetchProfile();
    }, [id]);

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="profile-container">
            <h1>{profile.name}</h1>
            <p>Email: {profile.email}</p>
            <p>Service Name: {serviceProviderProfile1.service_name}</p>
            <p>Service Description: {serviceProviderProfile1.service_description}</p>
            <p>Service Category: {serviceProviderProfile1.service_category}</p>
            <p>Location: {serviceProviderProfile1.location}</p>
            <p>Price Range: {serviceProviderProfile1.service_price_min} - {serviceProviderProfile1.service_price_max}</p>

            <div className="actions">
                <button onClick={handleSchedule}>Schedule an Appointment</button>
                {/* Add more buttons for other actions */}
            </div>

            <div className="reviews-section">
                <h2>Reviews</h2>
                {/* Render reviews here */}
            </div>

            <div className="related-services">
                <h2>Related Services</h2>
                {/* Render related services here */}
            </div>
        </div>
        </div>
    );
};

export default ServiceProviderProfile;
