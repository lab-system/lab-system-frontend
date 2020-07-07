<template>

  <div class="goods">
    <el-container>
      <el-aside width="200px" style="padding-left: 20px">
        <el-menu>
          <el-menu-item index="1">
            <li class="left-nav">
              <i class="el-icon-user"></i>
              <span @click="intro1" slot="title">实验室简介</span>
            </li>
          </el-menu-item>
          <el-menu-item index="2">
            <li class="left-nav">
              <i class="el-icon-user"></i>
              <span @click="intro2" slot="title">研究方向</span>
            </li>
          </el-menu-item>
          <el-menu-item index="3">
            <li class="left-nav">
              <i class="el-icon-user"></i>
              <span @click="intro3" slot="title">现任领导</span>
            </li>
          </el-menu-item>
          <el-menu-item index="4">
            <li class="left-nav">
              <i class="el-icon-user"></i>
              <span @click="intro4" slot="title">历任领导</span>
            </li>
          </el-menu-item>
          <el-menu-item index="5">
            <li class="left-nav">
              <i class="el-icon-user"></i>
              <span @click="intro5" slot="title">学术委员会</span>
            </li>
          </el-menu-item>
        </el-menu>

      </el-aside>
      <div class="row" style="height: 500px;width:100%">
        <div class="col-md-6" style="height: 500px">
          <div class="box box-default" style="height: 500px;width: 100%">
            <div id="intro1" style="list-style: none;display:block">
              <h3 class="box-title" style="display:inline;margin-left: 20px;margin-top: 10px">实验室简介</h3>
              <div class="content-wrapper" style="margin-left: 20px;margin-top: 10px">
    <section class="content">
      <div class="box">
        <div class="box-header">
          <form  method="post">
              <div class="col-md-6">
                          <div class="form-group">
                            <textarea class="form-control" style="width: 70%"  rows="13" cols="20"  name="noticeContent"
                                      v-for="item in list" :key="item.content" v-if="item.category === 41">{{ item.content }}
                            </textarea>
                          </div>
                        <div class="form-group"><br></div>
              </div>
          </form>
        </div>
      </div>
    </section>
    <!-- /.content -->
  </div>
            </div>
            <div id="intro2" class="box-header with-border" style="list-style: none;display: none">
              <h3 class="box-title" style="display:inline;margin-left: 20px;margin-top: 10px">研究方向</h3>
              <div class="content-wrapper" style="margin-left: 20px;margin-top: 10px">
    <section class="content">
      <div class="box">
        <div class="box-header">
          <form  method="post">
              <div class="col-md-6">
                          <div class="form-group">
                            <textarea class="form-control" style="width: 70%"  rows="13" cols="20"  name="noticeContent"
                                      v-for="item in list" :key="item.content" v-if="item.category === 42">{{ item.content }}
                            </textarea>
                          </div>
                        <div class="form-group"><br></div>
              </div>
          </form>
        </div>
      </div>
    </section>
    <!-- /.content -->
  </div>
            </div>
            <div id="intro3" class="box-header with-border" style="list-style: none;display: none">
              <h3 class="box-title" style="display:inline;margin-left: 20px;margin-top: 10px">现任领导</h3>
              <div class="content-wrapper" style="margin-left: 20px;margin-top: 10px">
    <section class="content">
      <div class="box">
        <div class="box-header">
          <form  method="post">
              <div class="col-md-6">
                          <div class="form-group">
                            <textarea class="form-control" style="width: 70%"  rows="13" cols="20"  name="noticeContent"
                                      v-for="item in list1" :key="item.introduction" v-if="item.category === 16">{{ item.introduction }}
                            </textarea>
                          </div>
                        <div class="form-group"><br></div>
              </div>
          </form>
        </div>
      </div>
    </section>
    <!-- /.content -->
  </div>
            </div>
            <div id="intro4" class="box-header with-border" style="list-style: none;display: none">
              <h3 class="box-title" style="display:inline;margin-left: 20px;margin-top: 10px">历任领导</h3>
              <div class="content-wrapper" style="margin-left: 20px;margin-top: 10px">
    <section class="content">
      <div class="box">
        <div class="box-header">
          <form  method="post">
              <div class="col-md-6">
                          <div class="form-group">
                             <textarea class="form-control" style="width: 70%"  rows="13" cols="20"  name="noticeContent"
                                      v-for="item in list1" :key="item.introduction" v-if="item.category === 17">{{ item.introduction }}
                            </textarea>
                          </div>
                        <div class="form-group"><br></div>
              </div>
          </form>
        </div>
      </div>
    </section>
    <!-- /.content -->
  </div>
            </div>
            <div id="intro5" class="box-header with-border" style="list-style: none;display: none">
              <h3 class="box-title" style="display:inline;margin-left: 20px;margin-top: 10px">学术委员会</h3>
              <div class="content-wrapper" style="margin-left: 20px;margin-top: 10px">
    <section class="content">
      <div class="box">
        <div class="box-header">
          <form  method="post">
              <div class="col-md-6">
                          <div class="form-group">
                            <textarea class="form-control" style="width: 70%"  rows="13" cols="20"  name="noticeContent"
                                      v-for="item in list1" :key="item.introduction" v-if="item.category === 18">{{ item.introduction }}
                            </textarea>
                          </div>
                        <div class="form-group"><br></div>
              </div>
          </form>
        </div>
      </div>
    </section>
    <!-- /.content -->
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
import { getAllGoods } from '@/api/goods'
import { recommend } from '@/api/index'
import mallGoods from '@/components/mallGoods'
import YButton from '@/components/YButton'
import YShelf from '@/components/shelf'
import { getArticleList } from '@/api/article'
import {getMemberList} from '@/api/article'

export default {
     data() {
             return {
                list: [],
                list1: [],
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
            handleSizeChange(val) {
                this.pageSize = val
                this._getAllGoods()
                this.loading = true
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this._getAllGoods()
                this.loading = true
            },
             getList(){
          var params = {
              category_name: ['实验室简介','研究方向','现任领导','历任领导','学术委员会'],
              tags_name: '实验室概况',
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
          getList1(){
          var params = {
              category_name: ['现任领导','历任领导','学术委员会']
          }
          getMemberList(params).then(response => {
              console.log('listResponse1======>',response)
              this.list1 = response.data
              console.log('list1',this.list1)
          }).catch((e) => {
              console.log(e)
              this.list1 = []
          })
      },
            intro1() {
      document.getElementById('intro1').style.display = 'block'
      document.getElementById('intro2').style.display = 'none'
      document.getElementById('intro3').style.display = 'none'
      document.getElementById('intro4').style.display = 'none'
      document.getElementById('intro5').style.display = 'none'
            },
            intro2() {
      document.getElementById('intro2').style.display = 'block'
      document.getElementById('intro1').style.display = 'none'
      document.getElementById('intro3').style.display = 'none'
      document.getElementById('intro4').style.display = 'none'
      document.getElementById('intro5').style.display = 'none'
            },
            intro3() {
      document.getElementById('intro3').style.display = 'block'
      document.getElementById('intro2').style.display = 'none'
      document.getElementById('intro1').style.display = 'none'
      document.getElementById('intro4').style.display = 'none'
      document.getElementById('intro5').style.display = 'none'
            },
            intro4() {
      document.getElementById('intro4').style.display = 'block'
      document.getElementById('intro2').style.display = 'none'
      document.getElementById('intro3').style.display = 'none'
      document.getElementById('intro1').style.display = 'none'
      document.getElementById('intro5').style.display = 'none'
            },
            intro5() {
      document.getElementById('intro5').style.display = 'block'
      document.getElementById('intro2').style.display = 'none'
      document.getElementById('intro3').style.display = 'none'
      document.getElementById('intro4').style.display = 'none'
      document.getElementById('intro1').style.display = 'none'
            },
            _getAllGoods() {
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
            reset() {
                this.sortType = 1
                this.sort = ''
                this.currentPage = 1
                this.loading = true
                this._getAllGoods()
            },
            // 价格排序
            sortByPrice(v) {
                v === 1 ? this.sortType = 2 : this.sortType = 3
                this.sort = v
                this.currentPage = 1
                this.loading = true
                this._getAllGoods()
            }
        },
        watch: {
            $route(to, from) {
                if (to.fullPath.indexOf('/goods?cid=') >= 0) {
                    this.cId = to.query.cid
                    this._getAllGoods()
                }
            }
        },
        created() {
         this.getList(),
         this.getList1()
        },
        mounted() {
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

    .no-data {
      align-self: center;
    }
  }

  .img-item {
    display: flex;
    flex-direction: column;
  }

  .el-pagination {
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

  .intro1 {
    display: none;
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

  .left-nav {
    height: 25px;
  }

  .form-control{
     text-indent: 2em;
    font-size: 20px;
    letter-spacing: 3px;
    line-height: 25px;
    text-align: justify;
  }
</style>
