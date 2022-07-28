import { request } from "@/utils/request";


/**
 * loginApi
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @returns Promise
 */
export const loginApi = (data)=>{
    return request({
        url:'/v1_0/authorizations',
        method: 'POST',
        data
    })
}