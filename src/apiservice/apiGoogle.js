import axios from './axiosInstance';
import { API_BASE_URL, API_URLs } from './apiconstants';

export const exportMembersToGoogleSheets = async () => {
  const url = `${API_BASE_URL}${API_URLs.EXPORT_MEMBERS_TO_GOOGLE_SHEETS}`;

  try {
    const response = await axios.post(url,{});
    return response.data;
  } catch (error) {
    console.error("Error exporting members to Google Sheets", error.response || error.message);
    throw error;
  }
};