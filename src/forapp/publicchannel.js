import { channel } from 'src/modules/sockets'
import { usePermintaanLuarLaboratTable } from 'src/stores/simrs/penunjang/laborat/permintaanluar/table'
import { useTransaksiLaboratTable } from 'src/stores/simrs/penunjang/laborat/transaksi_laborat'

export function usePublicChannel () {
  const labLuar = usePermintaanLuarLaboratTable()
  const labDalam = useTransaksiLaboratTable()
  const publicChannel = () => {
    return channel.subscribed(() => {
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
          }
        }
      }
    })
  }

  // return const || function
  return { publicChannel }
}
