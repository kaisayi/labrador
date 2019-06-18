<template>
<div class="app-container">
  <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
    <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
      <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
        发布
      </el-button>
      <el-button v-loading="loading" type="warning" @click="draftForm">
        存档
      </el-button>
    </sticky>
  </el-form>
  <br>
  <mavon-editor v-model="value"/>
</div>
</template>

<script>
import Sticky from '@/components/Sticky'
import { validateURL } from '@/utils/validate'

const defaultForm = {
  status: 'draft',
  title: '', 
  content: '',
  source_uri: '',
  image_uri: '',
  update_time: undefined,
  id: undefined,
  is_comment: false,
  is_delete: false
}

export default {
  name: 'EditForm',
  components: {
    Sticky
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validateURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(new Error('外链url填写不正确'))
        }
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      value: '',
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
      },
      tempRoute: {}
    }
  },
  methods: {
    submitForm() {
    },
    draftForm() {
    },
    
    
  },
  
  
}
</script>