import { request } from '@/utils/request'

/**
 * 获取搜索建议
 * @param {String} q 关键词
 * @returns Promise
 */
export const getSuggestionsApi = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 * 获取搜索结果
 * @param {*} params 请求参数 页数/偏移量/关键词
 * @returns Promise
 */
export const getSearchResApi = (params) =>
  request({
    url: '/v1_0/search',
    params
  })
