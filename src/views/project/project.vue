<template>
  <div ref="print" class="app-container">

    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-circle-plus"
                 @click="handleAdd()">新建项目
      </el-button>
    </div>

    <el-table :data="tableData" border fit highlight-current-row class="custom_sale_table">

      <el-table-column prop="name" label="项目名称"/>

      <el-table-column prop="plan" label="项目进度"/>
      <el-table-column prop="start_t" label="开始时间"/>
      <el-table-column prop="end_t" label="结束时间"/>
      <el-table-column prop="leader" label="项目负责人"/>
<!--      <el-table-column label="项目负责人">{{ leaderName }}</el-table-column>-->
      <el-table-column :formatter="formatterStatus" prop="is_active" label="状态"/>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
          <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagesize" @pagination="getList"/>

    <el-dialog :visible.sync="projectDialogVisible">
      <el-form ref="projectFormAdd" :model="projectForm" :rules="rules" label-position="left">
        <el-form-item label="项目名称：" label-width="100px" prop="name">
          <el-input v-model="projectForm.name" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="项目简介：" label-width="100px" prop="introduction">
          <el-input v-model="projectForm.introduction" type="textarea" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="人员已满：" label-width="100px">
          <el-radio v-model="projectForm.is_full" :label="true">是</el-radio>
          <el-radio v-model="projectForm.is_full" :label="false">否</el-radio>
        </el-form-item>
        <el-form-item label="已完成：" label-width="100px">
          <el-radio v-model="projectForm.is_finish" :label="true">是</el-radio>
          <el-radio v-model="projectForm.is_finish" :label="false">否</el-radio>
        </el-form-item>
        <el-form-item label="项目进度：" label-width="100px" prop="plan">
          <el-input v-model="projectForm.plan" type="" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="开始时间：" label-width="100px" prop="start_t">
          <el-date-picker v-model="projectForm.start_t" type="date" placeholder="选择日期" style="width: 100%;"/>
        </el-form-item>
        <el-form-item label="结束时间：" label-width="100px" prop="end_t">
          <el-date-picker v-model="projectForm.end_t" type="date" placeholder="选择日期" style="width: 100%;"/>
        </el-form-item>
        <el-form-item label="是否激活：" label-width="100px">
          <el-radio v-model="projectForm.is_active" :label="true">激活</el-radio>
          <el-radio v-model="projectForm.is_active" :label="false">取消</el-radio>
        </el-form-item>
        <el-form-item label="负责人：" label-width="100px" prop="leader">
          <el-select v-model="projectForm.leader" placeholder="请选择">
            <el-option
              v-for="item in users"
              :label="item.cname"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="projectDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('projectFormAdd')">确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getProjectList, createProject, getProjectDetail, updateProject, deleteProject } from '@/api/project'
import formatter from '@/utils/formatter'
import Pagination from '@/components/Pagination'
import { Users } from '@/api/user'

export default {
  name: 'Project',
  components: { Pagination },
  data() {
    return {
      isCreateForm: false,
      stocksName: [],
      users: [],
      projectForm: {
        name: '',
        introduction: '',
        is_full: false,
        is_finish: false,
        plan: 0,
        start_t: '',
        end_t: '',
        is_active: true,
        leader: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' },
          { validator: this.validateName, trigger: 'blur' },
        ],
        is_full: [
          {required: true, message: '请选择人员状态', trigger: 'blur'}
        ],
        is_finish: [
          {required: true, message: '请选择完成状态', trigger: 'blur'}
        ],
        is_active: [
          {required: true, message: '请选择项目是否激活', trigger: 'blur'}
        ],
        leader: [
          {required: true, message: '请输入负责人名称', trigger: 'blur'}
        ]
      },
      projectDialogVisible: false,
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
    validateName(rule, value, callback) {
      if (this.isCreateForm) {
        if (!value) {
          return callback(new Error('项目名称不能为空'))
        } else {
          this.stocksName.forEach(item => {
            if (item === value) {
              return callback(new Error('该项目已存在，请输入其他名称'))
            }
          })
          callback()
        }
      } else {
        callback()
      }
    },
    handleAdd() {
      this.projectDialogVisible = true
      this.isCreateForm = true
      this.projectForm = {
        name: '',
        introduction: '',
        is_full: false,
        is_finish: false,
        plan: 0,
        start_t: '',
        end_t: '',
        is_active: false,
        leader: ''
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
      this.projectDialogVisible = true
      this.isCreateForm = false
      this.projectForm = row
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
      this.$confirm('是否删除此项目', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true
      }).then(() => {
        deleteProject(id).then(response => {
          console.log('delete', response)
          if (response.status === 204) {
            this.$notify.success({
              title: '成功',
              message: '删除项目成功'
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
      var isExcuteFlag = true
      if (this.projectForm.start_t == 'NaN-NaN-NaN' || this.projectForm.end_t == 'NaN-NaN-NaN'
        || this.projectForm.start_t == '' || this.projectForm.end_t == '') {
        this.$alert('请选择开始时间、结束时间！', '提示', {
          confirmButtonText: '确定'
        })
        this.projectForm.start_t = ''
        this.projectForm.end_t = ''

        isExcuteFlag = false
      } else {
        var year = new Date(this.projectForm.start_t).getFullYear()// 获取完整的年份(4位,1970-????)
        var month = new Date(this.projectForm.start_t).getMonth() + 1// 获取当前月份(0-11,0代表1月)
        var day = new Date(this.projectForm.start_t).getDate()// 获取当前日(1-31)
        if (month < 10) {
          month = '0' + month
        }
        if (day < 10) {
          day = '0' + day
        }
        this.projectForm.start_t = year + '-' + month + '-' + day

        var year = new Date(this.projectForm.end_t).getFullYear()// 获取完整的年份(4位,1970-????)
        var month = new Date(this.projectForm.end_t).getMonth() + 1// 获取当前月份(0-11,0代表1月)
        var day = new Date(this.projectForm.end_t).getDate()// 获取当前日(1-31)
        if (month < 10) {
          month = '0' + month
        }
        if (day < 10) {
          day = '0' + day
        }
        this.projectForm.end_t = year + '-' + month + '-' + day
      }
      console.log('formAdd', this.projectForm)
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
            createProject(dataform).then(response => {
              console.log('form：', response)
              if (response.status == 201) {
                this.projectDialogVisible = false
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
            updateProject(dataform.id, dataform).then(response => {
              console.log('formUpdate：', response)
              if (response.status === 200) {
                this.projectDialogVisible = false
                this.$notify.success({
                  title: '成功',
                  message: '修改项目成功'
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
      getProjectList(this.listQuery).then(response => {
        console.log('listResponse', response)
        var list = response.data.results
        this.total = response.data.count
        list.map(p => {
          Users.get(p.leader).then(response => {
            p.leader = response.cname
          }).catch(e => {
            console.log(e)
          })
        })
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
  .projectInfoHeader {
    color: gray;
    font-size: large;
    margin-left: 2%;
    margin-bottom: 1.5%;
    margin-top: 3%;
  }
  .projectInfoBody {
    border:2px solid gainsboro;
    border-radius: 12px;
    width: 97%;
    margin-left: 2%;
    .el-col {
      margin-top: 3%;
    }
  }
</style>
