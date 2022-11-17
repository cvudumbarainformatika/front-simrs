<template>
  <router-view />
</template>

<script setup>
// import { onMounted } from 'vue'
import { useQuasar } from 'quasar'

import customIcons from 'src/custom-icons/custom-icons'
import { channel } from 'src/modules/sockets'
import { usePermintaanLuarLaboratTable } from './stores/simrs/penunjang/laborat/permintaanluar/table'
import { useTransaksiLaboratTable } from './stores/simrs/penunjang/laborat/transaksi_laborat'

const $q = useQuasar()
$q.dark.set(false)
$q.iconSet.set(customIcons)
document.body.setAttribute(['data-theme'], 'custom')

// websocket
// lab
const labLuar = usePermintaanLuarLaboratTable()
const labDalam = useTransaksiLaboratTable()
channel.subscribed(() => {
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
  } else {
    const items = labDalam.items
    if (items.length > 0) {
      const item = items.filter(x => x.rs2 === e.message.__key)
      if (item.length > 0) {
        item[0].rs26 = '1'
      }
    }
  }
})

// qrCode
// qrcodeChannel.subscribed(() => {
//   console.log('Chanel QRCODE')
// }).listen('.qr-baru', (e) => {
//   console.log('string qr', e)
// })
</script>
