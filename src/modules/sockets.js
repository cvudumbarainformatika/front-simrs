import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
// import axios from 'axios'
// import { api } from 'src/boot/axios'

const host = 'xenter.my.id'

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
const channel = window.Echo.channel('public.playground.1')
const refreshCh = window.Echo.channel('public.refresh-page')
const channelLogin = window.Echo.channel('public.login.qr')
// const qrcodeChannel = window.Echo.channel('qrcode')

// INI CHANNEL LOCAL
const antreanChannel = window.Echo.channel('public.antrean')

export {
  channel,
  // qrcodeChannel,
  channelLogin,
  antreanChannel,
  refreshCh
}
