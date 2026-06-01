import axios from './axiosInstance';
import { API_BASE_URL, API_URLs, } from "../apiservice/apiconstants";

// export const getIntegration = async () => {

//     const url = `${API_BASE_URL}${API_URLs.GET_INTEGRATION}`;

//     try {
//         const response =await axios.get(url);
//         return response.data;
//     } catch (error) {
//         console.error( "Error:",error.response || error.message);
//         throw error;
//     }
// };

/*
=======================================
TEMP VALIDATION
DOES NOT SAVE INTEGRATION
=======================================
*/

export const validateIntegrationapi = async (payload) => {

    const url = `${API_BASE_URL}${API_URLs.VALIDATE_INTEGRATION}`;
    console.log(url);
    console.log(payload);
    try {
        const response = await axios.post(url, payload);
        return response.data;
    } catch (error) {
        console.error("Validation Error:", error.response || error.message);
        throw error;
    }
};

/*
=======================================
FINAL CONNECT
PERSISTS INTEGRATION
=======================================
*/

export const connectIntegrationApi = async (payload) => {

    const url = `${API_BASE_URL}${API_URLs.CONNECT_INTEGRATION}`;

    try {
        const response = await axios.post(url, payload);
        return response.data;
    } catch (error) {
        console.error(
                "Connection Error:",
                error.response?.data ||
                error.message
            );

            throw error;
    }
};


export const disconnectIntegrationApi = async (integrationType) => {
    const url = `${API_BASE_URL}${API_URLs.DISCONNECT_INTEGRATION(integrationType)}`;

    try {
        const response = await axios.post(url);
        return response.data;
    } catch (error) {
        console.error("Disconnection Error:", error.response?.data || error.message);
        throw error;
    }
};
