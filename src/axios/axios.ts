import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { Ihttp } from '../utils/modules'

// axios.defaults.baseURL = 'http://127.0.0.1:8081/'
// axios.create({baseURL: '/api'})

// 请求拦截器
axios.interceptors.request.use((config: AxiosRequestConfig | any) => config)

// 响应拦截器
axios.interceptors.response.use((res: AxiosResponse | any) =>
    res
    , (err: any) => {
        err
    })

const http: Ihttp = {
    request(method, url, params) {
        return axios({
            method: method,
            url: url,
            data: params
        })
    }
}


export default http