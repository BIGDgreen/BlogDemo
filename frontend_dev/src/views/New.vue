<template>
  <div class="new">
    <form-tmp :form="blog" v-on:submit="onSubmit"></form-tmp>
  </div>
</template>
<script>
import FormTmp from '@/components/FormTmp.vue'
import { newBlog } from '@/api/blog'
export default {
  components: {
    FormTmp
  },
  data() {
    return {
      blog: {
        title: '',
        content: '',
        author: '',
        createtime: 0 // 时间戳
      }
    }
  },
  methods: {
    onSubmit() {
      this.blog.author = localStorage.getItem('username')
      this.blog.createtime = Date.now()
      newBlog(this.blog)
        .then(res => {
          this.$message.success('新建博客成功')
          this.$router.go(-1)
        })
        .catch(err => {
          this.$message.error(err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
</style>