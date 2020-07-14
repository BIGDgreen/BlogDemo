<template>
  <div class="edit">
    <form-tmp :form="blog" v-on:submit="onSubmit"></form-tmp>
  </div>
</template>
<script>
import FormTmp from '@/components/FormTmp.vue'
import { getBlog, updateBlog } from '@/api/blog'
export default {
  components: {
    FormTmp
  },
  data() {
    return {
      blog: {}
    }
  },
  mounted(query) {
    const { id } = this.$route.query
    getBlog(id).then(res => {
      this.blog = res
    })
  },
  methods: {
    onSubmit() {
      updateBlog(this.blog)
        .then(res => {
          this.$message.success('更新成功')
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