import api from './axiosInstance';
import { handleApiError } from '../utils';

export const getResources = async (url) => {
return await api.get(url).catch(handleApiError)
};

export const postResources = async (url, data) => {
    return await api.post(url, data).catch(handleApiError)
};

// code here for put and delete requests