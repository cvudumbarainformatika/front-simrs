import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
window.Pusher = Pusher

const host = '192.168.101.80'
const serv = 'http://' + host + '/api.laborat/public'
// const host = '192.168.150.111'
// const serv = 'http://' + host + ':3507'
const port = 6003

const getLocalToken = () => JSON.parse(localStorage.getItem('token'))

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'simrs_key_harry141312',
  cluster: 'mt1',
  wsHost: host,
  wsPort: port,
  forceTLS: false,
  disableStats: true,
  authEndpoint: serv + '/api/broadcasting/auth',
  auth: {
    headers: {
      Authorization: 'Bearer ' + getLocalToken()
    }
  }

})

const laravelEcho = window.Echo

export { laravelEcho }