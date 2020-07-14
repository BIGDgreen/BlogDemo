<template>
  <div class="login">
    <el-card class="box-card">
      <h2 class="title">论坛系统</h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="username" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-button"
            type="primary"
            :loading="logining"
            @click="login(ruleForm)"
          >登录</el-button>
          <el-button class="login-button" type="primary" plain @click="toRegister()">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login } from '../api/user'
export default {
  name: 'Login',
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      logining: false, // 登录请求中
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ validator: validateUsername, trigger: 'change' }],
        password: [{ validator: validatePass, trigger: 'change' }]
      }
    }
  },
  // 判断自动登录
  mounted() {
    const username = localStorage.getItem('username')
    if (username) {
      this.$router.push('/')
    }
  },
  methods: {
    login(ruleForm) {
      const { username, password } = ruleForm
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.logining = true
          login(username, password)
            .then(res => {
              const { username } = res
              // 存储用户名
              localStorage.setItem('username', username)
              this.logining = false
              this.$router.push('/')
            })
            .catch(err => {
              // console.log(err)
              this.$message.error(err.msg)
              this.logining = false
            })
        } else {
          this.logining = false
        }
      })
    },
    toRegister() {
      this.$router.push('./register')
    }
  }
}
</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: url(../assets/loginBg.png);
  background-size: cover;
  .title {
    width: 100%;
    text-align: center;
  }
  .login-button {
    width: 40%;
  }
}
.box-card {
  width: 480px;
}
</style>