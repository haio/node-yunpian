import qs from 'querystring'
import request from 'axios'

export default function (apikey, api) {
  return {
    send (mobile, code) {
      return request.post(api.send, qs.stringify({
        mobile,
        code,
        apikey,
      }))
    },
  }
}