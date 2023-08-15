<template>
  <q-dialog>
    <app-card
      class="my-card"
      title="Form Minimun dan Maksimum Stok"
      desc="Input data Minimun dan Maksimum Stok Depo"
    >
      <template #content>
        <q-form
          ref="formReff"
          @submit="onSubmit"
          @reset="onReset"
        >
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-md-6 col-xs-12">
              <app-autocomplete-new
                ref="refKodeGudang"
                label="Depo"
                :model="store.form.kode_depo"
                option-value="kode"
                option-label="nama"
                autocomplete="nama"
                :source="store.gudangs"
                :loading="store.loading"
                @on-select="depoSelected"
                @clear="depoCleared"
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-autocomplete-new
                ref="refKodeRs"
                label="Barang RS"
                :model="store.form.kode_rs"
                option-value="kode"
                option-label="nama"
                autocomplete="nama"
                :source="store.barangs"
                :loading="store.loading"
                @on-select="barangSelected"
                @clear="barangCleared"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-mb-sm">
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.min_stok"
                valid
                label="Min Stok"
                type="number"
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.max_stok"
                label="Max Stok"
                type="number"
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
import { useMinMaxDepoStockStore } from 'src/stores/simrs/logistik/sigarang/master/minmaxstok/depo/depo'
import { onMounted, ref } from 'vue'
const store = useMinMaxDepoStockStore()
const formReff = ref(null)
const refKodeRs = ref(null)
const refKodeGudang = ref(null)

const barangSelected = (val) => {
  store.form.kode_rs = val
}
const barangCleared = () => {
  store.form.kode_rs = null
  refKodeRs.value.$refs.refAuto.resetValidation()
}

const depoSelected = (val) => {
  store.form.kode_depo = val
}
const depoCleared = () => {
  store.form.kode_depo = null
  refKodeGudang.value.$refs.refAuto.resetValidation()
}

const onSubmit = () => {
  store.saveForm().then(() => {
    if (formReff.value != null) { formReff.value.resetValidation() }
  })
}
const onReset = () => {
  formReff.value.resetValidation()
  store.setOpen()
}
onMounted(() => {
  console.log('buka cuy')
})
</script>
