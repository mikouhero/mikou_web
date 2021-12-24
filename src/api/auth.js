import urls from './urls'
import fetch from '../fetch'

export function user_auth_list(data = {}) {
    return fetch.post(urls.user_auth_list, data)
}

export function role_list(data=[]){
    return fetch.post(urls.auth_list,data)
}

export function role_delete(data=[]){
    return fetch.post(urls.auth_delete,data)
}

export function role_add(data=[]){
    return fetch.post(urls.auth_add,data)
}

export function role_edit(data=[]){
    return fetch.post(urls.auth_edit,data)
}

export function role_detail(data=[]){
    return fetch.post(urls.auth_detail,data)
}