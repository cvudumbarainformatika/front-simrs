// import { channel } from 'src/modules/sockets'
import { usePermintaanLuarLaboratTable } from 'src/stores/simrs/penunjang/laborat/permintaanluar/table'
import { useTransaksiLaboratTable } from 'src/stores/simrs/penunjang/laborat/transaksi_laborat'

import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
// import axios from 'axios'
// import { api } from 'src/boot/axios'

const host = '192.168.150.111'
const port = 6003

window.Pusher = Pusher

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'simrs_key_harry141312',
  cluster: 'mt1',
  wsHost: host,
  encrypted: false,
  // wssPort: port,
  wsPort: port,
  disableStats: false,
  forceTLS: false, // default true
  enabledTransports: ['ws']
})
const LIS = window.Echo.channel('public.playground.1')

export function usePublicChannel () {
  const labLuar = usePermintaanLuarLaboratTable()
  const labDalam = useTransaksiLaboratTable()
  const publicChannel = () => {
    return LIS.subscribed(() => {
      console.log('subscribed!!!')
    }).listen('.playground', (e) => {
      console.log('listen', e)
      if (e.message.menu === 'laborat-luar') {
        const items = labLuar.items
        if (items.length > 0) {
          const item = items.filter(x => x.nota === e.message.__key)
          if (item.length > 0) {
            item[0].akhirx = '1'
          }
        }
      }
      else {
        const items = labDalam.items
        if (items.length > 0) {
          const item = items.filter(x => x.rs2 === e.message.__key)
          if (item.length > 0) {
            item[0].rs26 = '1'
            labDalam.dariWebSockets(e.message.__key)
          }
        }
      }
    })
  }

  // return const || function
  return { publicChannel }
}
