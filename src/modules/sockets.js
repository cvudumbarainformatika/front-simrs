import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

const host = '192.168.150.103'

window.Pusher = Pusher

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'simrs_key_harry141312',
  cluster: 'mt1',
  wsHost: host,
  encrypted: false,
  wssPort: 6001,
  wsPort: 6001,
  disableStats: true,
  forceTLS: false, // default true
  enabledTransports: ['ws', 'wss']
})

const channel = window.Echo.channel('public.playground.1')

// const socket = () => {
//   let msg = null
//   channel.subscribed(() => {
//     console.log('subscribed!!!')
//   }).listen('.playground', (e) => {
//     msg = e
//   })

//   return msg
// }

export { channel }
