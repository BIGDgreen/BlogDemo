<template>
  <div class="admin">
    <el-card class="header">
      <div class="header-card">
        <div class="basic-info">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <div class="name">{{username}}</div>
        </div>
        <div>
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="small"
            circle
            @click="navigate({path:'new'})"
          ></el-button>
          <el-button
            type="primary"
            plain
            icon="el-icon-s-home"
            size="small"
            circle
            @click="navigate({path:'/'})"
          ></el-button>
        </div>
      </div>
    </el-card>
    <el-card shadow="never">
      <div v-for="blog in blogs" :key="blog.id">
        <list-item
          :title="blog.title"
          :content="blog.content"
          :author="blog.author"
          :time="blog.time"
        >
          <template v-slot:footer>
            <div>
              <el-button
                type="primary"
                size="mini"
                round
                @click="navigate({path:'edit',id:blog.id})"
              >编辑</el-button>
              <el-button type="danger" size="mini" round @click="onDelete(blog.id)">删除</el-button>
              <el-button
                type="primary"
                size="mini"
                plain
                round
                @click="navigate({path:'detail',id:blog.id})"
              >查看</el-button>
            </div>
          </template>
        </list-item>
      </div>
      <span v-if="blogs && blogs.length === 0" class="bottom-tip">暂无数据~</span>
      <span v-else class="bottom-tip">到底了~</span>
    </el-card>
  </div>
</template>

<script>
// @ is an alias to /src
import ListItem from '@/components/ListItem.vue'
import SelfCard from '@/components/SelfCard.vue'
import { getBlogs, deleteBlog } from '@/api/blog'
import { translateBlog } from '@/utils/utils'

export default {
  name: 'Home',
  components: {
    ListItem,
    SelfCard
  },
  data() {
    return {
      username: localStorage.getItem('username'),
      select: '标题',
      blogs: [
        {
          id: 1,
          title: 'web常见登录实现方式总结',
          content:
            '为什么需要登录HTTP是一种无状态的协议，客户端每次发送请求时会与服务器建立一个连接，请求之后断开连接。因此每次请求都是独立的，服务器无法判断每次请求是否是来自同一个用户。所以登录是为了让服务器在多次请求之间能识别出用户。实现登录的思路暂时抛开具体的技术不谈，我们先思考一下登录的实现。以用户名密码登录为例，用户输入的用户名、密码校验成功后，登录成功。那么如何知道后续的请求都来自这个用户呢？考虑到HTTP的无状态性，后面的每次请求都应该带上一个能唯一识别用户的标识。如果这个标识是单纯的用户名+密码，我们有两种实现思路：一种是每次都让用户输入用户名密码，这样虽然安全，但显然会造成极差的用户体验，因此舍掉。另一种是将用户名密码存储在某个位置，每次请求时自动带上，这样虽然方便，但直接存储用户名密码显然很容易被盗取，毫无安全性可言。因此，我们想到用另一个标识代替用户名密码。这个标识最好是谁都看不懂的那种，而且它必须不重复，每个人拥有的标识都是独一无二的。由此一来，又引发出三个问题：这个标识从哪来？客户端怎么将标识传给服务端？服务端该如何验证这个标识？为了解决这三个问题，引入如下技术，这也是目前业界通用的登录方案：',
          author: '张猴子',
          time: '2020-01-20'
        },
        {
          id: 2,
          title: 'web常见登录实现方式总结',
          content:
            '为什么需要登录HTTP是一种无状态的协议，客户端每次发送请求时会与服务器建立一个连接，请求之后断开连接。因此每次请求都是独立的，服务器无法判断每次请求是否是来自同一个用户。所以登录是为了让服务器在多次请求之间能识别出用户。实现登录的思路暂时抛开具体的技术不谈，我们先思考一下登录的实现。以用户名密码登录为例，用户输入的用户名、密码校验成功后，登录成功。那么如何知道后续的请求都来自这个用户呢？考虑到HTTP的无状态性，后面的每次请求都应该带上一个能唯一识别用户的标识。如果这个标识是单纯的用户名+密码，我们有两种实现思路：一种是每次都让用户输入用户名密码，这样虽然安全，但显然会造成极差的用户体验，因此舍掉。另一种是将用户名密码存储在某个位置，每次请求时自动带上，这样虽然方便，但直接存储用户名密码显然很容易被盗取，毫无安全性可言。因此，我们想到用另一个标识代替用户名密码。这个标识最好是谁都看不懂的那种，而且它必须不重复，每个人拥有的标识都是独一无二的。由此一来，又引发出三个问题：这个标识从哪来？客户端怎么将标识传给服务端？服务端该如何验证这个标识？为了解决这三个问题，引入如下技术，这也是目前业界通用的登录方案：',
          author: '张猴子',
          time: '2020-01-20'
        },
        {
          id: 3,
          title: 'web常见登录实现方式总结',
          content:
            '为什么需要登录HTTP是一种无状态的协议，客户端每次发送请求时会与服务器建立一个连接，请求之后断开连接。因此每次请求都是独立的，服务器无法判断每次请求是否是来自同一个用户。所以登录是为了让服务器在多次请求之间能识别出用户。实现登录的思路暂时抛开具体的技术不谈，我们先思考一下登录的实现。以用户名密码登录为例，用户输入的用户名、密码校验成功后，登录成功。那么如何知道后续的请求都来自这个用户呢？考虑到HTTP的无状态性，后面的每次请求都应该带上一个能唯一识别用户的标识。如果这个标识是单纯的用户名+密码，我们有两种实现思路：一种是每次都让用户输入用户名密码，这样虽然安全，但显然会造成极差的用户体验，因此舍掉。另一种是将用户名密码存储在某个位置，每次请求时自动带上，这样虽然方便，但直接存储用户名密码显然很容易被盗取，毫无安全性可言。因此，我们想到用另一个标识代替用户名密码。这个标识最好是谁都看不懂的那种，而且它必须不重复，每个人拥有的标识都是独一无二的。由此一来，又引发出三个问题：这个标识从哪来？客户端怎么将标识传给服务端？服务端该如何验证这个标识？为了解决这三个问题，引入如下技术，这也是目前业界通用的登录方案：',
          author: '张猴子',
          time: '2020-01-20'
        }
      ]
    }
  },
  mounted() {
    getBlogs('isadmin').then(res => {
      this.blogs = res
      this.blogs.forEach(blog => {
        translateBlog(blog)
      })
    })
  },
  methods: {
    onDelete(id) {
      this.$confirm('确定要删除该博客吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBlog(id)
          .then(res => {
            this.$message.success('删除成功')
          })
          .catch(err => {
            this.$message.error(err)
          })
      })
    },
    navigate(params) {
      const { path, id } = params
      this.$router.push({
        path,
        query: { id }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.admin {
  padding: 2rem 4rem;
  /deep/ .el-avatar {
    width: 52px;
    height: 52px;
    display: inline-block;
  }
  .header {
    margin-bottom: 2rem;
    background: url('../assets/loginBg.png');
    width: 100%;
  }
  .header-card {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin: 0 auto;
    .basic-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      .name {
        color: white;
        margin-left: 1rem;
      }
    }
  }
  .bottom-tip {
    display: inline-block;
    width: 100%;
    color: #999;
    font-size: 0.8rem;
    text-align: center;
  }
}
</style>
