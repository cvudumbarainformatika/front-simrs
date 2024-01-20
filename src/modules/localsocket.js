import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import axios from 'axios'

const host = '192.168.101.80'
const ser = 'http://' + host + '/api.laborat/public'
// const host = '192.168.150.111'
// const ser = 'http://' + host + ':3507'
const port = 6003

const getLocalToken = () => JSON.parse(localStorage.getItem('token'))
window.Pusher = Pusher
const api = axios.create({ baseURL: host })
api.defaults.headers.get.Accepts = 'application/json'

api.defaults.headers.common.Authorization = `Bearer ${getLocalToken()}`
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'simrs_key_harry141312',
  cluster: 'mt1',
  wsHost: host,
  encrypted: false,
  wssPort: port,
  wsPort: port,
  disableStats: false,
  forceTLS: false, // default true
  enabledTransports: ['ws'],
  // enabledTransports: ['ws'],
  authorizer: (channel) => {
    return {
      authorize: (socketId, callback) => {
        // api.post('/broadcasting/auth', {
        // axios.create({ baseURL: ser })
        axios.defaults.headers.get.Accepts = 'application/json'

        axios.defaults.headers.common.Authorization = `Bearer ${getLocalToken()}`
        api.post(ser + '/api/broadcasting/auth', {
          socket_id: socketId,
          channel_name: channel.name
        })
          .then(response => {
            callback(null, response.data)
          })
          .catch(error => {
            callback(error)
            // console.log('channel auth', error)
          })
      }
    }
  }
})
// const anjunganChannel = window.Echo.channel('public.anjungan')
const laravelEcho = window.Echo
const chatChannel = window.Echo.join('presence.chat.1')
const notifChannel = window.Echo.join('private.chat.1')

export {
  chatChannel, laravelEcho, notifChannel
}
