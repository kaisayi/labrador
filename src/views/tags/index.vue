<template>
  <div class="app-container">
    <el-row :gutter="16">
      <el-col :span="45">
        <el-input size="mini" v-model="tag.name" placeholder='关键词 (回车)' @keyup.enter.native='getListByQuery'
                  clearable></el-input>
      </el-col>
      <el-col :span="45">
        <el-select v-model="tag.type" @change="getListByQuery" placeholder='类型'>
          <el-option label="算法" value="算法"></el-option>
          <el-option label="后端" value="后端"></el-option>
          <el-option label="出行" value="出行"></el-option>
          <el-option label="大数据" value="大数据"></el-option>
        </el-select>
      </el-col>
      <el-col :span="45">
        <el-select v-model="tag.status" @change="getListByQuery" placeholder='状态'>
          <el-option label="在线" value="1"></el-option>
          <el-option label="删除" value="0"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="50" v-for="(v, k) in tagList" :key="k">
        <el-tag closable @close="closeHandle(v)" @click.native="clickHandle(v)"
                :type='getTagType(v.status)'>
          {{ formatTag(v) }}
        </el-tag>
      </el-col>
    </el-row>
    <el-pagination
      @size-change="getListByQuery"
      @current-change="getListByQuery"
      :current-page="page"
      :page-sizes="[50,100,200]"
      :page-size="50"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>


  </div>
</template>

<script>
  import tagApi from '@/api/tags'

  export default {
    name: 'Tags',
    data() {
      return {
        tag: {
          name: '',
          type: '',
          status: undefined
        },
        tagList: [],
        page: 1,
        pageSize: 50,
        total: 0 // 总记录数
      }
    },
    created() {
      this.getListByQuery()
    },
    methods: {
      getListByQuery() {
        tagApi.search(this.page, this.pageSize, this.tag).then(resp => {
          this.tagList = resp.data.rows
          this.total = resp.data.total
        })
      },
      closeHandle(t) {
        console.log(t)
        this.getListByQuery()
      },
      clickHandle(t) {
        console.log(t)
        this.getListByQuery()
      },
      getTagType(status) {
        if (status >= 3) {
          return 'success'
        }
        if (status === 1) {
          return 'danger'
        }
        return 'default'
      },
      formatTag(t) {
        return `${t.name}:${t.type}`
      }
    }
  }
</script>

<style scoped>
  .el-row {
    padding-bottom: 10px;
  }

  .el-tag {
    padding-bottom: 5px;
    cursor: pointer;
  }
</style>
