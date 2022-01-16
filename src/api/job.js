import urls from "./urls"
import fetch from "../fetch"

export function job_list(data={}){
    return fetch.post(urls.job_list, data);
}

export function job_add(data = {}) {
    return fetch.post(urls.job_add, data)
}

export function job_del(data = {}) {
    return fetch.post(urls.job_del, data)
}

export function job_edit(data = {}) {
    return fetch.post(urls.job_edit, data)
}
