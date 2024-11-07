import React from 'react';
import "./Pricing.css";
import Navbar from '../../components/navbar';

const Pricing = () => {
    return (
        <div>
            <Navbar></Navbar>

            <div className="pricing-page">
            <header className="pricing-header">
                <h1>Choose Your Plan</h1>
                <p>Select the plan that best suits your needs</p>
            </header>
            <div className="pricing-plans">
                <div className="plan popular">
                    <h2>Standard</h2>
                    <p className="price">$19.99/month</p>
                    <ul>
                        <li>Access to all service categories</li>
                        <li>Enhanced listing</li>
                        <li>Advanced search functionality</li>
                        <li>In-app messaging with clients</li>
                    </ul>
                    <button>Get Started</button>
                </div>
                <div className="plan">
                    <h2>Premium</h2>
                    <p className="price">$29.99/month</p>
                    <ul>
                        <li>All features of the Standard Plan</li>
                        <li>Highlighted profile in search results</li>
                        <li>Featured profile on homepage and category pages</li>
                        <li>Priority customer support</li>
                        <li>Advanced analytics and reporting</li>
                    </ul>
                    <button>Get Started</button>
                </div>
            </div>
            </div>
        
        </div>
    );
};

export default Pricing;