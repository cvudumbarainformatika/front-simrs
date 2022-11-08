<template>
  <q-dialog>
    <app-card
      class="my-card"
      title="Form Beban"
      desc="Input data Beban"
    >
      <template #content>
        <q-form
          ref="formReff"
          @submit="onSubmit"
          @reset="onReset"
        >
          <div class="row q-col-gutter-md">
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.nama"
                label="Nama Hari Libur"
                valid
                outlined
                autofocus
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input-date
                v-model="store.form.tgl_libur"
                label="Tanggal Libur"
                outlined
                @set-model="store.setTanggal"
              />
            </div>
          </div>
          <q-separator class="q-my-md" />
          <div class="text-right">
            <app-btn
              type="reset"
              color="dark"
              label="Cancel"
              class="q-mr-md"
            />
            <app-btn
              label="Simpan"
              :loading="store.loading"
            />
          </div>
        </q-form>
      </template>
    </app-card>
  </q-dialog>
</template>

<script setup>
import { date } from 'quasar'
import { UseProtaAbsensiLiburStore } from 'src/stores/simrs/pegawai/absensi/prota/prota'
import { ref } from 'vue'
const store = UseProtaAbsensiLiburStore()
const formReff = ref(null)
const onSubmit = () => {
  console.log('tanggal', date.formatDate(store.tanggal, 'YYYY'))
  const tahunIni = date.formatDate(store.form.tgl_libur, 'YYYY')
  const adaTahun = store.tahuns.filter(data => {
    return data === tahunIni
  })
  /// cek tahun buat bikin keputusan ambil data tahun yang baru apa tidak
  store.saveProta().then(() => {
    if (formReff.value != null) { formReff.value.resetValidation() }
    if (!adaTahun.length) {
      store.tahuns.push(adaTahun[0])
      store.tahuns.sort()
      store.getTahunProta()
    }
    store.setOpen()
  }).catch(() => {
    store.setOpen()
  })
}
const onReset = () => {
  formReff.value.resetValidation()
  store.setOpen()
}
</script>
