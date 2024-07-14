<template>
  <q-dialog>
    <app-card
      style="width: 900px; max-width: 80vw"
      title="Form Data SALDO-PPK"
      desc="Input SALDO"
    >
      <template #content>
        <q-form ref="formReff" @submit="onSubmit" @reset="onReset">
          <div class="row justify-center q-col-gutter-md q-my-xs">
            <div class="col-3">
              <div class="q-pb-xs">
                Nomor Transaksi
              </div>
              <app-input
                v-model="store.form.noregister"
                label="Notrans"
                disable
                outlined
              />
            </div>
            <div class="col-3">
              <div class="q-pb-xs">
                Tanggal Transaksi
              </div>
              <app-input-date
                :model="store.form.tanggal"
                ref="refTanggalSurat"
                icon="icon-mat-event"
                outlined
                label="Tanggal"
                @set-model="pilihTanggal"
              />
            </div>
            <div class="col-3">
              <div class="q-pb-xs">
                Tahun
              </div>
              <app-input v-model="store.form.tahun" label="Tahun" outlined />
            </div>

            <div class="col-3">
              <div class="q-pb-xs">
                Nilai SALDO
              </div>
              <app-input
                v-model="store.form.nilaisaldo"
                label="Nominal"
                outlined
              />
            </div>

            <div class="col-2">
              <div class="q-pb-xs invisible">
                .
              </div>
              <app-btn
                label="Simpan"
                :disable="store.loading"
                :loading="store.loading"
                @click="onSimpan()"
              />
            </div>
          </div>
        </q-form>
      </template>
    </app-card>
  </q-dialog>
</template>

<script setup>
import { useFormSaldo } from 'src/stores/siasik/transaksi/saldo/saldoawal/formsaldo'

import { ref } from 'vue'
const store = useFormSaldo()
const formReff = ref(null)
function onSimpan () {
  // console.log('simpan')
  store.simpanSaldo().then(() => {
    store.emptyForm()
  })
}
const pilihTanggal = (val) => {
  store.setForm('tanggal', val)
}
const onSubmit = () => {
  store.simpanSaldo().then(() => {
    if (formReff.value != null) {
      formReff.value.resetValidation()
    }
  })
}
const onReset = () => {
  formReff.value.resetValidation()
  store.setOpen()
}
</script>
