<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="store.fixed">
      <q-card>
        <q-form
          ref="refForm"
          class="full-height"
        >
          <q-card-section>
            <div class="text-h6 text-center">
              Masukkan Kode Rekening 50 dan Jumlah Debet Kredit
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section style="max-height: 50vh" class="scroll">
            <div class="row q-mt-sm">
              <div class="col-12">
                <q-input
                  ref="refkoderek"
                  v-model="store.form.koderekening"
                  label="Kode Rekening"
                  standout="bg-yellow-3"
                  dense
                  outlined
                  disable
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                />
              </div>
            </div>
            <div class="row q-mt-sm">
              <div class="col-12">
                <q-select
                  ref="refuraian"
                  v-model="store.form.uraian"
                  label="Uraian Rekening 50"
                  outlined
                  emit-value
                  map-options
                  option-label="uraian"
                  option-value="kodeall3"
                  standout="bg-yellow-3"
                  dense
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  :options="options"
                  clearable
                  use-input
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                  @filter="filterFn"
                  @update:model-value="(val) => selected(val)"
                >
                  <template #option="scopex">
                    <q-item v-bind="scopex.itemProps">
                      <q-item-section>
                        <q-item-label class="text-weight-bold">
                          {{ scopex.opt.uraian }} <br>
                        </q-item-label>
                        <q-item-label caption class="text-italic">
                          {{ scopex.opt.kodeall3 }} <br>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                  <template #no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Data Tidak Ditemukan....
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
            </div>
            <div class="row q-mt-sm">
              <div class="col-12">
                <q-select
                  ref="refjenistransaksi"
                  v-model="store.form.jenis"
                  label="Jenis Transaksi"
                  :options="jenis"
                  dense
                  outlined
                  standout="bg-yellow-3"
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                />
              </div>
            </div>
            <div class="row q-mt-sm">
              <div class="col-12">
                <q-input
                  v-model="store.form.nominal"
                  ref="refnominal"
                  mask="##.##"
                  label="Nominal"
                  reverse-fill-mask
                  dense
                  outlined
                  input-class="text-right"
                />
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <q-btn flat label="Decline" color="primary" v-close-popup />
            <q-btn flat label="Accept" color="primary" v-close-popup />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup>
import { usejurnalumummanual } from 'src/stores/siasik/akuntansi/jurnal/umummanual'
import { onBeforeMount, ref } from 'vue'

const store = usejurnalumummanual()
const refForm = ref(null)
const refkoderek = ref(null)
const refuraian = ref(null)
const refnominal = ref(null)
const jenis = ['Debet', 'Kredit']

// const stringOptions = store.rekening50
const options = ref([store.rekening50])
// const kosong = ref([])

// eslint-disable-next-line no-unused-vars
const scope = ref()
function filterFn (val, update) {
  if (val === '') {
    update(() => {
      options.value = []
    })
    return
  }
  update(() => {
    const needle = val.toLowerCase()

    options.value = store.rekening50.filter(
      (v) => v.uraian.toLowerCase().indexOf(needle) > -1 || v.kodeall3.toLowerCase().indexOf(needle) > -1
    )
  })
}

function selected (val) {
  if (val !== null) {
    store.form.koderekening = val
  }
}

// function formatRupiah (angka, prefix) {
//   let number_string = angka.replace(/[^,\d]/g, '').toString(),
//     split = number_string.split(','),
//     sisa = split[0].length % 3,
//     rupiah = split[0].substr(0, sisa),
//     ribuan = split[0].substr(sisa).match(/\d{3}/gi)

//   if (ribuan) {
//     separator = sisa ? '.' : ''
//     rupiah += separator + ribuan.join('.')
//   }

//   rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah
//   return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '')
// }

onBeforeMount(() => {
  store.form.koderekening = ''
  store.form.uraian = ''
})
</script>
