const { MYSQL_CONF } = require('./config')
const mysql = require('mysql')
const { isObject } = require('../utils/index')

const connect = () => {
    return mysql.createConnection(MYSQL_CONF);
}

/**
 * 数据库查询
 * @param {String} sql
 * @returns {Promise}
 */
const querySql = (sql) => {
    console.log('正在执行的sql语句', sql);
    const conn = connect(); // 创建连接对象
    return new Promise((resolve, reject) => {
        try {
            conn.query(sql, (err, results) => {
                if (err) {
                    console.error('查询数据库发生错误', err);
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        } catch (err) {
            reject(err);
        } finally {
            conn.end();
        }
    })
}

/**
 *查找一条信息
 *
 * @param {*} sql
 * @returns {Promise}
 */
const queryOne = (sql) => {
    return new Promise((resolve, reject) => {
        querySql(sql)
            .then(results => {
                if (results && results.length > 0) {
                    resolve(results[0])
                } else {
                    resolve(null)
                }
            }).catch(err => {
                reject(err)
            })
    })
}

/**
 * 向数据库中插入一行数据
 * @param {object} model 
 * @param {string} tablename 
 */
const insert = (model, tablename) => {
    return new Promise((resolve, reject) => {
        if (!isObject(model)) {
            reject(new Error('插入数据非对象'));
            return;
        } else {
            let keys = [];
            let values = [];
            Object.keys(model).forEach(key => {
                if (model.hasOwnProperty(key)) { // key为model自身的属性，而非原型链上继承的
                    keys.push(`\`${key}\``) // push的实际内容为`key`，加上反引号避免key被识别为关键字
                    values.push(`'${model[key]}'`)
                }
            })
            if (keys.length === 0 || values.length === 0) {
                reject(new Error('插入失败，对象中没有任何属性'))
                return;
            }
            let sql = `insert into ${tablename} (${keys.join(',')}) values (${values.join(',')})`;
            querySql(sql).then(result => {
                resolve('新建成功')
            }).catch(err => {
                reject(err)
            })
        }
    })
}

/**
 * 更新数据库
 * @param {number} id 
 * @param {object} model 
 * @param {string} tablename 
 */
const update = (id, author, model, tablename) => {
    // console.log('update', model);
    return new Promise((resolve, reject) => {
        if (!isObject(model)) {
            reject(new Error('更新数据库失败，更新数据非对象'));
            return;
        }
        let condition = [];
        Object.keys(model).forEach(key => {
            if (model.hasOwnProperty(key)) {
                condition.push(`\`${key}\`='${model[key]}'`);
            }
        })
        let sql = `update ${tablename} set ${condition.join(',')} where id='${id}'`;
        if (author) sql += `and author='${author}'`;
        sql += ' and `state`=1;';
        querySql(sql).then(result => {
            resolve('操作成功', result)
        }).catch(err => {
            reject(err)
        })
    })
}

/**
 * 删除数据库，这里实际是将state属性设置为0
 * @param {number} id 
 * @param {object} model 
 * @param {string} tablename 
 */
const deleteSql = (id, author, model, tablename) => {
    model.state = 0;
    return update(id, author, model, tablename);
}

module.exports = {
    querySql,
    queryOne,
    insert,
    update,
    deleteSql
}