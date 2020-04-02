<template>
  <div ref="print" class="app-container">

    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-circle-plus"
                 @click="handleAdd()">申请使用物品
      </el-button>
    </div>

    <el-table :data="tableData" border fit highlight-current-row class="custom_sale_table">

      <el-table-column prop="good_name" label="物品名称"/>

      <el-table-column prop="user_name" label="使用者"/>
      <el-table-column prop="num" label="数量"/>
      <el-table-column prop="start_t" label="开始时间"/>
      <el-table-column prop="end_t" label="结束时间"/>
      <el-table-column :formatter="formatterStatus" prop="status" label="状态"/>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleDelete(scope.row.id)">归还</el-button>
          <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-popover
            v-if="scope.row.status == 2"
            placement="top-start"
            title="驳回原因"
            width="200"
            trigger="click"
            :content="reject_reason">
            <el-button slot="reference" type="text" size="small" @click="handleReject(scope.row.id)">驳回原因</el-button>
          </el-popover>
<!--          <el-button v-if="scope.row.status == 2" type="text" size="small" @click="handleReject(scope.row.id)">驳回原因</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagesize" @pagination="getList"/>

    <el-dialog :visible.sync="goodDialogVisible">
      <el-form ref="goodFormAdd" :model="goodForm" :rules="rules" label-position="left">
        <el-form-item label="物品名称：" label-width="100px" prop="good_id">
          <el-select v-model="goodForm.good_id" placeholder="请选择">
            <el-option
              v-for="item in goods"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用者：" label-width="100px" prop="user_id">
          <el-select v-model="goodForm.user_id" placeholder="请选择">
            <el-option
              v-for="item in users"
              :label="item.cname"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量：" label-width="100px" prop="num">
          <el-input v-model="goodForm.num" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="开始时间：" label-width="100px" prop="start_t">
          <el-date-picker v-model="goodForm.start_t" type="date" placeholder="选择日期" style="width: 100%;"/>
        </el-form-item>
        <el-form-item label="结束时间：" label-width="100px" prop="end_t">
          <el-date-picker v-model="goodForm.end_t" type="date" placeholder="选择日期" style="width: 100%;"/>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="goodDialogVisible = false, getList()">取 消</el-button>
        <el-button type="primary" @click="submitForm('goodFormAdd')">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="rejectDialogVisible" width="30%" center>
      <span>{{ reject_reason }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="rejectDialogVisible = false">确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getGoodList, getGoodBorrowList, createGoodBorrow, getGoodBorrowDetail, updateGoodBorrow, deleteGoodBorrow } from '@/api/good'
import formatter from '@/utils/formatter'
import Pagination from '@/components/Pagination'
import { Users } from '@/api/user'

export default {
  name: 'GoodBorrow',
  components: { Pagination },
  data() {
    return {
      reject_reason: '',
      rejectDialogVisible: false,
      isCreateForm: false,
      users: [],
      goods: [],
      goodForm: {
        good_name: '',
        good_id: '',
        user_id: '',
        num: 0,
        start_t: '',
        end_t: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入物品名称', trigger: 'blur' }
        ]
      },
      goodDialogVisible: false,
      tableData: [],
      total: 0,
      listQuery: {
        page: 1,
        pagesize: 20
      },
      readonly: true,
      formatterStatus: formatter.goodStatus
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleReject(id) {
      // this.rejectDialogVisible = true
      getGoodBorrowDetail(id).then(response => {
        if (response) {
          this.reject_reason = response.data.reject_reason
        }
      }).catch(e => {
        console.log(e)
      })
    },
    handleAdd() {
      this.goodDialogVisible = true
      this.isCreateForm = true
      this.goodForm = {
        good_name: '',
        good_id: '',
        good: '',
        user_id: '',
        user: '',
        num: 0,
        start_t: '',
        end_t: ''
      },
      this.users = []
      this.goods = []
      Users.list().then(response => {
        console.log('users', response)
        if (response) {
          this.users = response.results
        }
      }).catch(e => {
        console.log(e)
      })
      getGoodList().then(response => {
        console.log('response', response)
        if (response) {
          this.goods = response.data.results
        }
      }).catch(e => {
        console.log(e)
      })
    },
    handleEdit(index, row) {
      console.log('row', row)
      this.goodDialogVisible = true
      this.isCreateForm = false
      this.goodForm = row
      this.users = []
      this.goods = []
      Users.list().then(response => {
        if (response) {
          this.users = response.results
        }
      }).catch(e => {
        console.log(e)
      })
      getGoodList().then(response => {
        console.log('response', response)
        if (response) {
          this.goods = response.data.results
        }
      }).catch(e => {
        console.log(e)
      })
    },
    handleDelete(id) {
      this.$confirm('是否归还此物品', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true
      }).then(() => {
        deleteGoodBorrow(id).then(response => {
          console.log('delete', response)
          if (response.status === 204) {
            this.$notify.success({
              title: '成功',
              message: '归还物品成功'
            })
            this.getList()
          } else {
            this.$notify.error({
              title: '失败',
              message: response.data
            })
          }
        }).catch(response => {
          this.$notify.error({
            title: '失败',
            message: '操作失败'
          })
        })
      })
    },
    submitForm(formName) {

      this.goodForm.good = this.goodForm.good_id
      this.goodForm.user = this.goodForm.user_id

      var isExcuteFlag = true
      if (this.goodForm.start_t == 'NaN-NaN-NaN' || this.goodForm.end_t == 'NaN-NaN-NaN'
        || this.goodForm.start_t == '' || this.goodForm.end_t == '') {
        this.$alert('请选择开始时间、结束时间！', '提示', {
          confirmButtonText: '确定'
        })
        this.goodForm.start_t = ''
        this.goodForm.end_t = ''

        isExcuteFlag = false
      } else {
        var year = new Date(this.goodForm.start_t).getFullYear()// 获取完整的年份(4位,1970-????)
        var month = new Date(this.goodForm.start_t).getMonth() + 1// 获取当前月份(0-11,0代表1月)
        var day = new Date(this.goodForm.start_t).getDate()// 获取当前日(1-31)
        if (month < 10) {
          month = '0' + month
        }
        if (day < 10) {
          day = '0' + day
        }
        this.goodForm.start_t = year + '-' + month + '-' + day

        var year = new Date(this.goodForm.end_t).getFullYear()// 获取完整的年份(4位,1970-????)
        var month = new Date(this.goodForm.end_t).getMonth() + 1// 获取当前月份(0-11,0代表1月)
        var day = new Date(this.goodForm.end_t).getDate()// 获取当前日(1-31)
        if (month < 10) {
          month = '0' + month
        }
        if (day < 10) {
          day = '0' + day
        }
        this.goodForm.end_t = year + '-' + month + '-' + day
      }
      console.log('formAdd', this.goodForm)
      if (isExcuteFlag) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            this.$notify.error({
              title: '输入错误',
              message: '请按提示输入正确内容'
            })
            return
          }
          var dataform = this.$refs[formName].model
          if (dataform == null || dataform.id == null || dataform.id === '') {
            createGoodBorrow(dataform).then(response => {
              console.log('form：', response)
              if (response.status == 201) {
                this.goodDialogVisible = false
                this.$notify.success({
                  title: '成功',
                  message: '创建成功'
                })
                this.$refs[formName].resetFields()
                this.getList()
              } else {
                this.$notify.error({
                  title: '失败',
                  message: response
                })
              }
            }).catch(response => {
              this.$notify.error({
                title: '失败',
                message: '操作失败'
              })
            })
          } else {
            console.log('update', dataform)
            updateGoodBorrow(dataform.id, dataform).then(response => {
              console.log('formUpdate：', response)
              if (response.status === 200) {
                this.goodDialogVisible = false
                this.$notify.success({
                  title: '成功',
                  message: '修改物品成功'
                })
                this.getList()
              } else {
                this.$notify.error({
                  title: '失败',
                  message: response
                })
              }
            }).catch(response => {
              this.$notify.error({
                title: '失败',
                message: '操作失败'
              })
            })
          }
        })
      }
    },
    getList() {
      getGoodBorrowList(this.listQuery).then(response => {
        console.log('listResponse', response)
        var list = response.data.results
        this.total = response.data.count
        // list.map(p => {
        //   Users.get(p.leader).then(response => {
        //     p.leader = response.cname
        //   }).catch(e => {
        //     console.log(e)
        //   })
        // })
        this.tableData = list
      }).catch((e) => {
        console.log(e)
        this.tableData = []
        this.total = 0
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg: #2d3a4b;
  $light_gray: #eee;
  .custom_sale_tabs {
    margin-top: 40px;
  }

  .custom_sale_table {
    margin-top: 20px;
  }

  .custom_sale_search {
    margin-left: 30px;
  }

  .fr {
    float: right;
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  .goodInfoHeader {
    color: gray;
    font-size: large;
    margin-left: 2%;
    margin-bottom: 1.5%;
    margin-top: 3%;
  }
  .goodInfoBody {
    border:2px solid gainsboro;
    border-radius: 12px;
    width: 97%;
    margin-left: 2%;
    .el-col {
      margin-top: 3%;
    }
  }
</style>
