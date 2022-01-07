import { newAxiosRequestConfig } from './../../helper/axios/axios';
import { GetUserRequest } from './../../models/user/user.api';
import axios from 'axios'
import { getBaseURL } from '../base';


const getUserAPI = (payload: GetUserRequest) => {
    const axiosRequest = newAxiosRequestConfig(true)

    return new Promise(async (resolve, reject) => {
        await axios.post(getBaseURL() + '/user/get', payload, axiosRequest)
            .then((res) => {
                resolve(res.data)
            }).catch((err) => {
                reject(err.response.data)
            })
    });
}

export default getUserAPI;