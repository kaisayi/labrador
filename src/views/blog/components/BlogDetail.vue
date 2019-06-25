<template>
  <div class="createPost-container">
    <el-form :model="postForm" :rules="rules" ref="postForm" label-width="100px" class="demo-postForm">
      <el-form-item>
        <el-button type="primary" @click="submitForm('postForm')">立即创建</el-button>
        <el-button @click="resetForm('postForm')">重置</el-button>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="postForm.title"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="category_id">
        <el-select v-model="postForm.category_id" placeholder="类型">
          <el-option label="区域一" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="postForm.status">
          <el-radio label="发布"></el-radio>
          <el-radio label="存档"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="content">
        <el-input type="textarea" v-model="postForm.content"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import blogApi from '@/api/blog'

  const defaultForm = {
    status: 0,
    title: '', // 文章题目
    content: '', // 文章内容
    source_uri: '', // 文章外链
    image_uri: '', // 文章封面
    id: undefined,
    comment_disabled: false,
    category_id: undefined,
    tags: ''
  }

  export default {
    name: 'BlogDetail',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        postForm: {
          id: undefined,
          title: '',
          status: undefined,
          content: '',
          tags: '',
          source_uri: '',
          image_uri: '',
          category_id: undefined,
          comment_disabled: false
        },
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          category_id: [
            { required: true, message: '请选择分类', trigger: 'change' }
          ],
          source_uri: [
            { required: true, message: '请填写博客链接', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '请选择发布或者存稿', trigger: 'change' }
          ],
          content: [
            { required: true, message: '请填写内容', trigger: 'blur' }
          ]
        }

      }
    },
    created() {
      if (this.isEdit) {
        const id = this.$route.params && this.$route.params.id
        this.fetchData(id)
      } else {
        this.postForm = Object.assign({}, defaultForm)
      }
    },
    methods: {
      fetchData(id) {
        blogApi.findById(id).then(response => {
          this.postForm = response.data
        }).catch(err => {
          console.log(err)
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  .createPost-container {
    position: relative;
    padding: 20px 20px 20px 0px;
  }

</style>
