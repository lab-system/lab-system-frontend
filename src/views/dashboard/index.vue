<template>
  <div class="dashboard-container">
    <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-left: 10px">
      <el-tab-pane label="日常工具大全" name="first">
        <el-table
          :data="tableData"
          style="width: 90%;margin-left: 3%"
          :row-class-name="tableRowClassName">
          <el-table-column
            prop="name"
            label="简称"
            >
          </el-table-column>
          <el-table-column
            prop="url"
            label="url"
            >
            <template slot-scope="scope">
              <span class="link-type" @click="handleGoUrl(scope.row.url)">{{ scope.row.url }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="detail"
            label="描述">
          </el-table-column>
        </el-table>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'Dashboard',
    data() {
      return {
        currentRole: 'adminDashboard',
        activeName: 'first',
        tableData: [{
          name: '后台接口文档',
          url: 'http://localhost:8000/docs',
          detail: '后端接口调用说明',
        }, {
          name: '后台管理系统',
          url: 'http://localhost:8000/xadmin',
          detail: '后台管理系统'
        },{
          name: 'API文档',
          url: 'http://localhost:8000/users',
          detail: 'API接口文档'
        }]
      }
    },
    computed: {
      ...mapGetters([
        'roles'
      ])
    },
    created() {
      if (!this.roles.includes('admin')) {
        this.currentRole = 'editorDashboard'
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleGoUrl(url) {
        window.open(url, '_blank');
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        } else if (rowIndex === 5) {
          return 'info-row';
        } else if (rowIndex === 8) {
          return 'transp-row';
        }else if (rowIndex === 11) {
          return 'zzz-row';
        }
        return '';
      }
    }
  }
</script>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .el-table .info-row {
    background: #ccffff;
  }
  .el-table .transp-row {
    background: #cce5ff;
  }
  .el-table .zzz-row {
    background: #ffccff;
  }
</style>
