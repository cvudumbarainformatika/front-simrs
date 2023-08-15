<template>
  <q-dialog>
    <app-card
      class="my-card"
      title="Form Mapping Barang RS"
      desc="Maping Barang Rumah Sakit ke 108"
      style="min-width: 800px;"
    >
      <template #content>
        <q-form
          ref="formReff"
          @submit="onSubmit"
          @reset="onReset"
        >
          <div class="row q-col-gutter-md">
            <div class="col-md-4 col-xs-12">
              <app-autocomplete-new
                v-model="store.form.kode_rs"
                outlined
                label="Barang RS"
                autocomplete="nama"
                option-value="kode"
                :option-label="['nama','kode']"
                :source="store.barangrses"
              />
              <!-- <SelectMenu title="Barang RS" optionLabel="nama" url="v1/barangrs/barangrs" @on-select="pilihBarangRS" /> -->
            </div>
            <div class="col-md-4 col-xs-12">
              <app-autocomplete-new
                v-model="store.form.kode_108"
                outlined
                label="Barang 108"
                autocomplete="uraian"
                option-value="kode"
                :option-label="['uraian', 'kode']"
                :source="store.barang108s"
              />
              <!-- <SelectMenu title="Barang 108" optionLabel="uraian" url="v1/barang108/barang108"
                @on-select="pilihBarang108" /> -->
            </div>
            <div class="col-md-4 col-xs-12">
              <app-autocomplete-new
                v-model="store.form.kode_satuan"
                outlined
                label="Satuan"
                autocomplete="nama"
                option-value="kode"
                option-label="nama"
                :source="store.satuans"
              />
              <!-- <SelectMenu title="Satuan" optionLabel="nama" url="v1/satuan/satuan" @on-select="pilihSatuan" /> -->
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
import { useMasterMapingBarangForm } from 'src/stores/simrs/logistik/sigarang/master/mapingbarang/form'
import { ref } from 'vue'
// import SelectMenu from './SelectMenu.vue'
const store = useMasterMapingBarangForm()
const formReff = ref(null)

// const pilihBarangRS = val => {
//   store.form.kode_rs = val.kode
// }
// const pilihBarang108 = val => {
//   store.form.kode_108 = val.kode
// }
// const pilihSatuan = val => {
//   store.form.kode_satuan = val.kode
// }

const onSubmit = () => {
  store.saveForm().then(() => {
    // console.log('form', formReff)
    if (formReff.value != null) { formReff.value.resetValidation() }
  })
}
const onReset = () => {
  formReff.value.resetValidation()
  store.setOpen()
}
</script>
