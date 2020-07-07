<template>
  <div class="goods">
  <el-container >
      <el-aside width="200px" style="padding-left: 20px">
        <el-menu>
          <el-menu-item index="1">
              <li class="left-nav">
             <i class="el-icon-user"></i>
              <span @click="culture1" slot="title">科研掠影</span>
          </li>
          </el-menu-item>
           <el-menu-item index="2">
              <li class="left-nav">
             <i class="el-icon-user"></i>
              <span @click="culture2" slot="title">研究趣闻</span>
          </li>
          </el-menu-item>
           <el-menu-item index="3">
              <li class="left-nav">
             <i class="el-icon-user"></i>
              <span @click="culture3" slot="title">文艺作品</span>
          </li>
          </el-menu-item>
           <el-menu-item index="3">
              <li class="left-nav">
             <i class="el-icon-user"></i>
              <span @click="culture4" slot="title">文体活动</span>
          </li>
          </el-menu-item>
        </el-menu>

      </el-aside>
   <div class="row" style="height: 500px;">
        <div class="col-md-6" style="height: 500px">
          <div class="box box-default" style="height: 500px">
            <div id="culture1" class="box-header with-border" style="list-style: none;display: block" >
              <h3 class="box-title" style="display:inline;margin-left: 20px;margin-top: 10px">科研掠影</h3>
              <ul id="articleTitle1">
                <li v-for="item in list" :key="item.title" style="margin-top: 20px" v-if="item.category_name === '科研掠影'">
                  <a style="text-decoration:underline;" src="item.title" @click="articleClick1(item.id)">
                    {{ item.title }}
                  </a>
                </li>
                 </ul>
                <div id= "articleContent1"  v-for="item in list" v-if="item.id === id">
                    <div class="title">{{ item.title }}</div>
              <div class="articleContent" >{{ item.content }}</div>
            </div>
            </div>
            <div id="culture2" class="box-header with-border" style="list-style: none;display: none">
              <h3 class="box-title" style="display:inline;margin-left: 20px;margin-top: 10px">研究趣图</h3>
             <ul id="articleTitle2">
                <li v-for="item in list" :key="item.title" style="margin-top: 20px" v-if="item.category_name === '研究趣图'">
                  <a style="text-decoration:underline;" src="item.title" @click="articleClick2(item.id)">
                    {{ item.title }}
                  </a>
                </li>
                 </ul>
                <div id= "articleContent2"  v-for="item in list" v-if="item.id === id">
                    <div class="title">{{ item.title }}</div>
              <div class="articleContent" >{{ item.content }}</div>
            </div>
            </div>
            <div id="culture3" class="box-header with-border" style="list-style: none;display: none">
              <h3 class="box-title" style="display:inline;margin-left: 20px;margin-top: 10px">文艺作品</h3>
              <ul id="articleTitle3">
                <li v-for="item in list" :key="item.title" style="margin-top: 20px" v-if="item.category_name === '文艺作品'">
                  <a style="text-decoration:underline;" src="item.title" @click="articleClick3(item.id)">
                    {{ item.title }}
                  </a>
                </li>
                 </ul>
                <div id= "articleContent3"  v-for="item in list" v-if="item.id === id">
                    <div class="title">{{ item.title }}</div>
              <div class="articleContent" >{{ item.content }}</div>
            </div>
            </div>
            <div id="culture4" class="box-header with-border" style="list-style: none;display: none">
              <h3 class="box-title" style="display:inline;margin-left: 20px;margin-top: 10px">文体活动</h3>
             <ul id="articleTitle4">
                <li v-for="item in list" :key="item.title" style="margin-top: 20px" v-if="item.category_name === '文体活动'">
                  <a style="text-decoration:underline;" src="item.title" @click="articleClick4(item.id)">
                    {{ item.title }}
                  </a>
                </li>
                 </ul>
                <div class="articleContent"  id= "articleContent4"  v-for="item in list" v-if="item.id === id">
              <div>{{ item.content }}</div>
            </div>
            </div>
            <!-- /.box-header -->

            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
  </div>
    </el-container>
  </div>
</template>
<script>
  import { getArticleList } from '@/api/article'

  export default {
    data () {
      return {
        list: [],
        content: '',
        id: ''
      }
    },
    methods: {
      articleClick1(id) {
         this.id = id
          console.log('id',id)
         document.getElementById('articleTitle1').style.display = 'none'
         document.getElementById('articleContent1').style.display = 'block'
      },
         articleClick2(id) {
         this.id = id
          console.log('id',id)
         document.getElementById('articleTitle2').style.display = 'none'
         document.getElementById('articleContent2').style.display = 'block'
      },
         articleClick3(id) {
         this.id = id
          console.log('id',id)
         document.getElementById('articleTitle3').style.display = 'none'
         document.getElementById('articleContent3').style.display = 'block'
      },
         articleClick4(id) {
         this.id = id
          console.log('id',id)
         document.getElementById('articleTitle4').style.display = 'none'
         document.getElementById('articleContent4').style.display = 'block'
      },

      culture1() {
        document.getElementById('culture1').style.display = 'block'
        document.getElementById('culture2').style.display = 'none'
        document.getElementById('culture3').style.display = 'none'
        document.getElementById('culture4').style.display = 'none'
        document.getElementById('articleContent1').style.display = 'none'
        document.getElementById('articleTitle1').style.display = 'block'
      },
      culture2() {
        document.getElementById('culture2').style.display = 'block'
        document.getElementById('culture1').style.display = 'none'
        document.getElementById('culture3').style.display = 'none'
        document.getElementById('culture4').style.display = 'none'
           document.getElementById('articleContent2').style.display = 'none'
        document.getElementById('articleTitle2').style.display = 'block'
      },
      culture3() {
        document.getElementById('culture3').style.display = 'block'
        document.getElementById('culture2').style.display = 'none'
        document.getElementById('culture1').style.display = 'none'
        document.getElementById('culture4').style.display = 'none'
           document.getElementById('articleContent3').style.display = 'none'
        document.getElementById('articleTitle3').style.display = 'block'
      },
      culture4() {
        document.getElementById('culture4').style.display = 'block'
        document.getElementById('culture2').style.display = 'none'
        document.getElementById('culture3').style.display = 'none'
        document.getElementById('culture1').style.display = 'none'
           document.getElementById('articleContent4').style.display = 'none'
        document.getElementById('articleTitle4').style.display = 'block'
      },

      getList(){
          var params = {
              category_name: ['科研掠影','研究趣闻','文艺作品','文体活动'],
              tags_name: '实验室文化'
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
    },
    created() {
        this.getList()
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/style/mixin";
  @import "../../assets/style/theme";

  .nav {
    height: 60px;
    line-height: 60px;
    > div {
      display: flex;
      align-items: center;
      a {
        padding: 0 15px;
        height: 100%;
        @extend %block-center;
        font-size: 12px;
        color: #999;
        &.active {
          color: #5683EA;
        }
        &:hover {
          color: #5683EA;
        }
      }
      input {
        @include wh(80px, 30px);
        border: 1px solid #ccc;
      }
      input + input {
        margin-left: 10px;
      }
    }
    .price-interval {
      padding: 0 15px;
      @extend %block-center;
      input[type=number] {
        border: 1px solid #ccc;
        text-align: center;
        background: none;
        border-radius: 5px;
      }
    }
  }

  .goods-box {
    > div {
      float: left;
      border: 1px solid #efefef;
    }
  }

  .no-info {
    padding: 100px 0;
    text-align: center;
    font-size: 30px;
    display: flex;
    flex-direction: column;
    .no-data{
      align-self: center;
    }
  }

  .img-item{
    display: flex;
    flex-direction: column;
  }

  .el-pagination{
    align-self: flex-end;
    margin: 3vw 10vw 2vw;
  }

  .section {
    padding-top: 8vw;
    margin-bottom: -5vw;
    width: 1218px;
    align-self: center;
  }

  .recommend {
    display: flex;
    > div {
      flex: 1;
      width: 25%;
    }
  }
.el-aside {
  background-color: #f5f5f5;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 100px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
}
 .left-nav{
   height: 25px;
 }
.articleContent{
  margin-top: 2%;
    text-indent: 2em;
    font-size: 20px;
    letter-spacing: 3px;
    line-height: 25px;
    text-align: justify;
}
  .title{
   text-align: center;
    font-size: 26px;
}
</style>
