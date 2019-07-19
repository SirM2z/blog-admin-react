import req from 'utils/request';

/**
 * 用户登录
 * @param {string} email 邮箱
 * @param {string} password 密码
 */
export const login = (email, password) => {
  return req.post('/login', {email, password});
}

/**
 * 用户注册
 * @param {string} username 用户名
 * @param {string} email 邮箱
 * @param {string} password 密码
 */
export const register = (username, email, password) => {
  return req.post('/register', {username, email, password});
}

/**
 * 用户列表
 * @param {number} page 页码
 * @param {number} pageSize 每页数量
 * @param {string} order 升序/降序 asc/desc
 * @param {string} orderBy 排序字段
 */
export const userList = (page, pageSize, order, orderBy) => {
  return req.get('/user', {page, pageSize, order, orderBy});
}