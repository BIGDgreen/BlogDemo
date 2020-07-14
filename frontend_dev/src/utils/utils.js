// 时间戳格式转换
export function translateTime(timestamp) {
    return new Date(parseInt(timestamp)).toLocaleString().replace(/:\d{1,2}$/, ' ');
}

// 判断是否是对象
export function isObject(o) {
    return Object.prototype.toString.call(o) === '[object Object]';
}

export function decodeXss(str) {
    let s = "";
    if (str.length == 0) return "";
    s = str.replace(/&amp;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    return s;
}

export function translateBlog(blog) {
    blog.time = translateTime(blog.createtime)
    blog.title = decodeXss(blog.title)
    blog.content = decodeXss(blog.content)
}

