import { http } from '../utils/request'
import { isObject } from '../utils/utils'

const apiPrefix = '/api/blog/';

export function getBlogs(query) {
    let url = apiPrefix + 'list'
    if (query === 'isadmin') {
        url += '?isadmin=1'
    } else if (isObject(query)) {
        const key = Object.keys(query)[0];
        const value = query[key];
        url += `?${key}=${value}`
    }
    return http.get(url)
}

export function getBlog(id) {
    return http.get(`${apiPrefix}detail?id=${id}`)
}

export function newBlog(blogData) {
    return http.post(apiPrefix + 'new',
        blogData
    )
}

export function deleteBlog(id) {
    return http.post(apiPrefix + 'delete',
        { id }
    )
}

export function updateBlog(blogData) {
    return http.post(`${apiPrefix}update?id=${blogData.id}`,
        blogData
    )
}