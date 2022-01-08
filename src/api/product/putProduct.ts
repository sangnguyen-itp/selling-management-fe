import { newAxiosRequestConfig } from './../../helper/axios/axios';
import axios from 'axios'
import { getBaseURL } from '../base';
import { ProductPutRequest } from '../../models/product/product.api';

const putProductAPI = (payload: ProductPutRequest, isUpdate: boolean) => {
    const axiosRequest = newAxiosRequestConfig(true)

    return new Promise(async (resolve, reject) => {
        if (isUpdate) {
            await axios.post(getBaseURL() + '/product/update', payload, axiosRequest)
                .then((res) => {
                    resolve(res.data)
                }).catch((err) => {
                    reject(err.response.data)
                })
        } else {
            await axios.post(getBaseURL() + '/product/create', payload, axiosRequest)
                .then((res) => {
                    resolve(res.data)
                }).catch((err) => {
                    reject(err.response.data)
                })
        }
    });
}

export default putProductAPI;