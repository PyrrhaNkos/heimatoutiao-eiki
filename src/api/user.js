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
