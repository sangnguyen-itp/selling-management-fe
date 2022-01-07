import { newAxiosRequestConfig } from './../../helper/axios/axios';
import axios from 'axios'
import { getBaseURL } from '../base';
import { ProductListRequest } from '../../models/product/product.api';

const listProductsAPI = (payload: ProductListRequest) => {
    const axiosRequest = newAxiosRequestConfig(true)

    return new Promise(async (resolve, reject) => {
        await axios.post(getBaseURL() + '/product/list', payload, axiosRequest)
            .then((res) => {
                resolve(res.data)
            }).catch((err) => {
                reject(err.response.data)
            })
    });
}

export default listProductsAPI;