import urls from "./urls"
import fetch from "../fetch"

export function user_list(data={}){
    return fetch.post(urls.user_list, data);
}

export function user_info(data = {}) {
    return fetch.post(urls.user_info, data)
}

export function user_add(data = {}) {
    return fetch.post(urls.user_add, data)
}

export function user_reset(data = {}) {
    return fetch.post(urls.user_reset, data)
}

export function user_edit(data = {}) {
    return fetch.post(urls.user_edit, data)
}
