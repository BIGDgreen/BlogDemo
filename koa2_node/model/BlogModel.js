class BlogModel {
    constructor(data) {
        const { title = '', content = '', createtime = 0, author = '' } = data;
        this.title = title;
        this.content = content;
        this.createtime = createtime;
        this.author = author;
    }
}

module.exports = BlogModel
