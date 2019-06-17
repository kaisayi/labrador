import request from '@/utils/request'
const blog_name = 'blog'
export default {
  getList() {
    return request({
      url: `/${blog_name}`,
      method: 'get'
    })
  },
  search(page, size, searchMap) {
    return request({
      url: `/${blog_name}/search/${page}/${size}`,
      method: 'post',
      data: searchMap
    })
  },
  deleteById(id) {
    return request({
      url: `/${blog_name}/${id}`,
      method: 'delete'
    })
  },
  save(pojo) {
    return request({
      url: `/${blog_name}`,
      method: 'post',
      data: pojo
    })
  },
  update(id, pojo) {
    if (id === null || id === '') {
      return this.save(pojo)
    }
    return request({
      url: `/${blog_name}/${id}`,
      method: 'put',
      data: pojo
    })
  },
  getTopList() {
    return request({
      url: `/${blog_name}/top`,
      method: 'get'
    })
  },
  examine(id, pojo) {
    return request({
      url: `/${blog_name}/examine/${id}`,
      method: 'put',
      data: pojo
    })
  },
  findById(id) {
    return request({
      url: `/${blog_name}/${id}`,
      method: 'get'
    })
  }
}
