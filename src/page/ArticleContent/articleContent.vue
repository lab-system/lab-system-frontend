<template>
  <div style="height: 800px;text-align: center">
<div style="height: 100%;width: 60%;margin-left: 20%;text-align: center;margin-top: 2%" v-for="item in list" :key="item.content" v-if="item.id === id">
  <div class="title">{{ item.title }}</div>
  <div class="content" style="height: 800px;">{{ item.content }}</div>
</div>
  </div>
</template>

<script>
   import { getArticleList } from '@/api/article'
  export default{
      data(){
          return {
              list:[],
              id: this.$route.query.id
          }
      },
      methods:{
           getList(){
          var params = {
              category_name: ['最新消息','毕业咨询'],
              tags_name: '公告栏'
          }
          getArticleList(params).then(response => {
              console.log('listResponse======>',response)
              this.list = response.data
              console.log('list',this.list)
              console.log('id',this.id)
          }).catch((e) => {
              console.log(e)
              this.list = []
          })
      },
      },
      created(){
          this.getList()
      }
  }
</script>

<style scoped>

  .title{
    text-align: center;
    font-size: 26px;
  }
  .content{
    margin-top: 5%;
    text-indent: 2em;
    font-size: 20px;
    letter-spacing: 3px;
    line-height: 25px;
    text-align: justify;
  }
</style>
