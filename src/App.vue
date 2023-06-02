<template>
  <router-view />
</template>

<script setup>
// import { onMounted } from 'vue'
import { useQuasar } from 'quasar'

import customIcons from 'src/custom-icons/custom-icons'
import { anjunganChannel, channel } from 'src/modules/sockets'
import { useCallStore } from './stores/antrian/call'
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

// antrean local
const callstore = useCallStore()
anjunganChannel.subscribed(() => {
  console.log('subscribed anjungan channel!!!')
}).listen('.anjungan', (e) => {
  console.log('anjungan-channel', e)
  if (e.message.menu === 'cetak-antrean') {
    const data = e.message.data
    if (parseInt(data.layanan_id) === callstore.unit) {
      callstore.getDataTable(true) // true maksudnya no loading
    }
  }
  if (e.message.menu === 'panggilan-berakhir') {
    const data = e.message.data
    callstore.ubahStatus(data)
  }
})
</script>
