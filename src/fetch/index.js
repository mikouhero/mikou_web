import axios from "axios";
import { Loading, Notification } from 'element-ui'
import qs from 'qs'
import Vue from 'vue'
import router from '@/router/index'
let mode = process.env.NODE_ENV === 'production' ? 2 : 1
const timeout = 10000
// 未登录
const not_authorized = 403
const token_expire = 10003
//请求成功
const ok = 0
let baseURL = ''
let loading

// 区分正式测试域名
if (mode === 1) {
    // baseURL = 'http://yili.com/index.php/';
    baseURL = 'http://localhost:8000';

} else if (mode == 2) {
    baseURL = ''
}
const fetch = axios.create({
    baseURL,
    timeout,
    transformRequest: [function (data, headers) {
        data.token = mode === 2 ? localStorage.getItem('token') : 'admin'
        const contentType = headers['Content-Type']

        if (!contentType || contentType === 'application/x-www-form-urlencoded') {
            data = qs.stringify(data)
        } else if (contentType === 'application/json') {
            data = JSON.stringify(data)
        }
        return data
    }]
})

// 请求接口中间件
fetch.interceptors.request.use(function (config) {
    loading = Loading.service({
        lock: true,
        text: '数据请求中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)'
    })
    let token = localStorage.getItem('token')
    if (token) {  
        // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.common['token'] = token
    }
    return config;
}, function (error) {
    return Promise.reject(error)
})

//返回信息中间件

fetch.interceptors.response.use(function (response) {
    loading && loading.close()

    // 判断登录  
    if (response.data.errcode === not_authorized || response.data.errcode ===token_expire) {
        Notification.error('登录信息失效，请重新登录')
        localStorage.removeItem('name')
        localStorage.removeItem('account')
        localStorage.removeItem('menulist')
        localStorage.removeItem('token')
        router.push({
            path: `/login`
        })
        return Promise.reject(response.data)
    }

    else if (response.data.errcode != ok) {
        console.log(response.data)
        Notification.error({
            message: response.data.msg || '接口请求错误'
        })
        console.log(response.data.msg)

        return Promise.reject(response.data)
    }
    else {
        return Promise.resolve(response.data)
    }




}, function (error) {
    loading && loading.close()
    return Promise.reject(error)
});

export default fetch