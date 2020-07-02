const { querySql, queryOne, insert, update, deleteSql, escape } = require('../db/index')

/**
 * 获取所有博客列表
 * @param {object} data
 * @returns {Promise}
 */
const getList = (query) => {
    const { author = '', keyword = '' } = query;
    author = escape(author);
    keyword = escape(keyword);
    let sql = 'select * from blog';
    if (author || keyword) {
        sql += ' where `state`=1 ';
        author && (sql += `and author=${author}`);
        keyword && (sql += `and title like '%${keyword}%'`)
    }
    sql += ' order by createtime desc;'
    return querySql(sql);
}

/**
 * 获取博客详情
 * @param {number} id 
 * @returns {Promise}
 */
const getDetail = (id) => {
    id = escape(id);
    return queryOne(`select * from blog where \`state\`=1 and id=${id};`);
}

/**
 * 新增博客
 * @param {object} blogData 
 * @returns {Promise}
 */
const newBlog = (blogData = {}) => {
    escapeObject(blogData);
    return insert(blogData, 'blog')
}

/**
 * 更新博客
 * @param {number} id 
 * @param {object} blogData 
 */
const updateBlog = (id, blogData = {}) => {
    id = escape(id);
    escapeObject(blogData);
    return update(id, '', blogData, 'blog');
}

/**
 * 删除博客
 * @param {number} id 
 */
const deleteBlog = (id, author) => {
    id = escape(id);
    author = escape(author);
    return deleteSql(id, author, {}, 'blog');
}

const escapeObject = (obj) => {
    Object.keys(obj).forEach(key => {
        if (obj.hasOwnProperty(key)) {
            obj[key] = escape(obj[key]);
        }
    });
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}
