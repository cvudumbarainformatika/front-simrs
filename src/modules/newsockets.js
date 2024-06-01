import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import { SERV, WSHOST, WSPORT } from 'src/boot/axios'
window.Pusher = Pusher

// const host = '192.168.101.80'
// const serv = 'http://' + host + '/api.laborat/public'
// const host = '192.168.150.111'
// const serv = 'http://' + host + ':3507'
// const port = 6003

const getLocalToken = () => JSON.parse(localStorage.getItem('token'))

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'simrs_key_harry141312',
  cluster: 'mt1',
  wsHost: WSHOST,
  wsPort: WSPORT,
  forceTLS: false,
  disableStats: true,
  authEndpoint: SERV + '/api/broadcasting/auth',
  auth: {
    headers: {
      Authorization: 'Bearer ' + getLocalToken()
    }
  }

})

const laravelEcho = window.Echo

const qchannel = window.Echo.channel('public.playground.1')

export { laravelEcho, qchannel }
