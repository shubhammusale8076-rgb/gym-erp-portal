import { getToken, getUserId, getRole } from '../../../utils/auth';
import React, { useEffect, useState } from 'react';
import {
    MessageSquare,
    CreditCard,
    AtSign,
    Landmark,

} from 'lucide-react';
import './Integrations.css';
import IntegrationItem from './IntegrationItem';
import { getIntegration } from '../../../apiservice/apiservice';


const Integrations = () => {
    const [integrationsList, setIntegrationsList] = useState([]);

    const token = getToken()

    const getIntgration = async () => {

        try {

            const res = await getIntegration(token);
            setIntegrationsList(res);

        } catch (error) {
            console.log(" error fetching integrations", error)
        }


    }
    useEffect(() => {
        getIntgration()
    }, []);

    const handleToggle = (index) => {
        const newList = [...integrationsList];
        newList[index].active = !newList[index].active;
        newList[index].badge = newList[index].active ? 'CONNECTED' : 'DISCONNECTED';
        newList[index].actionText = newList[index].active ? 'Configure' : 'Connect';
        setIntegrationsList(newList);
    };

    return (
        <div className="page-container integrations-page">
            <div className="integ-main-grid">

                {integrationsList.map((item) => (

                    <IntegrationItem
                        key={item.id}
                        integration={item}
                    />
                ))}

                <div className="integ-promo-card">
                    <div className="promo-overlay"></div>
                    <div className="promo-card-content">
                        <span className="promo-badge">ELITE PARTNERSHIP</span>
                        <h2 className="promo-title">Elevate Your<br />Operational IQ</h2>
                        <p className="promo-desc">
                            Our API-first approach ensures that your gym stays ahead of the curve with bespoke tool integrations.
                        </p>
                        <button className="btn-primary">Request Custom Integration</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Integrations;
