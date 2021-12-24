import urls from './urls'
import fetch from '../fetch'

export function menu_list(data = {}) {
    return fetch.post(urls.menu_list, data)
}

export function menu_add(data = []) {
    return fetch.post(urls.menu_create, data)
}

export function menu_update(data = []) {
    return fetch.post(urls.menu_update, data)
}

export function menu_delete(data = []) {
    return fetch.post(urls.menu_delete, data)
}

export function menu_detail(data = []) {
    return fetch.post(urls.menu_detail, data)
}