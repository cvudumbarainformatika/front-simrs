import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
// import { api } from 'src/boot/axios'

const host = 'xenter.my.id'
// const host2 = 'localhost' // '127.0.0.1' || '192.168.101.80'
// const host = '36.89.103.117'
// const host = '192.168.101.79'
// const host = '192.168.150.103'

window.Pusher = Pusher

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'simrs_key_harry141312',
  cluster: 'mt1',
  // wsHost: host,
  wsHost: host,
  encrypted: true,
  wssPort: 6002,
  wsPort: 6002,
  disableStats: true,
  forceTLS: true, // default true
  enabledTransports: ['ws', 'wss']
})

// window.Echo = new Echo({
//   broadcaster: 'pusher',
//   key: 'simrs_key_harry141312',
//   cluster: 'mt1',
//   // wsHost: host,
//   wsHost: host2,
//   encrypted: false,
//   wssPort: 6003,
//   wsPort: 6003,
//   disableStats: false,
//   forceTLS: false, // default true
//   enabledTransports: ['ws', 'wss'],
//   authorizer: (channel) => {
//     return {
//       authorize: (socketId, callback) => {
//         api.post('/broadcasting/auth', {
//           socket_id: socketId,
//           channel_name: channel.name
//         })
//           .then(response => {
//             callback(null, response.data)
//           })
//           .catch(error => {
//             callback(error)
//           })
//       }
//     }
//   }
// })

const channel = window.Echo.channel('public.playground.1')
const channelLogin = window.Echo.channel('public.login.qr')
const qrcodeChannel = window.Echo.channel('qrcode')

// INI CHANNEL LOCAL
// const antreanChannel = window.Echo.channel('public.antrean')
// const anjunganChannel = window.Echo.channel('public.anjungan')
// const chatChannel = window.Echo.join('presence.chat.1')
// const socket = () => {
//   let msg = null
//   channel.subscribed(() => {
//     console.log('subscribed!!!')
//   }).listen('.playground', (e) => {
//     msg = e
//   })

//   return msg
// }

export {
  channel,
  qrcodeChannel,
  channelLogin
  // antreanChannel,
  // anjunganChannel,
  // chatChannel
}
