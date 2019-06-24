<template>
  <div class="app-container">
    <br>
    <el-form :inline="true">
      <el-form-item>
        <el-input placeholder="Search" v-model="searchValue"></el-input>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
    </el-form>

    <!-- <svg-icon class-name="search-icon" icon-class="search" @click.stop="click"/> -->
    <!-- <el-form :inline="true">
      <el-form-item label="标题">
        <el-input v-model="searchMap.name" placeholder="查询内容"></el-input>
      </el-form-item>
      <el-tag type="primary" @click="fetchData()">查询</el-tag>
    </el-form>-->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row
      :default-sort="{prop: 'update_time', order: 'descending'}"
      style="width: 100%"
    >
      <!-- <el-table-column type="selection" align="center" width="55"></el-table-column> -->
      <el-table-column fixed="right" align="center" label="操作" width="80">
        <template slot-scope="scope">
          <router-link :to="`/blog/edit/${scope.row.id}`" class="link-type">
            <el-tooltip effect="light" content="编辑" placement="top">
              <el-button type="text" icon="el-icon-edit"></el-button>
            </el-tooltip>
          </router-link>
          <el-tooltip effect="light" content="删除" placement="top">
            <el-button @click.native="handleDelete(scope.row.id)" type="text" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="title" align="center" sortable label="标题"></el-table-column>
      <el-table-column prop="tags" align="center" label="标签"></el-table-column>
      <el-table-column prop="status" align="center" label="状态">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status | statusFilter"
            close-transition
          >{{ scope.row.status | statusNameFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="cover_image" align="center" label="预览图">
        <template slot-scope="scope">
          <img :src="scope.row.cover_image">
        </template>
      </el-table-column>
      <el-table-column prop="update_time" align="center" sortable label="更新日期"></el-table-column>
      <el-table-column prop="views" align="center" sortable label="浏览量"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="fetchData"
      @current-change="fetchData"
      :current-page="currentPage"
      :page-sizes="[5,10,20]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
  import blogApi from '@/api/blog'

  export default {
    data() {
      return {
        list: [],
        total: 0, // 总记录数
        currentPage: 1, // 当前页
        pageSize: 10, // 每页大小
        searchValue: '', // 查询条件
        dialogFormVisible: false, // 编辑窗口是否可见
        pojo: {}, // 编辑表单绑定的实体对象
        id: '' // 当前用户修改的ID
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: 'success',
          2: 'info',
          3: 'danger'
        }
        return statusMap[status]
      },
      statusNameFilter(status) {
        const statusNameMap = {
          1: '已发布',
          2: '编辑中',
          3: '已删除'
        }
        return statusNameMap[status]
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        blogApi
          .search(this.currentPage, this.pageSize, this.searchValue)
          .then(response => {
            this.list = response.data.rows
            this.total = response.data.total
          })
      },
      handleSearch() {
        blogApi
          .search(this.currentPage, this.pageSize, this.searchValue)
          .then(response => {
            this.list = response.data.rows
            this.total = response.data.total
          })
      },
      handleSave() {
        blogApi.update(this.id, this.pojo).then(response => {
          this.$message({
            message: response.message,
            type: response.flag ? 'success' : 'error'
          })

          if (response.flag) {
            // 如果成功
            this.fetchData() // 刷新列表
          }
        })
        this.dialogFormVisible = false // 关闭窗口
      },
      handleEdit(id) {
        this.id = id
        this.dialogFormVisible = true // 打开窗口

        if (id !== '') {
          // 修改
          blogApi.findById(id).then(response => {
            if (response.flag) {
              this.pojo = response.data
            }
          })
        } else {
          this.pojo = {} // 清空数据
        }
      },
      handleDelete(id) {
        this.$confirm('确定要删除此纪录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            blogApi.deleteById(id).then(response => {
              this.$message({
                message: response.message,
                type: response.flag ? 'success' : 'error'
              })
              if (response.flag) {
                this.fetchData() // 刷新数据
              }
            })
          })
          .catch(() => {
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;
  }
</style>
