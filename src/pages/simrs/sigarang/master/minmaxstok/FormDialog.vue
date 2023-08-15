<template>
  <q-dialog>
    <app-card
      class="my-card"
      title="Form Minimun dan Maksimum Stok"
      desc="Input data Minimun dan Maksimum Stok User atau Depo"
    >
      <template #content>
        <q-form
          ref="formReff"
          @submit="onSubmit"
          @reset="onReset"
        >
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-md-4 col-xs-12">
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
            <div class="col-md-4 col-xs-12">
              <app-autocomplete-new
                ref="refKodePengguna"
                label="Pengguna Ruangan"
                :model="store.form.kode_pengguna"
                option-value="kode"
                option-label="jabatan"
                autocomplete="jabatan"
                :valid="(store.form.kode_gudang!==null)"
                :source="store.penggunas"
                :loading="store.loading"
                :readonly="(store.form.kode_gudang!==null)"
                @on-select="penggunaSelected"
                @clear="penggunaCleared"
              />
            </div>
            <div class="col-md-4 col-xs-12">
              <app-autocomplete-new
                ref="refKodeGudang"
                label="Depo"
                :model="store.form.kode_gudang"
                option-value="kode"
                option-label="nama"
                autocomplete="nama"
                :valid="(store.form.kode_pengguna!==null)"
                :source="store.gudangs"
                :loading="store.loading"
                :readonly="(store.form.kode_pengguna!==null)"
                @on-select="gudangSelected"
                @clear="gudangCleared"
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
import { ref } from 'vue'
const store = useMinMaxStokForm()
const formReff = ref(null)
const refKodeRs = ref(null)
const refKodePengguna = ref(null)
const refKodeGudang = ref(null)

const barangSelected = (val) => {
  store.form.kode_rs = val
}
const barangCleared = () => {
  store.form.kode_rs = null
  refKodeRs.value.$refs.refAuto.resetValidation()
}

const penggunaSelected = (val) => {
  refKodeGudang.value.$refs.refAuto.resetValidation()
  store.form.kode_pengguna = val
}
const penggunaCleared = () => {
  store.form.kode_pengguna = null
  refKodePengguna.value.$refs.refAuto.resetValidation()
}

const gudangSelected = (val) => {
  refKodePengguna.value.$refs.refAuto.resetValidation()
  store.form.kode_gudang = val
}
const gudangCleared = () => {
  store.form.kode_gudang = null
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
