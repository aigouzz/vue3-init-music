import Axios from 'axios'
import {Toast} from 'vant'

const port = process.env.PORT || 4040
const _baseUrl = `http://127.0.0.1:${port}`
// 'https://netease-n3ts0l304-aigouzz.vercel.app'
let axios = Axios.create({
  timeout: 8000,
  withCredentials: true,
  baseURL: _baseUrl
})
// code状态码200判断
axios.interceptors.response.use((res) => {
  if (res.status === 654) { // 百度云请求超时检测
    Toast.fail('请求超时！')
  }
  if (res.data.code !== 200) {
    Toast.fail('数据返回有误')
    return Promise.reject(res)
  }
  return res.data
}, (error) => {
  console.log('promise error:' + error)
  return Promise.reject(error)
})
export default axios
