export const mobileRules = [
  { required: true, message: '请填写手机号码' },
  {
    pattern:
      /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
    message: '手机号码不合规范'
  }
]

export const codeRules = [
  { required: true, message: '请填写验证码' },
  { pattern: /^\d{6}$/, message: '验证码格式不正确' }
]
