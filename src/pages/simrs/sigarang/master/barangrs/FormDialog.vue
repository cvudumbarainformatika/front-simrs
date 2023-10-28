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
              <!-- :rules="[ val => val.length <= 5 || 'Maksimal 5 karakter']" -->
              <q-input
                v-model="store.input_kode"
                dense
                label="Input Kode*"
                outlined
                autofocus
                :loading="store.loadingCount"
                :disable="store.edited"
                @update:model-value="store.setKode"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-mt-sm">
            <div class="col-md-6 col-xs-12">
              <app-input
                ref="refNama"
                v-model="store.form.nama"
                label="Nama*"
                :disable="store.edited"
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
              <app-autocomplete-debounce-input
                ref="ref108"
                v-model="store.form.kode_108"
                outlined
                label="Uraian 108"
                autocomplete="uraian"
                option-value="kode"
                option-label="uraian"
                :source="store.barang108s"
                :loading="store.loading108"
                @buang="get108"
                @on-select="selected108"
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <!-- Maping Depo -->
              <app-autocomplete-new
                ref="refDepo"
                v-model="store.form.kode_depo"
                outlined
                label="Depo"
                autocomplete="nama"
                option-value="kode"
                option-label="nama"
                :source="store.depos"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-mt-sm">
            <div class="col-md-2 col-xs-12">
              Uraian 50 :
            </div>
            <div class="col-md-10 col-xs-12">
              <!-- Maping rekening 50 -->
              {{ store.form.uraian_50 }}
              <!-- <app-autocomplete-debounce-input
                ref="ref50"
                v-model="store.form.kode_50"
                outlined
                label="Uraian 50"
                autocomplete="uraian"
                option-value="kode"
                option-label="uraian"
                :source="store.rekening50s"
                :loading="store.loading50"
                @buang="get50"
              /> -->
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
// import { useTransaksiPemensananForm } from 'src/stores/simrs/logistik/sigarang/transaksi/pemesanan/form'
import { ref } from 'vue'
const store = useMasterBarangRSForm()
const mapingbarang = useMasterMapingBarangForm()
// const pemesanan = useTransaksiPemensananForm()
// const form108 = useMasterBarang108Form()
const formReff = ref(null)
const refNama = ref(null)
const refKodeSatuan = ref(null)
const ref108 = ref(null)
const refDepo = ref(null)

function get108(val) {
  console.log('108', val)
  store.autocompleteParams.q = val
  store.loading108 = true
  store.getData108s()
}
// function get50(val) {
//   console.log('50', val)
//   store.autocompleteParam50s.q = val
//   store.getRekening50()
// }
function selected108(val) {
  console.log(val)
  const temp = store.barang108s.filter(a => a.kode === val)
  if (temp.length) {
    console.log(temp[0])
    store.setForm('uraian_108', temp[0].uraian)
    store.setForm('kode_50', temp[0]?.maping?.kode50)
    store.setForm('uraian_50', temp[0]?.maping?.uraian50)
  }
}
const onSubmit = () => {
  // let nama=false
// isi uraian 108
  // const ur108 = store.barang108s.filter(data => {
  //   return data.kode === store.form.kode_108
  // })
  // if (ur108.length) {
  //   store.setForm('uraian_108', ur108[0].uraian)
  // }
  // isi uraian 50
  // const ur50 = store.rekening50s.filter(data => {
  //   return data.kode === store.form.kode_50
  // })
  // if (ur50.length) {
  //   store.setForm('uraian_50', ur50[0].uraian)
  // }

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
  // console.log(refNama.value.$refs.refInput)
  refNama.value.$refs.refInput.validate()
  refKodeSatuan.value.$refs.refAuto.validate()
  ref108.value.$refs.refAuto.validate()
  refDepo.value.$refs.refAuto.validate()
  // .then(apem => {
  //   console.log('depo', apem)
  // })
  console.log('sebelum simpan', store.form)
  store.saveForm().then(() => {
    // console.log('form', formReff)
    if (formReff.value != null) { formReff.value.resetValidation() }
  })
}
const onReset = () => {
  formReff.value.resetValidation()
  store.setOpen()
}
store.getInitialData()
</script>
