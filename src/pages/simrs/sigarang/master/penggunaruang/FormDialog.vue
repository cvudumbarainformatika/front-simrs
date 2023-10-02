<template>
  <q-dialog>
    <app-card
      title="Form Pengguna Gedung"
      desc="Mapping Pengguna Ruangan"
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
              <app-autocomplete
                v-model="store.form.kode_ruang"
                outlined
                label="Ruangan"
                autocomplete="uraian"
                option-value="kode"
                option-label="uraian"
                :source="store.ruangs"
              />
              <!-- <SelectMenu title="Ruang" optionLabel="uraian" url="v1/ruang/index" @on-select="pilihRuang" /> -->
            </div>
            <div class="col-md-4 col-xs-12">
              <app-autocomplete
                v-model="store.form.kode_penanggungjawab"
                outlined
                label="Penanggung Jawab"
                autocomplete="jabatan"
                option-value="kode"
                option-label="jabatan"
                :source="store.penggunas"
              />
              <!-- <SelectMenu title="Penanggung Jawab" optionLabel="jabatan" url="v1/pengguna/index"
                @on-select="pilihPenanggungjawab" /> -->
            </div>
            <div class="col-md-4 col-xs-12">
              <app-autocomplete
                v-model="store.form.kode_pengguna"
                outlined
                label="Pengguna"
                autocomplete="jabatan"
                option-value="kode"
                option-label="jabatan"
                :source="store.penggunas"
              />
              <!-- <SelectMenu title="Pengguna" optionLabel="jabatan" url="v1/pengguna/index" @on-select="pilihPengguna" /> -->
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
import { useMasterPenggunaRuangForm } from 'src/stores/simrs/logistik/sigarang/master/penggunaruang/form'
import { ref } from 'vue'
// import SelectMenu from './SelectMenu.vue'
const store = useMasterPenggunaRuangForm()
const formReff = ref(null)
// const pilihRuang = val => {
//   store.form.ruang_id = val.id
//   console.log(val.id)
// }
// const pilihPengguna = val => {
//   store.form.pengguna_id = val.id
//   console.log(val.id)
// }
// const pilihPenanggungjawab = val => {
//   store.form.penanggungjawab_id = val.id
//   console.log(val.id)
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
