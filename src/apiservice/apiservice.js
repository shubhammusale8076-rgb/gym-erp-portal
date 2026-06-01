import axios from './axiosInstance';
import { API_BASE_URL, API_URLs } from './apiconstants';

export const loginUser = async (body) => {
    const url = `${API_BASE_URL}${API_URLs.LOGIN}`;

    try {

        const response = await axios.post(url, body)
        return response.data;

    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};

export const resetPassword = async (memberId) => {
    const url = `${API_BASE_URL}${API_URLs.RESET_PASSWORD(memberId)}`;

    try {
        const response = await axios.post(url, {});
        return response.data;
    } catch (error) {
        console.error("Error resetting password:", error.response || error.message);
        throw error;
    }
};

export const getPaymentAccess = async (token) => {
    const url = `${API_BASE_URL}${API_URLs.PAYMENT_ACCESS(token)}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error getting payment access:", error.response || error.message);
        throw error;
    }
};


export const searchUser = async (fullName) => {
    const url = `${API_BASE_URL}${API_URLs.SEARCH_USER(fullName)}`;

    try {
        const response = await axios.get(url)
        return response.data;
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};

export const assignUsersToRole = async (body) => {
    const url = `${API_BASE_URL}${API_URLs.ASSIGN_ROLE}`;

    try {
        const response = await axios.post(url, body)
        return response.data;
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};

export const getAllUsers = async () => {
    const url = `${API_BASE_URL}${API_URLs.GET_ALL_USERS}`;

    try {
        const response = await axios.get(url)
        return response.data;
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};

export const getAllRoles = async () => {
    const url = `${API_BASE_URL}${API_URLs.GET_ALL_ROLES}`;

    try {
        const response = await axios.get(url)
        return response.data;
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};

export const createRole = async (body) => {
    const url = `${API_BASE_URL}${API_URLs.CREATE_ROLE}`;

    try {
        const response = await axios.post(url, body)
        return response.data;
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};

export const updateRole = async (body) => {
    const url = `${API_BASE_URL}${API_URLs.UPDATE_ROLE}`;

    try {
        const response = await axios.put(url, body)
        return response.data;
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};

export const getAllMembers = async () => {
    const url = `${API_BASE_URL}${API_URLs.GET_ALL_MEMBERS}`;

    try {
        const response = await axios.get(url)
        return response.data;
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};

export const createMemberAPI = async (body) => {
    const url = `${API_BASE_URL}${API_URLs.ADD_MEMBER}`;

    try {
        const response = await axios.post(url, body,);
        return response.data;
    } catch (error) {
        console.error("Error creating member:", error.response || error.message);
        throw error;
    }
};

export const getMemberById = async (id) => {
    const url = `${API_BASE_URL}${API_URLs.GET_MEMBER_BY_ID(id)}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching member:", error.response || error.message);
        throw error;
    }
};

export const uploadProfileImage = async (file, type) => {
    const url = `${API_BASE_URL}${API_URLs.UPLOAD_MEMBER_PROFILE}`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    try {
        const response = await axios.post(url, formData);

        return response.data;

    } catch (error) {
        console.error('Upload Error:', error.response || error.message);
        throw error;
    }
};

export const deleteProfileImage = async (publicId) => {
    const url = `${API_BASE_URL}${API_URLs.UPLOAD_MEMBER_PROFILE}?publicId=${publicId}`;

    try {
        await axios.delete(url);
    } catch (error) {
        console.error('Delete Error:', error.response || error.message);
        throw error;
    }
};

export const updateMemberAPI = async (id, body) => {
    const url = `${API_BASE_URL}${API_URLs.UPDATE_MEMBER(id)}`;

    try {
        const response = await axios.put(url, body);
        return response.data;
    } catch (error) {
        console.error("Error updating member:", error.response || error.message);
        throw error;
    }
};

export const deleteMemberAPI = async (id) => {
    const url = `${API_BASE_URL}${API_URLs.DELETE_MEMBER(id)}`;

    try {
        const response = await axios.delete(url);
        return response.data;
    } catch (error) {
        console.error("Error deleting member:", error.response || error.message);
        throw error;
    }
};

export const getAllPlans = async () => {
    const url = `${API_BASE_URL}${API_URLs.GET_ALL_PLAN}`;

    try {
        const response = await axios.get(url)
        return response.data;
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};

export const getPlanList = async () => {
    const url = `${API_BASE_URL}${API_URLs.GET_PLAN_LIST}`;

    try {
        const response = await axios.get(url)
        return response.data;
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};

export const createPlan = async (body) => {
    const url = `${API_BASE_URL}${API_URLs.CREATE_PLAN}`;

    try {
        const response = await axios.post(url, body)
        return response.data;
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};

export const getPlanComparison = async () => {
    const url = `${API_BASE_URL}${API_URLs.GET_PLAN_COMPARISON}`;

    try {
        const response = await axios.get(url)
        return response.data;
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};

export const updatePlan = async (body, id) => {
    const url = `${API_BASE_URL}${API_URLs.UPDATE_PLAN}/${id}`;

    try {
        const response = await axios.put(url, body)
        return response.data;
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};

export const deletePlan = async (id) => {
    const url = `${API_BASE_URL}${API_URLs.DELETE_PLAN(id)}`;

    try {
        const response = await axios.delete(url)
        return response.data;
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};

export const getPlanInsight = async () => {
    const url = `${API_BASE_URL}${API_URLs.GET_PLAN_INSIGHT}`;

    try {
        const response = await axios.get(url)
        return response.data;
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};

export const getAllTrainers = async () => {
    const url = `${API_BASE_URL}${API_URLs.GET_ALL_TRAINERS}`;

    try {
        const response = await axios.get(url)
        return response.data;
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};

export const getTrainerById = async (id) => {
    const url = `${API_BASE_URL}${API_URLs.GET_TRAINER_BY_ID(id)}`;

    try {
        const response = await axios.get(url)
        return response.data;
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};

// Assignment Section

export const getMembers = async () => {
    const url = `${API_BASE_URL}${API_URLs.GET_MEMBERS}`;

    try {
        const response = await axios.get(url)
        return response.data;
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};

export const addTrainer = async (body) => {
    const url = `${API_BASE_URL}${API_URLs.ADD_TRAINER}`;

    try {
        const response = await axios.post(url, body)
        return response.data;
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};

export const updateTrainer = async (id, body) => {
    const url = `${API_BASE_URL}${API_URLs.UPDATE_TRAINER(id)}`;

    try {
        const response = await axios.put(url, body)
        return response.data;
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};

export const deleteTrainer = async (id) => {
    const url = `${API_BASE_URL}${API_URLs.DELETE_TRAINER(id)}`;

    try {
        const response = await axios.delete(url)
        return response.data;
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};

export const getTrainers = async () => {
    const url = `${API_BASE_URL}${API_URLs.GET_TRAINERS}`;

    try {
        const response = await axios.get(url)
        return response.data;
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};

export const getTrainerData = async (id) => {
    const url = `${API_BASE_URL}${API_URLs.GET_TRAINER_DATA(id)}`;

    try {
        const response = await axios.get(url)
        return response.data;
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};

export const assignMembers = async (body) => {
    const url = `${API_BASE_URL}${API_URLs.ASSIGN_TRAINER}`;

    try {
        const response = await axios.post(url, body)
        return response.data;
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};

export const unAssignMember = async (trainerId, memberId) => {
    const url = `${API_BASE_URL}${API_URLs.UNASSIGN_TRAINER(trainerId, memberId)}`;

    try {
        const response = await axios.delete(url)
        return response.data;
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};


export const getIntegration = async () => {
    const url = `${API_BASE_URL}${API_URLs.GET_INTEGRATION}`;

    try {
        const response = await axios.get(url)
        return response.data;
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};

export const getIntegrationByService = async (service) => {
    const url = `${API_BASE_URL}${API_URLs.GET_INTEGRATION_BY_SERVICE(service)}`;


    try {
        const response = await axios.get(url)
        return response.data;
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};

export const getGoogleConnectUrl = async () => {
    const url = `${API_BASE_URL}${API_URLs.GOOGLE_CONNECT}`;

    try {
        const response = await axios.get(url)
        return response.data;
    } catch (error) {

        console.error(
            "Google connection failed",
            error.response || error.message
        );
        throw error;
    }
};


export const getMembershipList = async () => {
    const url = `${API_BASE_URL}${API_URLs.GET_MEMBERSHIP_LIST}`;

    try {
        const response = await axios.get(url)
        return response.data;
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};

export const getMembershipByMemberId = async (memberId) => {
    const url = `${API_BASE_URL}${API_URLs.GET_MEMBERSHIP_BY_MEMBER_ID(memberId)}`;

    try {
        const response = await axios.get(url)
        return response.data;
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};


