import qs from 'querystring'
import request from 'axios'

export default function (apikey, api) {
  return {
    show () {
      return request.post(api.show, qs.stringify({ apikey }))
    },

    update (data) {
      return request.post(api.update, qs.stringify({
        ...data,
        apikey,
      }))
    },
  }
}