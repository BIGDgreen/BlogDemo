const { querySql, queryOne, insert, update, deleteSql } = require('../db/mysql')
const { transform, transformObject } = require('../utils/transformInput')

/**
 * 获取所有博客列表
 * @param {object} data
 * @returns {Promise}
 */
const getList = async (query) => {
    let { author = '', keyword = '' } = query;
    author = transform(author);
    keyword = transform(keyword);
    let sql = 'select * from blog where `state`=1 ';
    if (author || keyword) {
        author && (sql += `and author='${author}'`);
        keyword && (sql += `and title like '%${keyword}%'`)
    }
    sql += ' order by createtime desc;'
    return await querySql(sql);
}

/**
 * 获取博客详情
 * @param {number} id 
 * @returns {Promise}
 */
const getDetail = async (id) => {
    id = transform(id);
    return await queryOne(`select * from blog where \`state\`=1 and id='${id}';`);
}

/**
 * 新增博客
 * @param {object} blogData 
 * @returns {Promise}
 */
const newBlog = async (blogData = {}) => {
    transformObject(blogData);
    return await insert(blogData, 'blog')
}

/**
 * 更新博客
 * @param {number} id 
 * @param {object} blogData 
 */
const updateBlog = async (id, blogData = {}) => {
    id = transform(id);
    transformObject(blogData);
    return await update(id, '', blogData, 'blog');
}

/**
 * 删除博客
 * @param {number} id 
 */
const deleteBlog = async (id, author) => {
    id = transform(id);
    author = transform(author);
    return await deleteSql(id, author, {}, 'blog');
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}
