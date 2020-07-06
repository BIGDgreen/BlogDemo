var express = require('express');
var router = express.Router();
const { login } = require('../service/user');
const { SuccessModel, ErrorModel } = require('../model/ResModel');

/* GET user listing. */
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  const result = await login(username, password);
  if (result) {
    if (result.username) {
      req.session.username = result.username;
      req.session.realname = result.realname;
      res.json(new SuccessModel(result));
      return;
    }
    res.json(new ErrorModel('登录失败'));
  }
  res.json(new ErrorModel('登录失败，用户名密码错误'));
});

// router.get('/login-test', function (req, res, next) {
//   if (req.session.username) {
//     res.json(new SuccessModel('登录成功'));
//     return;
//   }
//   res.json(new ErrorModel('登录失败'));
// })

module.exports = router;
