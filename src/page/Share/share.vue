<template>
  <div class="goods">
  <el-container >
      <el-aside width="200px" style="padding-left: 20px">
        <el-menu>
          <el-menu-item index="1">
              <li class="left-nav">
             <i class="el-icon-user"></i>
              <span @click="share1" slot="title">设施设备</span>
          </li>
          </el-menu-item>
           <el-menu-item index="2">
              <li class="left-nav">
             <i class="el-icon-user"></i>
              <span @click="share2" slot="title">开放共享</span>
          </li>
          </el-menu-item>
           <el-menu-item index="3">
              <li class="left-nav">
             <i class="el-icon-user"></i>
              <span @click="share3" slot="title">科普教育</span>
          </li>
          </el-menu-item>
        </el-menu>

      </el-aside>
   <div class="row" style="height: 500px;">
        <div class="col-md-6" style="height: 500px">
          <div class="box box-default" style="height: 500px">
            <div id="share1" class="box-header with-border" style="list-style: none;display: block">
              <h3 class="box-title" style="display:inline;margin-left: 20px;margin-top: 10px">设施设备</h3>
              <ul id="articleTitle1">
                <li v-for="item in list" :key="item.title" style="margin-top: 20px" v-if="item.category === 54">
                  <a style="text-decoration:underline;" src="item.title" @click="articleClick1(item.id)">
                    {{ item.title }}
                  </a>
                </li>
                 </ul>
                <div class="articleDiv" id= "articleContent1"  v-for="item in list" v-if="item.id === id">
                  <div class="title">{{ item.title }}</div>
              <div class="articleContent">{{ item.content }}</div>
            </div>
            </div>
            <div id="share2" class="box-header with-border" style="list-style: none;display: none">
              <h3 class="box-title" style="display:inline;margin-left: 20px;margin-top: 10px">开放共享</h3>
             <ul id="articleTitle2">
                <li v-for="item in list" :key="item.title" style="margin-top: 20px" v-if="item.category === 55">
                  <a style="text-decoration:underline;" src="item.title" @click="articleClick2(item.id)">
                    {{ item.title }}
                  </a>
                </li>
                 </ul>
                <div class="articleDiv" id= "articleContent2"  v-for="item in list" v-if="item.id === id">
                   <div class="title">{{ item.title }}</div>
              <div class="articleContent">{{ item.content }}</div>
            </div>
            </div>
            <div id="share3" class="box-header with-border" style="list-style: none;display: none">
              <h3 class="box-title" style="display:inline;margin-left: 20px;margin-top: 10px">科普教育</h3>
             <ul id="articleTitle3">
                <li v-for="item in list" :key="item.title" style="margin-top: 20px" v-if="item.category === 56">
                  <a style="text-decoration:underline;" src="item.title" @click="articleClick3(item.id)">
                    {{ item.title }}
                  </a>
                </li>
                 </ul>
                <div class="articleDiv" id= "articleContent3"  v-for="item in list" v-if="item.id === id">
                   <div class="title">{{ item.title }}</div>
              <div class="articleContent" >{{ item.content }}</div>
            </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">

            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>

    <div v-for="(item,i) in home" :key="i">

      <div class="activity-panel" v-if="item.type === 1">
        <ul class="box">
          <li class="content" v-for="(iitem,j) in item.panelContents" :key="j" @click="linkTo(iitem)">

            <a class="cover-link"></a>
          </li>
        </ul>
      </div>

      <section class="w mt30 clearfix" v-if="item.type === 2">
        <y-shelf :title="item.name">
          <div slot="content" class="hot">
            <mall-goods :msg="iitem" v-for="(iitem,j) in item.panelContents" :key="j"></mall-goods>
          </div>
        </y-shelf>
      </section>

      <section class="w mt30 clearfix" v-if="item.type === 3">
        <y-shelf :title="item.name">
          <div slot="content" class="floors" >
            <div class="imgbanner" v-for="(iitem,j) in item.panelContents" :key="j" v-if="iitem.type === 2 || iitem.type === 3" @click="linkTo(iitem)">
              <img v-lazy="iitem.picUrl">
              <a class="cover-link"></a>
            </div>
            <mall-goods :msg="iitem" v-for="(iitem,j) in item.panelContents" :key="j+'key'" v-if="iitem.type != 2 && iitem.type != 3"></mall-goods>
          </div>
        </y-shelf>
      </section>

      </div>
  </div>
    </el-container>
  </div>
</template>
<script>
  import { getAllGoods } from '@/api/goods'
  import { recommend } from '@/api/index'
  import mallGoods from '@/components/mallGoods'
  import YButton from '@/components/YButton'
  import YShelf from '@/components/shelf'
  import { getArticleList } from '@/api/article'
  export default {
    data () {
      return {
        list:[],
        id:'',
        goods: [],
        noResult: false,
        error: false,
        min: '',
        max: '',
        loading: true,
        timer: null,
        sortType: 1,
        windowHeight: null,
        windowWidth: null,
        recommendPanel: [],
        sort: '',
        currentPage: 1,
        total: 0,
        pageSize: 20
      }
    },
    methods: {
      handleSizeChange (val) {
        this.pageSize = val
        this._getAllGoods()
        this.loading = true
      },
        getList(){
          var params = {
              category_name: ['设施设备','开放共享','科普教育'],
              tags_name: '资源共享'
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
      share1() {
        document.getElementById('share1').style.display = 'block'
        document.getElementById('share2').style.display = 'none'
        document.getElementById('share3').style.display = 'none'
           document.getElementById('articleContent1').style.display = 'none'
        document.getElementById('articleTitle1').style.display = 'block'
      },
      share2() {
        document.getElementById('share2').style.display = 'block'
        document.getElementById('share1').style.display = 'none'
        document.getElementById('share3').style.display = 'none'
           document.getElementById('articleContent2').style.display = 'none'
        document.getElementById('articleTitle2').style.display = 'block'
      },
      share3() {
        document.getElementById('share3').style.display = 'block'
        document.getElementById('share2').style.display = 'none'
        document.getElementById('share1').style.display = 'none'
           document.getElementById('articleContent3').style.display = 'none'
        document.getElementById('articleTitle3').style.display = 'block'
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this._getAllGoods()
        this.loading = true
      },
      _getAllGoods () {
        let cid = this.$route.query.cid
        if (this.min !== '') {
          this.min = Math.floor(this.min)
        }
        if (this.max !== '') {
          this.max = Math.floor(this.max)
        }
        let params = {
          params: {
            page: this.currentPage,
            size: this.pageSize,
            sort: this.sort,
            priceGt: this.min,
            priceLte: this.max,
            cid: cid
          }
        }
        getAllGoods(params).then(res => {
          if (res.success === true) {
            this.total = res.result.total
            this.goods = res.result.data
            this.noResult = false
            if (this.total === 0) {
              this.noResult = true
            }
            this.error = false
          } else {
            this.error = true
          }
          this.loading = false
        })
      },
      // 默认排序
      reset () {
        this.sortType = 1
        this.sort = ''
        this.currentPage = 1
        this.loading = true
        this._getAllGoods()
      },
      // 价格排序
      sortByPrice (v) {
        v === 1 ? this.sortType = 2 : this.sortType = 3
        this.sort = v
        this.currentPage = 1
        this.loading = true
        this._getAllGoods()
      }
    },
    watch: {
      $route (to, from) {
        if (to.fullPath.indexOf('/goods?cid=') >= 0) {
          this.cId = to.query.cid
          this._getAllGoods()
        }
      }
    },
    created () {
        this.getList();
    },
    mounted () {
      this.windowHeight = window.innerHeight
      this.windowWidth = window.innerWidth
      this._getAllGoods()
      recommend().then(res => {
        let data = res.result
        this.recommendPanel = data[0]
      })
    },
    components: {
      mallGoods,
      YButton,
      YShelf
    }
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
.articleDiv{
  text-align: center;
}
</style>
