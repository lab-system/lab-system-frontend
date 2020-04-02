<template>
  <div ref="print" class="app-container">

    <el-table :data="tableData" breport fit highlight-current-row class="custom_sale_table">

      <el-table-column prop="title" label="标题"/>
      <el-table-column prop="owner_name" label="汇报人"/>
      <el-table-column prop="create_time" label="创建时间"/>
      <el-table-column prop="remark" label="备注"/>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleCheck(scope.row.id)">查看</el-button>
          <el-button v-if="scope.row.owner==currentUser.id" type="text" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagesize" @pagination="getList"/>

    <el-dialog :visible.sync="reportDialogVisible" title="周报详情" width="50%">
      <el-row :gutter="20">
        <el-col :span="10"><div class="grid-content bg-purple"> <span class="custom_font_bold">标题：</span>{{ currentReport.title }}</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple"><span class="custom_font_bold">汇报人：</span>{{ currentReport.owner_name }}</div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <hr>
          <div class="editor-content" v-html="currentReport.content"/>
          <hr>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="20">
          <div class="grid-content bg-purple"> <span class="custom_font_bold">备注：</span>{{ currentReport.remark }}</div>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
<!--        <el-button @click="reportDialogVisible = false">取消</el-button>-->
        <el-button type="primary" @click="reportDialogVisible = false">确定</el-button>
<!--        <el-button type="primary" @click="submit">确定</el-button>-->
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getReportList, createReport, getReportDetail, partUpdateReport, updateReport, deleteReport } from '@/api/report'
import formatter from '@/utils/formatter'
import Pagination from '@/components/Pagination'

export default {
  name: 'ReportList',
  components: { Pagination },
  data() {
    return {
      currentUser: null,
      currentReport: {
        title: '',
        owner: '',
        owner_name: '',
        content: '',
        remark: ''
      },
      auditQuery: {
        status: 1,
        reject_reason: null
      },
      list: [],
      isCreateForm: false,
      reports: [],
      reportDialogVisible: false,
      tableData: [],
      total: 0,
      listQuery: {
        page: 1,
        pagesize: 20
      },
      readonly: true,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleDelete(id) {
      this.$confirm('是否删除此周报', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true
      }).then(() => {
        deleteReport(id).then(response => {
          console.log('delete', response)
          if (response.status === 204) {
            this.$notify.success({
              title: '成功',
              message: '删除周报成功'
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
    handleCheck(id) {
      // this.list = []
      this.reportDialogVisible = true

      getReportDetail(id).then(response => {
        console.log('detail', response)
        if (response.data) {
          this.currentReport.title = response.data.title
          this.currentReport.owner_name = response.data.owner_name
          this.currentReport.content = response.data.content
          this.currentReport.remark = response.data.remark
          // this.list.push(response.data)
          // this.current.status = response.data.status
        }
      }).catch(e => {
        console.log(e)
      })
    },
    submit() {
      if (this.current.status === 0) {
        if (this.auditQuery.status === 2 && !this.auditQuery.reject_reason) {
          this.$notify.error({
            title: '失败',
            message: '审核失败，驳回原因不能为空'
          })
        } else {
          partUpdateReport(this.list[0].id, this.auditQuery).then(response => {
            console.log('update', response)
            if (response.status === 200) {
              this.getList()
              this.$notify.success({
                title: '成功',
                message: '审核成功'
              })
            }
            this.reportDialogVisible = false
          }).catch(e => {
            console.log(e)
          })
        }
      } else {
        this.reportDialogVisible = false
      }
    },
    getList() {
      getReportList(this.listQuery).then(response => {
        console.log('listResponse', response)
        var list = response.data.results
        if (list.length !== 0) {
          this.currentUser = response.data.results[0].current_user
        }
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
    }
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
        breport: 0px;
        -webkit-appearance: none;
        breport-radius: 0px;
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
      breport: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      breport-radius: 5px;
      color: #454545;
    }

    .custom_font_bold {
      font-weight: bold;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  .reportInfoHeader {
    color: gray;
    font-size: large;
    margin-left: 2%;
    margin-bottom: 1.5%;
    margin-top: 3%;
  }
  .reportInfoBody {
    breport:2px solid gainsboro;
    breport-radius: 12px;
    width: 97%;
    margin-left: 2%;
    .el-col {
      margin-top: 3%;
    }
  }
</style>
