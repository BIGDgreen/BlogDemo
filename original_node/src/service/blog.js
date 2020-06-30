/**
 * 获取博客列表
 * @param {object} data 
 */
const getList = (data) => {
    const { author, keyword } = data;
    // 查询数据库
    return [
        {
            id: 1,
            title: 'Title A',
            content: 'Balalallala A',
            createtime: 1593444174914,
            author: 'Zhang san'
        },
        {
            id: 2,
            title: 'Title B',
            content: 'Balalallala B',
            createtime: 1593444253424,
            author: 'Li si'
        }
    ]
}

/**
 * 获取博客详情
 * @param {number} id 
 */
const getDetail = (id) => {
    return {
        id: 1,
        title: 'Title A',
        content: 'Balalallala A',
        createtime: 1593444174914,
        author: 'Zhang san'
    }
}

const newBlog = (blogData = {}) => {
    const { title, content } = blogData;
    return {
        id: 3
    }
}

const updateBlog = (id, blogData = {}) => {
    return true;
}

const deleteBlog = (id) => {
    return true;
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}
