import urls from "./urls"
import fetch from "../fetch"

export function lo_login(data={}){
    return fetch.post(urls.lo_login, data);
}

export function lo_logout(data = {}) {
    return fetch.post(urls.lo_logout, data)
}

export function lo_user_info(data = {}) {
    return fetch.post(urls.lo_user_info, data)
}

export function lo_reset_info(data = {}) {
    return fetch.post(urls.lo_reset_info, data)
}

export function lo_reset_password(data = {}) {
    return fetch.post(urls.lo_reset_password, data)
}