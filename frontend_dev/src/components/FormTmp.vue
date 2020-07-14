<template>
  <div class="form-tmp">
    <el-card class="card">
      <el-form ref="form" :model="form" label-position="top" label-width="80px">
        <el-form-item>
          <div class="label">标题</div>
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item prop="desc">
          <div class="label">内容</div>
          <el-input type="textarea" rows="12" v-model="form.content"></el-input>
        </el-form-item>
        <div class="btns">
          <el-button type="primary" class="btn" @click="$emit('submit')">提交</el-button>
          <el-button type="primary" plain class="btn" @click="toBack">返回</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  props: {
    form: Object
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.form-tmp {
  background: url('../assets/loginBg.png');
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .card {
    width: 90%;
    padding: 0.8rem 2rem;
    box-sizing: border-box;
    .label {
      font-weight: bold;
      font-size: 1.2rem;
      color: #666;
    }
    .btns {
      text-align: center;
    }
    .btn {
      width: 24%;
      margin: 0 1rem;
    }
  }
}
</style>