<template>
  <q-dialog>
    <app-card
      class="my-card"
      title="Form Minimun dan Maksimum Stok"
      desc="Input data Minimun dan Maksimum Stok Pengguna"
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
                label="pengguna"
                :model="store.form.kode_pengguna"
                option-value="kode"
                option-label="jabatan"
                autocomplete="jabatan"
                :source="frontStore.penggunas"
                :loading="store.loading"
                @on-select="penggunaSelected"
                @clear="penggunaCleared"
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
                :source="barangs"
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
import { useMinMaxStokForm } from 'src/stores/simrs/logistik/sigarang/master/minmaxstok/form'
import { useMinMaxPenggunaStockStore } from 'src/stores/simrs/logistik/sigarang/master/minmaxstok/pengguna/pengguna'
import { ref } from 'vue'
const store = useMinMaxPenggunaStockStore()
const frontStore = useMinMaxStokForm()
const formReff = ref(null)
const refKodeRs = ref(null)
const refKodeGudang = ref(null)
const barangs = ref([])

const barangSelected = (val) => {
  store.form.kode_rs = val
}
const barangCleared = () => {
  store.form.kode_rs = null
  refKodeRs.value.$refs.refAuto.resetValidation()
}

const penggunaSelected = (val) => {
  store.form.kode_pengguna = val
  barangs.value = frontStore.barangs
}
const penggunaCleared = () => {
  store.form.kode_pengguna = null
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
</script>
