import request from '@/utils/request'

export default {
  getList() {
    return request({
      url: `/tag`,
      method: 'get'
    })
  },
  search(page, size, searchMap) {
    return request({
      url: `/tag/search/${page}/${size}`,
      method: 'post',
      data: searchMap
    })
  }
}
