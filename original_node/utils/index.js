/**
 * 判断是否为对象
 * @param {*} o 
 * @returns {boolean}
 */
const isObject = o => Object.prototype.toString.call(o) === '[object Object]'

const isString = s => typeof s === 'string'


module.exports = {
    isObject,
    isString
}
