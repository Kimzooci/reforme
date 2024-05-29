import axios from 'axios';

export const checkSession = async () => {
    try {
        const response = await axios.get('/api/check-session', { withCredentials: true });
        return response.status === 200;
    } catch (error) {
        return false;
    }
};
