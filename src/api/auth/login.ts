import { Response } from './../../models/common/Response';
import { Login } from './../../models/auth/Login'
import axios from 'axios'

const baseURL = process.env.REACT_APP_BASE_URL

const loginAPI = (payload: Login) => {
    return new Promise(async (resolve, reject) => {
        await axios.post(baseURL + "/auth/login", payload)
            .then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error.response.data)
            })
    });
}

export default loginAPI;