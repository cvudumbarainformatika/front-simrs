<template>
  <router-view />
</template>

<script setup>
// import { onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { usePublicChannel } from 'src/forapp/publicchannel'
// import { usePresenceChannel } from 'src/forapp/presencechannel'

import customIcons from 'src/custom-icons/custom-icons'
// import { useAplikasiStore } from './stores/app/aplikasi'
// import { qchannel } from 'src/modules/newsockets'
// import { channel } from 'src/modules/sockets'
// import { notifChannel } from 'src/modules/localsocket'
// import { useAplikasiStore } from './stores/app/aplikasi'
// import { onBeforeUnmount, onUpdated, ref } from 'vue'
// import { useCallStore } from './stores/antrian/call'
// import { usePermintaanLuarLaboratTable } from './stores/simrs/penunjang/laborat/permintaanluar/table'
// import { useTransaksiLaboratTable } from './stores/simrs/penunjang/laborat/transaksi_laborat'
// import { onMounted } from 'vue'

const $q = useQuasar()
const { publicChannel } = usePublicChannel()
// const { chatting } = usePresenceChannel()
$q.dark.set(false)
$q.iconSet.set(customIcons)
document.body.setAttribute(['data-theme'], 'custom')

// const auth = useAplikasiStore()
// onMounted(() => {
publicChannel()

// notifChannel.subscribed(() => {
//   console.log('subscribed notif channel!!!')
// })
// chatting()
// })

// const labLuar = usePermintaanLuarLaboratTable()
// const labDalam = useTransaksiLaboratTable()

// channel.subscribed(() => {
//   console.log('subscribed!!!')
// }).listen('.playground', (e) => {
//   // console.log('listen', e)
//   if (e.message.menu === 'laborat-luar') {
//     const items = labLuar.items
//     if (items.length > 0) {
//       const item = items.filter(x => x.nota === e.message.__key)
//       if (item.length > 0) {
//         item[0].akhirx = '1'
//       }
//     }
//   } else {
//     const items = labDalam.items
//     if (items.length > 0) {
//       const item = items.filter(x => x.rs2 === e.message.__key)
//       if (item.length > 0) {
//         item[0].rs26 = '1'
//       }
//     }
//   }
// })

// PRESENCE CHANNEL

// anu()

</script>
