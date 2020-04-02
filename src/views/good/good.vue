<template>
  <div ref="print" class="app-container">

    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-circle-plus"
                 @click="handleAdd()">新建物品
      </el-button>
    </div>

    <el-table :data="tableData" border fit highlight-current-row class="custom_sale_table">

      <el-table-column prop="name" label="物品名称"/>

      <el-table-column prop="price" label="物品价格"/>
      <el-table-column prop="all_num" label="物品总数"/>
      <el-table-column prop="active_num" label="可借数量"/>
<!--      <el-table-column prop="user_borrowed" label="使用人"/>-->
      <el-table-column prop="user_borrowed" label="使用人">
        <template slot-scope="scope">
          <p>{{ scope.row.user_borrowed.map(v => {return v.cname}).join(',') }}</p>
        </template>
      </el-table-column>
<!--      <el-table-column :formatter="formatterStatus" prop="is_active" label="状态"/>-->

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
          <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagesize" @pagination="getList"/>

    <el-dialog :visible.sync="goodDialogVisible">
      <el-form ref="goodFormAdd" :model="goodForm" :rules="rules" label-position="left">
        <el-form-item label="物品名称：" label-width="100px" prop="name">
          <el-input v-model="goodForm.name" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="物品价格：" label-width="100px" prop="price">
          <el-input v-model="goodForm.price" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="物品数量：" label-width="100px" prop="all_num">
          <el-input v-model="goodForm.all_num" auto-complete="off"/>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="goodDialogVisible = false, getList()">取 消</el-button>
        <el-button type="primary" @click="submitForm('goodFormAdd')">确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getGoodList, createGood, getGoodDetail, updateGood, deleteGood } from '@/api/good'
import formatter from '@/utils/formatter'
import Pagination from '@/components/Pagination'
import { Users } from '@/api/user'

export default {
  name: 'Good',
  components: { Pagination },
  data() {
    return {
      isCreateForm: false,
      users: [],
      goodForm: {
        name: '',
        price: '',
        all_num: '',
        // user_borrowed: []
      },
      rules: {
        name: [
          { required: true, message: '请输入物品名称', trigger: 'blur' },
          // { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' },
          // { validator: this.validateName, trigger: 'blur' },
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
      formatterStatus: formatter.status
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // validateName(rule, value, callback) {
    //   if (this.isCreateForm) {
    //     if (!value) {
    //       return callback(new Error('物品名称不能为空'))
    //     } else {
    //       this.stocksName.forEach(item => {
    //         if (item === value) {
    //           return callback(new Error('该物品已存在，请输入其他名称'))
    //         }
    //       })
    //       callback()
    //     }
    //   } else {
    //     callback()
    //   }
    // },
    handleAdd() {
      this.goodDialogVisible = true
      this.isCreateForm = true
      this.goodForm = {
        name: '',
        price: '',
        all_num: '',
        // user_borrowed: []
      }
      this.users = []
      Users.list().then(response => {
        console.log('users', response)
        if (response) {
          this.users = response.results
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
      Users.list().then(response => {
        if (response) {
          this.users = response.results
        }
      }).catch(e => {
        console.log(e)
      })
    },
    handleDelete(id) {
      this.$confirm('是否删除此物品', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true
      }).then(() => {
        deleteGood(id).then(response => {
          console.log('delete', response)
          if (response.status === 204) {
            this.$notify.success({
              title: '成功',
              message: '删除物品成功'
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
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          this.$notify.error({
            title: '输入错误',
            message: '请按提示输入正确内容'
          })
          return
        }
        var dataform = this.$refs[formName].model
        console.log('dataform', dataform)
        if (dataform == null || dataform.id == null || dataform.id === '') {
          createGood(dataform).then(response => {
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
          updateGood(dataform.id, dataform).then(response => {
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
    },
    getList() {
      getGoodList(this.listQuery).then(response => {
        console.log('listResponse', response)
        var list = response.data.results
        this.total = response.data.count
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
