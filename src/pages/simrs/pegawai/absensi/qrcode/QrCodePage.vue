<template>
  <q-page class="q-pa-lg">
    <div v-if="!store.newQr">
      <app-no-data />
    </div>
    <div v-if="store.newQr">
      <div class="q-pa-lg f-10">
        {{ store.newQr }}
      </div>
      <div class="flex flex-center">
        <canvas id="qrcode" />
      </div>
    </div>
  </q-page>
</template>
<script setup>
// import { ref } from 'vue'
import QRious from 'qrious'
import { notifErrVue } from 'src/modules/utils'
// import { qrcodeChannel } from 'src/modules/sockets'
import { useQrCodeStore } from 'src/stores/simrs/pegawai/absensi/qrcode/qrcode'
// const qrString = ref('')
const store = useQrCodeStore()
store.getQrCode().then(data => {
  console.log(' has data ', data)
  if (data === 'has data') {
    generate()
  }
})
const generate = () => {
  if (store.newQr !== '') {
    if (store.newQr !== '\n') {
      const temp = new QRious({
        level: 'H',
        padding: 25,
        size: 300,
        element: document.getElementById('qrcode'),
        value: store.newQr
      })
      console.log(temp)
    } else {
      notifErrVue('input value cannot has anter')
    }
  } else {
    notifErrVue('No qr to generate')
  }
  console.log('gnerate qr')
}

// qrcodeChannel.subscribed(() => {
//   console.log('Chanel QRCODE Page Qr')
// }).listen('newQr', e => {
//   console.log('string qr pageQr', e)
// })

</script>
