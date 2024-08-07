<template>
  <div>
    <DataPasien
      ref="refDataPasien"
      :tglsep="register.paramDpjp.tglsep"
      :full="style.componentfull"
      :pelayanan="pelayanan"
      @ganti-pasien="clearFormRegistrasi"
      @full-screen="style.setComponentFull"
    />
    <!-- @bisa-simpan="bisaSimpan" -->
    <FormRegistrasi
      ref="refRegistrasi"
      :pelayanan="pelayanan"
    />
    <!-- @bisa-simpan="simpanRegistrasi" -->
    <q-card
      class="full-width q-pb-xl"
      flat
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
  <gelang-pasien-page
    v-model="cetakdialog"
    :patien="patien"
  />
</template>
<script setup>
import DataPasien from 'src/pages/simrs/pendaftaran/form/pasien/DataPasien.vue'
import FormRegistrasi from './FormRegistrasi.vue'
import { ref } from 'vue'
import { usePendaftaranPasienStore } from 'src/stores/simrs/pendaftaran/form/pasien/pasien'
import { useRegistrasiPasienIgdStore } from 'src/stores/simrs/pendaftaran/form/igd/registrasi'
import { Dialog } from 'quasar'
import { useStyledStore } from 'src/stores/app/styled'
import GelangPasienPage from '../../cetak/GelangPasienPage.vue'

const cetakdialog = ref(false)
const pasien = usePendaftaranPasienStore()
const register = useRegistrasiPasienIgdStore()
const pelayanan = 'igd'

const refDataPasien = ref(null)
const refRegistrasi = ref(null)
function clearFormRegistrasi () {
  register.clearForm()
  refDataPasien.value.clearForm()
}

const style = useStyledStore()
function simpanData (val) {
  const dataPasien = refDataPasien.value.set()
  const dataRegis = refRegistrasi.value.set()
  console.log(
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
      cetakgelang(dataPasien.form)
      clearFormRegistrasi()
      console.log('sasasa', refDataPasien)
      // cetakgelang(dataPasien.form)
    })
  }
  // console.log('simpan value', refDataPasien.value)
  // console.log('form pasien ', pasien.form)
}

function cetakgelang (val) {
  patien.value = val
  cetakdialog.value = true
}
const patien = ref(null)

// function cetakgelang(val) {
//   patien.value = val
//   console.log('wewx', val)
//   cetakdialog.value = true
// }
// function dialogCetak() {
//   Dialog.create({
//     title: 'Konfirmasi.',
//     message: pasien.form.norm,
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
//     cetakidentitas()
//   }).onCancel(() => {
//     console.log('tidak Cetak')
//   })
// }

// eslint-disable-next-line no-unused-vars
function cetakidentitas () {
  console.log('form registrasi', pasien.form)
  Dialog.value = false
}

</script>
