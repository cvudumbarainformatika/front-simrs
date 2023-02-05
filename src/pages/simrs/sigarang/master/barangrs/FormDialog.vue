<template>
  <q-dialog>
    <app-card
      class="my-card"
      title="Form Barang RS"
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
                v-model="store.form.kode"
                label="Kode*"
                outlined
                readonly
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <q-input
                v-model="store.input_kode"
                dense
                label="Input Kode*"
                :rules="[ val => val.length <= 5 || 'Maksimal 5 karakter']"
                outlined
                autofocus
                @update:model-value="store.setKode"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-md-6 col-xs-12">
              <app-input
                ref="refNama"
                v-model="store.form.nama"
                label="Nama*"
                outlined
                autofocus
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-autocomplete-new
                ref="refKodeSatuan"
                v-model="store.form.kode_satuan"
                outlined
                label="Satuan"
                autocomplete="nama"
                option-value="kode"
                option-label="nama"
                :source="store.satuans"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-mt-sm">
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.pengali"
                label="pengali*"
                outlined
                type="number"
                autofocus
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-autocomplete-new
                v-model="store.form.kode_satuan_kecil"
                outlined
                label="Satuan Kecil"
                autocomplete="nama"
                option-value="kode"
                option-label="nama"
                valid
                :source="store.satuans"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-mt-sm">
            <div class="col-md-6 col-xs-12">
              <app-autocomplete-new
                v-model="store.form.ssh"
                outlined
                label="SSH / Non-SSH"
                autocomplete="nama"
                option-value="value"
                option-label="nama"
                :source="store.sshOption"
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-autocomplete-new
                v-model="store.form.tipe"
                outlined
                label="Tipe"
                autocomplete="nama"
                option-value="value"
                option-label="nama"
                :source="store.tipeOption"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-mt-sm">
            <div class="col-md-6 col-xs-12">
              <!-- maping 108 -->
              <app-autocomplete-new
                ref="ref108"
                v-model="store.form.kode_108"
                outlined
                label="Uraian 108"
                autocomplete="uraian"
                option-value="kode"
                option-label="uraian"
                :source="store.barang108s"
              />
              <!-- <div class="row items-center">
                  style="width:80%"
                <q-btn
                  class="q-ml-sm"
                  unelevated
                  round
                  color="primary"
                  size="sm"
                  icon="icon-mat-add"
                  @click="form108.setOpen()"
                >
                  <q-tooltip
                    class="primary"
                    :offset="[10, 10]"
                  >
                    Tambah data 108
                  </q-tooltip>
                </q-btn>
              </div> -->
            </div>
            <div class="col-md-6 col-xs-12">
              <!-- Maping Depo -->
              <app-autocomplete-new
                ref="refDepo"
                v-model="store.form.kode_gudang"
                outlined
                label="Depo"
                autocomplete="nama"
                option-value="kode"
                option-label="nama"
                :source="store.depos"
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
// import { useMasterBarang108Form } from 'src/stores/simrs/logistik/sigarang/master/barang108/form'
import { Dialog } from 'quasar'
import { useMasterBarangRSForm } from 'src/stores/simrs/logistik/sigarang/master/barangrs/form'
import { useMasterMapingBarangForm } from 'src/stores/simrs/logistik/sigarang/master/mapingbarang/form'
import { ref } from 'vue'
const store = useMasterBarangRSForm()
const mapingbarang = useMasterMapingBarangForm()
// const form108 = useMasterBarang108Form()
const formReff = ref(null)
const refNama = ref(null)
const refKodeSatuan = ref(null)
const ref108 = ref(null)
const refDepo = ref(null)
const onSubmit = () => {
  // let nama=false
  const ada = mapingbarang.barangrses.filter(val => { return val.kode === store.form.kode })
  if (ada.length && !store.edited) {
    Dialog.create({
      title: 'Konfirmasi',
      message: 'Kode barang sudah ada, jika dilanjutkan maka barang akan di update',
      ok: {
        flat: true,
        'no-caps': true,
        color: 'primary'
      },
      cancel: {
        flat: true,
        color: 'dark'
      }
    }).onOk(() => {
      simpan()
    })
  } else {
    simpan()
  }
}
const simpan = () => {
  console.log(refNama.value.$refs.refInput)
  refNama.value.$refs.refInput.validate()
  refKodeSatuan.value.$refs.refAuto.validate()
  ref108.value.$refs.refAuto.validate()
  refDepo.value.$refs.refAuto.validate()
  // .then(apem => {
  //   console.log('depo', apem)
  // })
  // console.log('sebelum simpan')
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
