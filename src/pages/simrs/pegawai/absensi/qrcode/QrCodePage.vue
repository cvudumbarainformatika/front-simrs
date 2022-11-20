<template>
  <q-page class="q-pa-lg">
    <!-- <q-input
      v-model="id"
      label="alamat"
    /> -->
    <!-- <q-btn
      label="pura-pura scan masuk"
      no-caps
      color="primary"
      @click="mockScan"
    />
    <q-btn
      label="pura-pura scan pulang"
      no-caps
      color="negative"
      @click="mockScanOut"
    /> -->
    <!-- {{ seconds }} -->
    <div class="row q-col-gutter-md">
      <div class="col-sm-6 col-md-6 col-lg-6">
        <div v-if="!store.newQr">
          <app-no-data />
        </div>
        <div
          v-if="store.newQr"
          class="q-mt-lg"
        >
          <!-- <div class="q-pa-lg f-10">
            {{ store.newQr }}
          </div> -->
          <!-- v-if="!store.loading" -->
          <div
            class="flex flex-center"
          >
            <canvas id="qrcode" />
          </div>
          <!-- <div v-if="store.loading">
        <app-loading />
      </div> -->
        </div>
      </div>
      <div
        v-if="user"
        class="col-sm-6 col-md-6 col-lg-6"
      >
        <q-card>
          <q-card-section>
            <div class="f-14 text-weight-bold text-center">
              {{ user? user.nama:'belum ada ' }}
            </div>
          </q-card-section>
          <q-card-section>
            <q-img
              :src="path"
              height="500px"
              ratio="1"
              fit="scale-down"
            />
          </q-card-section>
        </q-card>
        <!-- {{ path }} -->
      </div>
    </div>
  </q-page>
</template>
<script setup>
// import { ref } from 'vue'
import QRious from 'qrious'
// import { api } from 'src/boot/axios'
import { qrcodeChannel } from 'src/modules/sockets'
import { notifErrVue } from 'src/modules/utils'
// import { qrcodeChannel } from 'src/modules/sockets'
import { useQrCodeStore } from 'src/stores/simrs/pegawai/absensi/qrcode/qrcode'
import { computed, onMounted, ref } from 'vue'
// const qrString = ref('')
const store = useQrCodeStore()
const user = ref(null)
// const mockuser = ref({ id: 1, nip: '012001141074', nip_baru: '', nik: '', nama: 'dr. BAMBANG AGUS SUWIGNYO, MMKes', alamat: 'Jalan Ir. Sutami No.48 RT.002/RW.003\r\nKelurahan Jrebeng Kidul\r\nKecamatan Wonoasih\r\nKota Probolinggo', kelamin: 'Laki-Laki', templahir: 'Probolinggo', tgllahir: '1960-07-15', jenispegawai: 'Struktural', flag: 'P01', jabatan: 'J00001', profesi: '', jabatan_tmb: '', golruang: 'G00015', pendidikan: 'P00009', aktif: 'TIDAK AKTIF', foto: 'foto-012001141074.bmp', bagian: 'B00001', ruang: '', tgl_masuk: '2010-11-19', tgl_tmt: null, id_simrs: null, kategoripegawai: 'MTX000', pass: 'sasa123', alamat_detil: 'Jalan Ir. Sutami No.48 RT.002/RW.003\r\nKelurahan Jrebeng Kidul\r\nKecamatan Wonoasih\r\nKota Probolinggo', rt: '', rw: '', kelurahan: '', kecamatan: '', kota: '', agama: '', tmt_cpns: '0000-00-00', gaji_total: '', gaji_pokok: '', kel_ttg: '', th_mk_tmb: 0, bln_mk_tmb: 0, jurusan: '', flagpas: '1', telp: null, email: null, id_absen: '', jadwalkerja: '' })
const path = computed(() => {
  const pla = user.value ? 'https://rsudmsaleh.probolinggokota.go.id/simpeg/foto/' + user.value.nip + '/' + user.value.foto : ''
  return pla
})
// const mockScan = () => {
//   const temp = {
//     qr: id.value,
//     absen: 'masuk'
//   }
//   console.log('id', id.value)
//   return new Promise(resolve => {
//     api.post('v1/pegawai/absensi/qr/scan', temp)
//       .then(resp => {
//         console.log(resp)
//         resolve(resp)
//       })
//   })
// }
// const mockScanOut = () => {
//   const temp = {
//     qr: id.value,
//     absen: 'pulang'
//   }
//   console.log('id', id.value)
//   return new Promise(resolve => {
//     api.post('v1/pegawai/absensi/qr/scan', temp)
//       .then(resp => {
//         console.log(resp)
//         resolve(resp)
//       })
//   })
// }
store.getQrCode().then(data => {
  console.log(' has data ', data)
  if (data === 'has data') {
    generate()
  }
})
const generate = () => {
  if (store.newQr !== '') {
    if (store.newQr !== '\n') {
      // eslint-disable-next-line no-unused-vars
      const temp = new QRious({
        level: 'H',
        padding: 25,
        size: 500,
        element: document.getElementById('qrcode'),
        value: store.newQr
      })
      // console.log(temp)
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
  store.newQr = e.message.data.code
  user.value = e.message.user
  generate()
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
