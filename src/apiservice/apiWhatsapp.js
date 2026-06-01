import axios from './axiosInstance';
import { API_BASE_URL, API_URLs } from './apiconstants';


export const sendWelcomeMsg = async (memberId) => {

    const url = API_BASE_URL + API_URLs.SEND_WELCOME_MSG(memberId);
    try {
        const response = await axios.post(url,{});
        return response.data;
    } catch (error) {
        throw error;
    }
}
