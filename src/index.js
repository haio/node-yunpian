import api from './api.json'
import createUser from './createUser'
import createSms from './createSms'
import createVoice from './createVoice'

function yunpian (apikey) {
  const user = createUser(apikey, api.user)
  const sms = createSms(apikey, api.sms)
  const voice = createVoice(apikey, api.voice)

  return {
    user,
    sms,
    voice,
  }
}

export default yunpian
