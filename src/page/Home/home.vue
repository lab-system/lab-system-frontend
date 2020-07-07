<template>
  <div class="home">
    <el-row type="flex" class="row" span="20" gutter="20">
        <el-col class="col" span="6" order="4" style="width:30%;" >
          <div class="cradcol" style="height: 100%">
<!--            <a href="/src/page/Goods/goods.vue" style="height: 100%">-->
            <el-card class="box-card" shadow="always" style="height: 75%">
              <div slot="header" class="clearfix" >
                <span style="height: 100%;font-size: 20px">新闻资讯</span>
              </div>
              <div id="textd" >
                <li v-for="item in list" :key="item.title" style="background-color: rgb(174,221,129)">
                  <span class="createTime">{{item.create_time.substring(0,10)}}</span><a class="articleTitle" style="text-decoration:underline;" src="item.title" @click="messageClick(item.id)">{{ item.title }}</a>
                </li>
              </div>
            </el-card>
<!--            </a>-->
          </div>
        </el-col>

        <el-col class="col" span="8" order="3" style="width:40%;">
          <div id="banner" style="height: 80%">
    <el-carousel style="height: 100%">
      <el-carousel-item v-for="item in imglist" :key="item" style="height: 100%">
        <img :src="item" alt style="width:100%;height:100%"/>
      </el-carousel-item>
    </el-carousel>
  </div>
        </el-col>

        <el-col class="col" span="6" order="1" style="width: 30%;">
          <div style="background: url(src/img/1.jpg);height: 35%;text-align:center;position: relative" >
            <li style="margin-top: 0%;height: 100%" v-for="item in list" v-if="item.id === 299">
              <a @click="messageClick(item.id)">
            <img src="src/img/1.jpg" style="width: 100%"/>
            <span style="position: absolute;bottom: 10%;text-align:center;display:block;
            width:100%;color: white">{{ item.title }}</span></a>
            </li>
  </div>

         <div style="background: url(src/img/6.jpg);height: 35%;text-align:center;position: relative;margin-top: 5%" >
            <li style="margin-top: 0%;height: 100%" v-for="item in list" v-if="item.id === 271">
              <a @click="messageClick(item.id)" style="text-align: center">
            <img src="src/img/6.jpg" style="width: 100%"/>
            <span style="position: absolute;bottom: 10%;text-align:center;display:block;
            width:100%;color: black">{{ item.title }}</span></a>
            </li>
  </div>
        </el-col>
</el-row>


  </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="js/vue.min.js"></script>
<script src="vue.js"></script>

<script>
  import { getArticleList } from '@/api/article'
  export default {
      data() {
          return {
              list: [],
               imglist: [
           require('../../img/1.jpg'),
          require("../../img/2.jpg"),
          require("../../img/3.jpg"),
           require("../../img/4.jpg"),
           require("../../img/5.jpg")],

      // 图片父容器高度

      bannerHeight:320,

      // 浏览器宽度

      screenWidth: 0

          };
      },
      methods: {
         getList(){
          var params = {
              category_name: ['最新消息','毕业咨询'],
              tags_name: '公告栏'
          }
          getArticleList(params).then(response => {
              console.log('listResponse======>',response)
              this.list = response.data
              console.log('list',this.list)
          }).catch((e) => {
              console.log(e)
              this.list = []
          })
      },
           setSize: function() {

      // 通过浏览器宽度(图片宽度)计算高度

      this.bannerHeight = (320 / 1920) * this.screenWidth;

    },
      messageClick(id){
            this.$router.push({
            path: '/articleContent',
                query:{
                id:id
                }
          })
      }
      },
       created() {
        this.getList()
    },
        mounted() {

    // 首次加载时,需要调用一次

    this.screenWidth = window.innerWidth;

    this.setSize();

    // 窗口大小发生改变时,调用一次

    window.onresize = () => {

      this.screenWidth = window.innerWidth;

      this.setSize();

    };
  }

  }
</script>



<style lang="scss" rel="stylesheet/scss" scoped>
  .banner {
    height:100%;
  }
  .el-carousel__item h3 {

  color: #475669;

  font-size: 14px;

  opacity: 0.75;

  line-height: 100%;

  margin: 0;

}

.el-carousel__item:nth-child(2n) {

  background-color: #99a9bf;

}

.el-carousel__item:nth-child(2n + 1) {

  background-color: #d3dce6;

}

img {

  /*设置图片宽度和浏览器宽度一致*/

  width: 100%;

  height: 100%;

}
  .home {
    display: flex;
    flex-direction: column;
    width: 1366px;
    height: 500px;
  }
    .row {
    width:100%;
    height:80%;
      margin-top: 50px;
      margin-left: 20px;
  }
  .col {
    height:100%;
    width:auto;
    border-color: #1e6abc;
    margin-left: 20px;
    position:relative;
  }

  .cardcol {
    height: 100%;
  }

  .clearfix {
    opacity: 1;

  }
  .box-card {
    height: 100%;
    margin-left: 20px;
  }

  li {
    list-style-type: none;
    margin-top: 22px;
  }

  .label {
    position: absolute;
    bottom: 10px;
    left:26px;

   height: 20%;
  }

  .el-card_header {
    background-color: rgb(174,221,129)
  }
.createTime{
  float:right;
}
.articleTitle{
  overflow:hidden;
  text-overflow:ellipsis ;
  white-space : nowrap;
  max-width: 70%;
  display: block;
}
</style>
