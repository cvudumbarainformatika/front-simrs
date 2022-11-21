<template>
  <q-page class="q-pa-lg">
    <div class="row ">
      <div class="col-sm-6 col-md-6 col-lg-6 bg-white ">
        <q-card
          bordered
        >
          <!-- <q-card-section> -->
          <div class="row items-center q-ml-md q-mt-lg">
            <div class="col-2" />
            <div class="col-3">
              <q-img
                src="~assets/logos/logo-rsud.png"
                height="70px"
                ratio="1"
                fit="contain"
              />
            </div>
            <div class="col-6">
              <div class="row f-14 text-weight-bold">
                UOBK RUSD Dr. MUHAMMAD SALEH
              </div>
              <div class="row f-12 text-weight-bold">
                KOTA PROBOLINGGO
              </div>
            </div>
          </div>
          <!-- </q-card-section> -->
          <q-card-section v-if="!store.newQr">
            <div>
              <app-no-data />
            </div>
          </q-card-section>
          <q-card-section
            v-if="store.newQr"
            class="q-ma-md"
          >
            <div
              class="flex flex-center"
            >
              <div class="apem">
                <div class="row">
                  <canvas id="qrcode" />
                </div>
                <div class="row bg-primary">
                  <div class="col-12 text-center text-white f-16 q-py-md">
                    Scan untuk Absen
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div
        class="col-sm-1 col-md-1 col-lg-1 bg-grey-7 text-center"
      />
      <div
        class="col-sm-4 col-md-4 col-lg-4 bg-grey-7 text-center"
      >
        <!-- <q-card
          class="q-ma-md bg-grey-7"
        > -->
        <!-- style="width: fit-content;" -->
        <!-- <q-card-section> -->
        <div
          class="q-ma-lg bg-grey-7"
          style="width: fit-content;"
        >
          <div
            :style="`background-color: ${jadwal ? jadwal.data.kategory.warna : 'grey-7'};`"
            class="f-14 text-weight-bold text-center"
          >
            <div
              :class="jadwal ? jadwal.absen === 'masuk' ? 'text-positive' : 'text-negative' : '' "
            >
              {{ user ? user.nama : 'no one scan me yet' }}
            </div>
          </div>
          <!-- </q-card-section>
          <q-card-section> -->
          <q-img
            v-if="user"
            :src="path"
            height="450px"
            ratio="1"
            fit="scale-down"
          />
          <q-img
            v-if="!user"
            :src="path"
            height="450px"
            style="min-width: 200px;"
            ratio="1"
            fit="cover"
          />
        </div>
        <!-- </q-card-section> -->
        <!-- </q-card> -->
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
const jadwal = ref(null)
const absen = ref(null)
// const mockuser = ref({ id: 1, nip: '012001141074', nip_baru: '', nik: '', nama: 'dr. BAMBANG AGUS SUWIGNYO, MMKes', alamat: 'Jalan Ir. Sutami No.48 RT.002/RW.003\r\nKelurahan Jrebeng Kidul\r\nKecamatan Wonoasih\r\nKota Probolinggo', kelamin: 'Laki-Laki', templahir: 'Probolinggo', tgllahir: '1960-07-15', jenispegawai: 'Struktural', flag: 'P01', jabatan: 'J00001', profesi: '', jabatan_tmb: '', golruang: 'G00015', pendidikan: 'P00009', aktif: 'TIDAK AKTIF', foto: 'foto-012001141074.bmp', bagian: 'B00001', ruang: '', tgl_masuk: '2010-11-19', tgl_tmt: null, id_simrs: null, kategoripegawai: 'MTX000', pass: 'sasa123', alamat_detil: 'Jalan Ir. Sutami No.48 RT.002/RW.003\r\nKelurahan Jrebeng Kidul\r\nKecamatan Wonoasih\r\nKota Probolinggo', rt: '', rw: '', kelurahan: '', kecamatan: '', kota: '', agama: '', tmt_cpns: '0000-00-00', gaji_total: '', gaji_pokok: '', kel_ttg: '', th_mk_tmb: 0, bln_mk_tmb: 0, jurusan: '', flagpas: '1', telp: null, email: null, id_absen: '', jadwalkerja: '' })
const path = computed(() => {
  const pla = user.value ? 'https://rsudmsaleh.probolinggokota.go.id/simpeg/foto/' + user.value.nip + '/' + user.value.foto : 'images/actor.svg'
  // const pla = user.value === null ? new URL('../../../../../../assets/images/actor.svg', import.meta.url).href : 'https://rsudmsaleh.probolinggokota.go.id/simpeg/foto/' + user.value.nip + '/' + user.value.foto
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
  // console.log(' has data ', data)
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
        size: 300,
        element: document.getElementById('qrcode'),
        value: store.newQr,
        background: 'blue',
        backgroundAlpha: 0.1,
        foreground: 'black',
        foregroundAlpha: 0.8
      })
      // console.log(temp)
    } else {
      notifErrVue('input value cannot has anter')
    }
  } else {
    notifErrVue('No qr to generate')
  }
  console.log('gnerate qr', user.value)
}

qrcodeChannel.subscribed(() => {
  console.log('Chanel QRCODE Page Qr')
}).listen('.qr-baru', e => {
  // console.log('string qr pageQr', e)
  if (e.message.data) { store.newQr = e.message.data.code }
  if (e.message.user) { user.value = e.message.user }
  if (e.message.jadwal) {
    jadwal.value = e.message.jadwal
    absen.value = 'ada'
    console.log(e.message.jadwal)
  }
  if (e.message.message) {
    absen.value = 'tidak ada'
    console.log(e.message.message)
  }
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
<style lang="scss" scoped>
.apem{
    border-radius: 10px 10px 10px 10px;
    border: 7px solid $primary;
    }
</style>
