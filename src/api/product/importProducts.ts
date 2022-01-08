import { newAxiosRequestConfig } from './../../helper/axios/axios';
import axios from 'axios'
import { getBaseURL } from '../base';
import { ProductImportRequest } from '../../models/product/product.api';

const importProductsAPI = (payload: ProductImportRequest) => {
    const axiosRequest = newAxiosRequestConfig(true)
    axiosRequest.headers = {
        ...axiosRequest.headers,
        'Content-Type': 'multipart/form-data'
    }

    const formData = new FormData()
    formData.append('file', payload.file)

    return new Promise(async (resolve, reject) => {
        await axios.post(getBaseURL() + '/product/import', formData, axiosRequest)
            .then((res) => {
                resolve(res.data)
            }).catch((err) => {
                reject(err.response.data)
            })
    });
}

export default importProductsAPI;