<template>
  <div>
    <DataPasien
      ref="refDataPasien"
      :full="style.componentfull"
      pelayanan="homecare"
      @ganti-pasien="clearFormRegistrasi"
      @full-screen="style.setComponentFull"
    />
    <!-- @bisa-simpan="bisaSimpan" -->
    <FormRegistrasi
      ref="refRegistrasi"
    />
    <!-- @bisa-simpan="simpanRegistrasi" -->
    <q-card
      class="full-width"
    >
      <q-card-actions align="right">
        <div class="q-mr-xl">
          <app-btn
            label="Simpan Form"
            :loading="pasien.loading"
            :disable="pasien.loading"
            @click="simpanData"
          />
        </div>
      </q-card-actions>
    </q-card>
  </div>
</template>
<script setup>
import DataPasien from 'src/pages/simrs/pendaftaran/form/pasien/DataPasien.vue'
import FormRegistrasi from './FormRegistrasi.vue'
import { ref } from 'vue'
import { usePendaftaranPasienStore } from 'src/stores/simrs/pendaftaran/form/pasien/pasien'

import { useStyledStore } from 'src/stores/app/styled'
import { useRouter } from 'vue-router'
import { useRegistrasiPasienHomeCareStore } from 'src/stores/simrs/pendaftaran/form/homecare/registrasi'
const pasien = usePendaftaranPasienStore()
const register = useRegistrasiPasienHomeCareStore()

const refDataPasien = ref(null)
const refRegistrasi = ref(null)
function clearFormRegistrasi () {
  register.clearForm()
}

const style = useStyledStore()

const router = useRouter()
function simpanData (val) {
  const dataPasien = refDataPasien.value.set()
  const dataRegis = refRegistrasi.value.set()
  console.log('pasien', dataPasien,
    'regis', dataRegis
  )
  if (dataPasien.save && dataRegis.save) {
    const keys = Object.keys(dataPasien.form)
    if (keys.length) {
      keys.forEach(key => {
        register.setForm(key, dataPasien.form[key])
      })
    }
    console.log('form registrasi ', register.form)
    register.simpanRegistrasi().then(resp => {
      console.log(resp)
      const antrian = resp.antrian.data
      const nomor = antrian ? antrian.nomor : '-'
      const poli = antrian ? antrian.nama_layanan : '-'
      const norm = antrian ? antrian.id_member : '-'
      console.log('Antrian ', antrian)
      const routeData = router.resolve({ path: '/print/antrian', query: { nomor, poli, norm } })
      window.open(routeData.href, '_blank')
      pasien.clearForm()
      register.clearForm()
      // dialogCetak()
    })
  }
  // console.log('simpan value', refDataPasien.value)
  // console.log('form pasien ', pasien.form)
}
// function dialogCetak() {
//   Dialog.create({
//     title: 'Konfirmasi.',
//     message: 'Print Karcis?',
//     persistent: true,
//     ok: {
//       push: true,
//       'no-caps': true,
//       label: 'Print',
//       color: 'green'
//     },
//     cancel: {
//       'no-caps': true,
//       push: true,
//       color: 'dark'
//     }
//   }).onOk(() => {
//     console.log('Cetak')
//   }).onCancel(() => {
//     console.log('tidak Cetak')
//   })
// }
</script>
