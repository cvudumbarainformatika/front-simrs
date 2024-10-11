<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="store.fixed">
      <q-card>
        <q-form
          ref="refForm"
          class="full-height"
          @submit="onSubmit"
        >
          <q-card-section>
            <div class="text-h6 text-center text-weight-bold">
              Masukkan Kode Rekening 50 dan Jumlah Debet Kredit <br>
              <q-badge color="red" class="text-h6 text-center">
                No. Bukti:   {{ store?.form?.nobukti }}
              </q-badge>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section style="max-height: 50vh" class="scroll">
            <div class="row q-mt-sm">
              <div class="col-12">
                <q-select
                  ref="refkoderek"
                  v-model="store.form.koderekening"
                  label="Kode Rekening 50"
                  outlined
                  emit-value
                  map-options
                  option-label="kodeall3"
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
                <q-input
                  ref="refuraian"
                  v-model="store.form.uraian"
                  label="Uraian Rekening"
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
                  mask="######.##"
                  label="Nominal"
                  reverse-fill-mask
                  dense
                  outlined
                  standout="bg-yellow-3"
                  input-class="text-right"
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                />
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <q-btn
              flat label="Simpan Data" class="bg-primary" color="white" tooltip="Simpan Data"
              type="submit" :loading="store.loading"
            />
            <q-btn flat label="Keluar" class="bg-red" color="white" v-close-popup />
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
    const koderekening = store?.rekening50.find((x) => x.kodeall3 === val)
    store.form.uraian = koderekening?.uraian
  }
}

function onSubmit () {
  store.saveData().then(() => {
    refForm.value.resetValidation()
  })
}

onBeforeMount(() => {
  store.form.koderekening = ''
  store.form.uraian = ''
})
</script>
