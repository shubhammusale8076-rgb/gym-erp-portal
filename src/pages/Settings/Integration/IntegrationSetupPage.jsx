import React from "react";
import './IntegrationSetup.css'
import { useParams, useNavigate } from "react-router-dom";
import IntegrationWizard from "../../../components/integration-wizard/IntegrationWizard";
import pic from '../../../assets/pic-1.png'
import { BadgeCheck, Earth, RefreshCw } from "lucide-react";

const IntegrationSetupPage = () => {

    const { provider } = useParams();
    const navigate = useNavigate();

 

    return (
        <div className="integration-setup-container">

            <div className="integration-setup-header">
                <button onClick={() => navigate(-1)}>← Back</button>
            </div>

            <div className="integration-setup-body">

                <div className="integration-setup-left-box">
                    <div className="integration-badge">
                        <span>⏱ Estimated time: 2m</span>
                        <span className="divider">|</span>
                        <span>⚡ Difficulty: Easy</span>
                    </div>
                    <h1 className="integration-title">
                        Connect {provider.toUpperCase()} <br /><span>in 2 Minutes</span>
                    </h1>

                    <p className="integration-description">
                        Scale your gym’s revenue with the world’s leading payment infrastructure.
                        Modernize your member experience today.
                    </p>

                    <div className="features">
                        <div className="feature">
                            <div className="icon"><Earth /></div>
                            <div>
                                <h4>Accept global payments</h4>
                                <p>Process credit cards, Apple Pay, and local methods in 135+ currencies.</p>
                            </div>
                        </div>

                        <div className="feature">
                            <div className="icon"><RefreshCw /></div>
                            <div>
                                <h4>Automate payouts</h4>
                                <p>Direct deposits to your business bank account on a rolling schedule.</p>
                            </div>
                        </div>

                        <div className="feature">
                            <div className="icon"><BadgeCheck /></div>
                            <div>
                                <h4>Secure PCI compliance</h4>
                                <p>Enterprise-grade security that keeps your members’ data protected.</p>
                            </div>
                        </div>
                    </div>

                    <button className="cta-btn btn-primary" onClick={()=>navigate(`/integrations/${provider}/setup`)}>
                        Start Setup →
                    </button>
                </div>
                <div className="integration-setup-right-box">
                    <div className="image-wrapper">
                        <img src={pic} alt="Revenue growth" />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default IntegrationSetupPage;