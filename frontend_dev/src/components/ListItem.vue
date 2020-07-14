<template>
  <div class="list-item" @click="$emit('toDetail')">
    <div class="title">{{title | sliceTitle}}</div>
    <div class="content">{{content | sliceContent}}</div>
    <footer class="footer">
      <div class="author">{{author}}</div>
      <div class="time">{{time}}</div>
    </footer>
    <slot name="footer"></slot>
    <el-divider></el-divider>
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
  filters: {
    sliceTitle: function(value) {
      return value.length > 15 ? value.slice(0, 15) + '...' : value
    },
    sliceContent: function(value) {
      return value.length > 80 ? value.slice(0, 80) + '...' : value
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.list-item {
  padding-left: 1rem;
  &:hover {
    background: #f3f3f3;
  }
  .title {
    font-weight: bold;
    font-size: 1.4rem;
    &:hover {
      color: #5eabe7;
    }
  }
  .content {
    margin-top: 1rem;
    color: #666;
  }
  .footer {
    font-size: 0.8rem;
    color: #888;
    display: flex;
    flex-direction: row;
    margin-top: 1rem;
    margin-bottom: 1rem;
    .author {
      margin-right: 0.4rem;
    }
  }
}
</style>
