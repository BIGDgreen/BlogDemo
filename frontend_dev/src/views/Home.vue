<template>
  <div class="home">
    <el-container>
      <el-main>
        <el-input
          placeholder="搜索"
          v-model="searchInput"
          class="left search-header"
          @keyup.native.enter="search"
        >
          <el-select
            v-model="curOption"
            style="width:100px"
            slot="prepend"
            placeholder="请选择"
            v-on:change="changeOption"
          >
            <el-option label="标题" value="title"></el-option>
            <el-option label="作者" value="author"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
        <el-card class="left" shadow="never">
          <div v-for="blog in blogs" :key="blog.id">
            <list-item
              :title="blog.title"
              :content="blog.content"
              :author="blog.author"
              :time="blog.time"
              v-on:toDetail="toDetail(blog.id)"
            ></list-item>
          </div>
          <span v-if="blogs && blogs.length === 0" class="bottom-tip">暂无数据~</span>
          <span v-else class="bottom-tip">到底了~</span>
        </el-card>
      </el-main>

      <el-aside>
        <el-card class="right">
          <self-card v-on:toNew="navigate('new')" v-on:toAdmin="navigate('admin')"></self-card>
        </el-card>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import ListItem from '@/components/ListItem.vue'
import SelfCard from '@/components/SelfCard.vue'
import { getBlogs } from '@/api/blog'
import { translateBlog } from '@/utils/utils'

export default {
  name: 'Home',
  components: {
    ListItem,
    SelfCard
  },
  data() {
    return {
      curOption: '作者',
      option: 'author',
      searchInput: '',
      blogs: []
    }
  },
  mounted() {
    // 获取博客列表
    getBlogs().then(res => {
      this.showBlogs(res)
    })
  },
  methods: {
    changeOption(e) {
      this.option = e
    },
    showBlogs(res) {
      this.blogs = res
      this.blogs.forEach(blog => {
        translateBlog(blog)
      })
    },
    search() {
      const query = {
        [this.option]: this.searchInput
      }
      getBlogs(query).then(res => {
        this.showBlogs(res)
      })
    },
    navigate(path) {
      this.$router.push(`./${path}`)
    },
    toDetail(id) {
      this.$router.push({
        path: './detail',
        query: { id }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.left {
  width: 90%;
  margin-top: 1rem;
  margin-left: 2rem;
}
.right {
  margin-right: 3rem;
  margin-top: 4rem;
  background: url(../assets/loginBg.png);
  position: fixed;
  width: 15rem;
}
.bottom-tip {
  display: inline-block;
  width: 100%;
  color: #999;
  font-size: 0.8rem;
  text-align: center;
}
</style>
