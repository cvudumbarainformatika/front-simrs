<template>
  <router-view />
</template>

<script setup>
// import { onMounted } from 'vue'
import { useQuasar } from 'quasar'

import customIcons from 'src/custom-icons/custom-icons'
import { channel } from 'src/modules/sockets'
import { usePermintaanLuarLaboratTable } from './stores/simrs/penunjang/laborat/permintaanluar/table'

const $q = useQuasar()
$q.dark.set(false)
$q.iconSet.set(customIcons)
document.body.setAttribute(['data-theme'], 'custom')

// websocket
const labLuar = usePermintaanLuarLaboratTable()
channel.subscribed(() => {
  console.log('subscribed!!!')
}).listen('.playground', (e) => {
  console.log(e)
  if (e.message.menu === 'laborat-luar') {
    const items = labLuar.items
    if (items.length > 0) {
      const item = items.filter(x => x.nota === e.message.__key)
      if (item.length > 0) {
        item[0].akhirx = '1'
      }
    }
  }
})
</script>
