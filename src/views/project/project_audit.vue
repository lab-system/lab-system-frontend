<template>

  <div ref="print" class="app-container">

    <el-table :data="tableData" border fit highlight-current-row class="custom_sale_table">

      <el-table-column prop="name" label="项目名称"/>

      <el-table-column prop="plan" label="项目进度"/>
      <el-table-column prop="start_t" label="开始时间"/>
      <el-table-column prop="end_t" label="结束时间"/>
      <el-table-column prop="leader_name" label="项目负责人"/>
      <el-table-column prop="users" label="项目成员">
        <template slot-scope="scope">
          <p>{{ scope.row.users.map(v => {return v.cname}).join(', ') }}</p>
        </template>
      </el-table-column>
      <el-table-column :formatter="formatterStatus" prop="status" label="状态"/>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleAudit(scope.row.id)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagesize" @pagination="getList"/>

    <el-dialog :visible.sync="projectAuditDialogVisible" title="项目审核" width="70%">
      <hr>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-table ref="multipleTable" :data="list" tooltip-effect="dark" element-loading-text="正在查询中。。。" bproject fit highlight-current-row class="custom_sale_table">
            <el-table-column prop="name" label="项目名称"/>
            <el-table-column prop="plan" label="项目进度"/>
            <el-table-column prop="start_t" label="开始时间"/>
            <el-table-column prop="end_t" label="结束时间"/>
            <el-table-column prop="leader_name" label="项目负责人"/>
            <el-table-column prop="users" label="项目成员">
              <template slot-scope="scope">
                <p>{{ scope.row.users.map(v => {return v.cname}).join(', ') }}</p>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <hr>
      <el-row :gutter="20">
        <el-col :span="24" style="text-align:right; margin:20px 0; ">
          <el-radio-group v-if="currentAudit.status === 0" v-model="auditQuery.status">
            <el-radio :label="1">通过</el-radio>
            <el-radio :label="2">驳回</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>

      <el-row v-if="auditQuery.status == 2" :gutter="20">
        <el-col :offset="10" :span="14" style="text-align:right;">
          <el-input :rows="2" v-model="auditQuery.reject_reason" type="textarea" placeholder="请输入驳回原因" />
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="projectAuditDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getProjectList, createProject, getProjectDetail, updateProject, partUpdateProject, deleteProject } from '@/api/project'
import formatter from '@/utils/formatter'
import Pagination from '@/components/Pagination'

export default {
  name: 'ProjectAudit',
  components: { Pagination },
  data() {
    return {
      content: '哈哈啊哈',
      currentAudit: {
        status: 0
      },
      auditQuery: {
        status: 1,
        reject_reason: null
      },
      list: [],
      isCreateForm: false,
      users: [],
      projectDialogVisible: false,
      projectAuditDialogVisible: false,
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
    handleAudit(id) {
      this.list = []
      this.projectAuditDialogVisible = true
      this.auditQuery.status = 0

      getProjectDetail(id).then(response => {
        console.log('detail', response)
        if (response.data) {
          this.list.push(response.data)
          this.currentAudit.status = response.data.status
        }
      }).catch(e => {
        console.log(e)
      })
    },
    submit() {
      if (this.currentAudit.status === 0) {
        if (this.auditQuery.status === 2 && !this.auditQuery.reject_reason) {
          this.$notify.error({
            title: '失败',
            message: '审核失败，驳回原因不能为空'
          })
        } else {
          partUpdateProject(this.list[0].id, this.auditQuery).then(response => {
            console.log('update', response)
            if (response.status === 200) {
              this.getList()
              this.$notify.success({
                title: '成功',
                message: '审核成功'
              })
            }
            this.projectAuditDialogVisible = false
          }).catch(e => {
            console.log(e)
          })
        }
      } else {
        this.projectAuditDialogVisible = false
      }
    },
    getList() {
      getProjectList(this.listQuery).then(response => {
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
