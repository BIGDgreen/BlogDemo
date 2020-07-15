<template>
  <div class="detail">
    <el-card class="card">
      <div class="header">
        <span class="title">{{blog.title}}</span>
        <el-button
          class="back-btn"
          type="primary"
          icon="el-icon-back"
          size="small"
          circle
          @click="toBack"
        ></el-button>
      </div>
      <div class="basic-info">
        <span class="author">{{blog.author}}</span>
        <span>{{blog.time}}</span>
      </div>
      <div class="content">{{blog.content}}</div>
    </el-card>
  </div>
</template>
<script>
import { getBlog } from '@/api/blog'
import { translateBlog } from '@/utils/utils'
export default {
  data() {
    return {
      blog: {}
    }
  },
  mounted() {
    const { id } = this.$route.query
    getBlog(id).then(res => {
      this.blog = res
      translateBlog(this.blog)
    })
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
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
    min-height: 80vh;
    .header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .title {
        font-weight: bold;
        font-size: 1.4rem;
      }
      .back-btn {
        margin-right: 2rem;
      }
    }

    .basic-info {
      margin-top: 1rem;
      font-size: 0.88rem;
      color: #666;
      .author {
        margin-right: 1rem;
      }
    }
    .content {
      margin-top: 1rem;
      text-indent: 2rem;
      word-wrap: break-word;
    }
  }
}
</style>