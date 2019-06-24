import request from '@/utils/request'

const cate_name = 'category'

export default {
  getList() {
    return request({
      url: `/${cate_name}`,
      method: 'get'
    })
  },

  save(pojo) {
    return request({
      url: `/${cate_name}`,
      method: 'post',
      data: pojo
    })
  },

  getCateById(id) {
    return request({
      url: `/${cate_name}/${id}`,
      method: 'get'
    })
  },

  update(id, pojo) {
    if (id === null || id === '') {
      return this.save(pojo)
    }
    return request({
      url: `/${cate_name}/${id}`,
      method: 'put',
      data: pojo
    })
  },

  deleteById(id) {
    return request({
      url: `/${cate_name}/${id}`,
      method: 'delete'
    })
  },

  queryByPage(page, size, searchMap) {
    return request({
      url: `/${cate_name}/search/${page}/${size}`,
      method: 'get',
      data: searchMap
    })
  }
}
