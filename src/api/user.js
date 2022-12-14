import { request } from '@/utils/request'

/**
 * loginApi
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @returns Promise
 */
export const loginApi = (data) =>
  request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data
  })

/**
 *
 * @param {String} mobile 手机号
 * @returns Promise
 */
export const getCodeApi = (mobile) =>
  request({
    url: `/v1_0/sms/codes/${mobile}`
  })

export const getUserInfo = () =>
  request({
    url: '/v1_0/user/profile'
  })

// 如果传的是对象, axios默认将对象转成json并且加上content-type=application/json
// 如果传的是formDate表单, 那么axios会将表单提交给后端, 并且默认的加上content-type=mutipart/form-data
// 如果后端要的是表单(form-data)
// const fm = new FormData()
// fm.append(表单的name,表单项)

/**
 * 上传头像的
 * @param {*} file 图片的file对象
 * @returns Promise
 */
export const uploadAvator = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}

export const uploadProfile = (data) =>
  request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })

/**
 * 关注用户
 * @param {*} id 用户id
 * @returns promise
 */
export const addFollowApi = (id) =>
  request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: id
    }
  })

/**
 * 取消关注
 * @param {*} id 用户id
 * @returns Promise
 */
export const cancelFollowApi = (id) =>
  request({
    url: `/v1_0/user/followings/${id}`,
    method: 'DELETE'
  })
