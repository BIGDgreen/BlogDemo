<template>
  <div class="register">
    <el-card class="box-card">
      <h2 class="title">注册</h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="registerForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="username" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="register-button"
            type="primary"
            :loading="loading"
            @click="register(ruleForm)"
          >提交</el-button>
          <el-button class="register-button" type="primary" plain @click="toBack">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { register } from '../api/user'
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
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ validator: validateUsername, trigger: 'change' }],
        password: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'cahnge' }]
      }
    }
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },
    register(ruleForm) {
      const { username, password } = ruleForm
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          register(username, password)
            .then(res => {
              this.$message.success('注册成功')
              this.$router.push('./login')
              this.loading = false
            })
            .catch(err => {
              this.$message.error(err)
              this.loading = false
            })
        } else {
          this.$message.error('请输入正确的提交信息')
          this.loading = false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.register {
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
  .register-button {
    width: 40%;
  }
}
.box-card {
  width: 480px;
}
</style>