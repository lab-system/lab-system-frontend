<template>
  <div class="app-container">
    <el-form ref="reportFormAdd" :model="reportForm" :rules="rules" label-position="left">
      <el-form-item label="标题：" label-width="100px" prop="title">
        <el-col :span="12">
          <el-input v-model="reportForm.title" auto-complete="off"/>
        </el-col>
      </el-form-item>
      <el-form-item label="周次：" label-width="100px" prop="title">
        <el-col :span="12">
          <el-input v-model="reportForm.week_count" auto-complete="off"/>
        </el-col>
      </el-form-item>
      <el-form-item label="周报内容:" label-width="100px" prop="content">
        <tinymce ref="tinymce" :height="400" v-model="reportForm.content"/>
      </el-form-item>
      <hr>
      <el-form-item class="custom_button">
        <el-button :disabled="disableBtn" class="filter-item" type="primary" icon="el-icon-success" @click="handleSubmit()">提交周报</el-button>
      </el-form-item>

    </el-form>

<!--    <div class="filter-container">-->
<!--      <el-button class="filter-item" type="primary" icon="el-icon-circle-plus" @click="handleAdd()">查看周报</el-button>-->
<!--    </div>-->
<!--    <el-col >-->
<!--      <div class="editor-content" v-html="reportForm.content" />-->
<!--    </el-col>-->

  </div>
</template>

<script>
import { getReportList, createReport, getReportDetail, updateReport, deleteReport } from '@/api/report'
import Tinymce from '@/components/Tinymce'
import validate from '@/utils/formatter'

export default {
  name: 'Report',
  components: { Tinymce },
  data() {
    return {
      disableBtn: false,
      reportForm: {
        title: '',
        week_count: '',
        content: '<h3>本周完成工作：</h3><p>&nbsp;</p>' +
            '<h3>本周工作总结：</h3><p>&nbsp;</p>' +
            '<h3>下周工作计划：</h3><p>&nbsp;</p>' +
            '<h3>需协调与帮助：</h3><p>&nbsp;</p>',
      },
      rules: {
        week_count: [
          {required: true, message: '请输入周次', trigger: 'blur'},
          {validator: validate.validateWeekCount, trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    this.disableBtn = false
  },
  methods: {
    // 获取编辑器内容
    getContent(content) {
      this.content = content
    },
    // // 编辑器内容转换成在线url
    // async getcontent2Url() {
    //   try {
    //     const htmlUrl =  await this.$refs.tinymce.content2Url()
    //     return htmlUrl
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },
    handleSubmit() {
      console.log(this.reportForm.content)
      createReport(this.reportForm).then(r => {
        console.log('report', r)
        if (r.data) {
          this.disableBtn = true
          this.$notify.success({
            title: '成功',
            message: '提交成功'
          })
        } else {
          this.$notify.error({
            title: '失败',
            message: '提交失败'
          })
        }
      }).catch(e => {
        console.log(e)
      })
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

  .custom_button {
    text-align: center;
  }
</style>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>
