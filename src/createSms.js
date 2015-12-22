import qs from 'querystring'
import request from 'axios'

export default function (apikey, api) {
  return {
    send (mobile, text) {
      return request.post(api.send, qs.stringify({
        mobile,
        text,
        apikey,
      }))
    },

    sendWithTemplate (mobile, tplId, tplValue) {
      return request.post(api.sendWithTemplate, qs.stringify({
        mobile,
        apikey,
        tpl_id: tplId,
        tpl_value: qs.stringify(tplValue),
      }))
    },

    getReplies (data) {
      return request.post(api.getReplies, qs.stringify({
        ...data,
        apikey,
      }))
    },

    getRecords (data) {
      return request.post(api.getRecords, qs.stringify({
        ...data,
        apikey,
      }))
    },

    getBlackWords (text) {
      return request.post(api.getBlackWords, qs.stringify({
        text,
        apikey,
      }))
    },

    multiSend (mobile, text) {
      return request.post(api.multiSend, qs.stringify({
        mobile,
        text,
        apikey,
      }))
    },
  }
}