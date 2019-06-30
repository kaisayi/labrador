<template>
  <div>
    <el-form :model="postForm" :rules="rules" ref="postForm" label-width="60px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="postForm.title"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="category_id">
        <el-select v-model="postForm.category_id" placeholder="类型">
          <el-option v-for="cate in catetoryList" :label="cate.name" :value="cate.id" :key="cate.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="postForm.status">
          <el-radio border label="0">存档</el-radio>
          <el-radio border label="1">发布</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('postForm')">创建</el-button>
        <el-button @click="resetForm('postForm')">重置</el-button>
      </el-form-item>
      <el-form-item prop="content">
        <mavon-editor v-model="postForm.content" ref="md" @imgAdd="$imgAdd" @change="change" style="min-height: 600px"/>
      </el-form-item>
      <el-form-item prop="cover_image">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import blogApi from '@/api/blog'
  import cateApi from '@/api/category'
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'

  const defaultForm = {
    status: 0,
    title: '', // 文章题目
    content: '', // 文章内容
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
    components: {
      mavonEditor
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
        catetoryList: [],
        image: {},
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          category_id: [
            { required: true, message: '请选择分类', trigger: 'change' }
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
      this.fetchCateList()
    },
    methods: {
      fetchData(id) {
        blogApi.findById(id).then(response => {
          this.postForm = response.data
        }).catch(err => {
          console.log(err)
        })
      },
      fetchCateList() {
        cateApi.getList().then(resp => {
          this.catetoryList = resp.data
        }).catch(err => {
          console.log(err)
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            blogApi.update(this.postForm.id, this.postForm).then(response => {
              this.$message({
                message: response.message,
                type: response.flag ? 'success' : 'error'
              })
            })
          } else {
            this.$message({
              message: '请规范填写',
              type: 'error'
            })
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      // 将图片上传到服务器，返回地址替换到md中
      $imgAdd(pos, $file) {
        var formdata = new FormData()
        formdata.append('file', $file)
        // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
        this.$axios({
          url: '/common/upload',
          method: 'post',
          data: formdata,
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then((url) => {
          this.$refs.md.$img2Url(pos, url)
        })
      },
      change(value, render) {
        // render 为 markdown 解析后的结果
        this.html = render
      }
    }
  }

</script>
