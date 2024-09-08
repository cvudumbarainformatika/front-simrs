<template>
  <q-dialog>
    <app-card
      class="my-card"
      title="Form Volume Sediaan"
      desc="Input data Volume Sediaan"
    >
      <template #content>
        <q-form
          ref="formReff"
          @submit="onSubmit"
          @reset="onReset"
        >
          <div class="row q-col-gutter-md q-mb-sm">
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.signa"
                valid
                label="Signa"
                outlined
                autofocus
                @blur="signaBlur(store.form.signa)"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md  q-mb-sm">
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.jumlah"
                valid
                label="Jumlah konsumsi per hari"
                outlined
                autofocus
                @update:model-value="setJumlah($event,'jumlah')"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md" />
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
import { notifErrVue } from 'src/modules/utils'
import { useMasterSignaForm } from 'src/stores/simrs/master/farmasi/signa/form'
import { ref } from 'vue'
const store = useMasterSignaForm()
const formReff = ref(null)

function signaBlur (val) {
  const data = val.toString()

  let signa = ''
  if (data.includes('x')) signa = data.split('x')

  if (data.includes('X')) signa = data.split('X')
  if (signa?.length) {
    const temp = []
    signa.forEach(si => {
      const num = si.toString().split(' ')
      const val = num.filter(m => m !== '')
      if (val.length > 1) si = val.join(' ')
      else si = val.toString().replace(/\s+/g, '')
      temp.push(si)
      console.log('num', si, val, num)
    })
    console.log('signa blur', signa, temp)
    store.setForm('signa', temp.join(' X '))
  }
}

function setJumlah (evt, key) {
  const inc = evt.includes('.')
  const ind = evt.indexOf('.')
  const panj = evt.length
  const nilai = isNaN(parseFloat(evt)) ? 0 : (inc && (ind === (panj - 1)) ? evt : parseFloat(evt))
  store.setForm(key, nilai)
}

const onSubmit = () => {
  if (isNaN(parseFloat(store.form.jumlah)) || parseFloat(store.form.jumlah) <= 0) return notifErrVue('Jumlah harus lebih besar dari 0')
  store.saveForm().then(() => {
    if (formReff.value != null) { formReff.value.resetValidation() }
  })
}
const onReset = () => {
  formReff.value.resetValidation()
  store.setOpen()
}
</script>
