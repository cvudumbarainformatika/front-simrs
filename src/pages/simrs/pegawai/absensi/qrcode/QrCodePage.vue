<template>
  <q-page class="q-pa-lg">
    <q-input label="alamat" />
    {{ seconds }}
    <div v-if="!store.newQr">
      <app-no-data />
    </div>
    <div v-if="store.newQr">
      <div class="q-pa-lg f-10">
        {{ store.newQr }}
      </div>
      <div
        v-if="!store.loading"
        class="flex flex-center"
      >
        <canvas id="qrcode" />
      </div>
      <div v-if="store.loading">
        <app-loading />
      </div>
    </div>
  </q-page>
</template>
<script setup>
// import { ref } from 'vue'
import QRious from 'qrious'
import { qrcodeChannel } from 'src/modules/sockets'
import { notifErrVue } from 'src/modules/utils'
// import { qrcodeChannel } from 'src/modules/sockets'
import { useQrCodeStore } from 'src/stores/simrs/pegawai/absensi/qrcode/qrcode'
import { onMounted, ref } from 'vue'
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

qrcodeChannel.subscribed(() => {
  console.log('Chanel QRCODE Page Qr')
}).listen('.qr-baru', e => {
  console.log('string qr pageQr', e)
  timer = 60
})
store.setComputerId()

const seconds = ref(60)
const duration = 60
let timer = duration
const countDown = () => {
  setInterval(() => {
    seconds.value = parseInt(timer % 60, 10)
    // console.log('timer', timer)
    if (--timer < 0) {
      timer = duration
      getNewQr()
    }
  }, 1000)
}
const getNewQr = () => {
  store.createNewQr().then(() => {
    generate()
  })
}
onMounted(() => {
  getNewQr()
  countDown()
})

</script>
