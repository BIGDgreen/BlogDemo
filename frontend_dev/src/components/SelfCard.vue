<template>
  <div class="self-card">
    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    <div class="name">{{username}}</div>
    <div class="btns">
      <el-button type="primary" icon="el-icon-plus" circle @click="$emit('toNew')"></el-button>
      <el-button type="primary" plain icon="el-icon-user" circle @click="$emit('toAdmin')"></el-button>
    </div>
    <el-button class="btns" type="primary" plain size="medium" @click="logout">退出登录</el-button>
  </div>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    title: String,
    content: String,
    author: String,
    time: String
  },
  data() {
    return { username: localStorage.getItem('username') }
  },
  filters: {
    sliceTitle: function(value) {
      return this.sliceArr(value, 15)
    },
    sliceContent: function(value) {
      return this.sliceArr(value, 80)
    }
  },
  methods: {
    sliceArr(value, length) {
      return value.length > length ? value.slice(0, length) + '...' : value
    },
    logout() {
      localStorage.removeItem('username')
      this.$router.push('/login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.self-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /deep/ .el-avatar {
    width: 52px;
    height: 52px;
  }
  .name {
    color: white;
    letter-spacing: 0.4rem;
    margin-top: 1rem;
  }
  .btns {
    margin-top: 1rem;
  }
}
</style>
