import { http } from '../utils/request'

const apiPrefix = '/api/user/';

export function login(username, password) {
    return http.post(apiPrefix + 'login', {
        username, password
    })
}

export function register(username, password) {
    return http.post(apiPrefix + 'register', {
        username, password
    })
}

