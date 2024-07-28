import api from './axiosInstance';
import { handleApiError } from '../utils';
import APIHeaders from '../../Config/ApiConfig/Headers'

export const getResources = async (url) => {
return await api.get(url,APIHeaders).catch(handleApiError)
};

export const postResources = async (url, data) => {
    return await api.post(url, data,APIHeaders).catch(handleApiError)
};

export const putResources = async (url, data) => {
    return await api.put(url, data).catch(handleApiError)
};

// code here for put and delete requests