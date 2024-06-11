<template>
  <div class="column full-height">
    <q-bar class="col-auto bg-dark text-white">
      <div class="q-py-sm f-14 ">
        Form Permintaan Ambulan
      </div>
    </q-bar>
    <div class="col full-height">
      <q-scroll-area style="height: calc(100% - 1px);">
        <q-form
          ref="formRef"
          class="row q-pa-md q-col-gutter-xs"
          @submit="saveOrder"
        >
          <div class="col-12 q-mb-sm">
            <q-select
              v-model="store.form.tujuan"
              hide-selected
              fill-input
              outlined
              standout="bg-yellow-3"
              dense
              emit-value
              map-options
              option-value="rs1"
              option-label="rs2"
              :options="props.tujuanambulan"
              label="Pilih Tujuan"
            />
          </div>
          <div class="col-6 q-mb-sm">
            <q-select
              v-model="store.form.pelsupir"
              hide-selected
              fill-input
              outlined
              standout="bg-yellow-3"
              dense
              :options="pelsupir"
              label="Pelayanan Supir"
            />
          </div>
          <div class="col-6 q-mb-sm">
            <q-select
              v-model="store.form.pelperawat"
              hide-selected
              fill-input
              outlined
              standout="bg-yellow-3"
              dense
              emit-value
              map-options
              :options="pelperawat"
              label="Pelayanan Perawat"
            />
          </div>
          <div class="col-6 q-mb-sm">
            <q-select
              v-model="store.form.perawatpendamping1"
              use-input
              hide-selected
              fill-input
              outlined
              standout="bg-yellow-3"
              dense
              emit-value
              map-options
              option-value="rs1"
              :option-label="opt => Object(opt) === opt && 'rs2' in opt ? opt.kode +' ~ '+ opt.keterangan : ' Perawat Pedamping 1 '"
              input-debounce="0"
              :options="options"
              label="Perawat Pedamping 1"
              @filter="filterFn"
            >
              <template #no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    Tidak ditemukan
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col-6 q-mb-sm">
            <q-select
              v-model="store.form.perawatpendamping2"
              use-input
              hide-selected
              fill-input
              outlined
              standout="bg-yellow-3"
              dense
              emit-value
              map-options
              option-value="rs1"
              option-label="rs2"
              :options="pelsupir"
              label="Perawat Pendamping 2"
              @filter="filterFn"
            >
              <template #option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <q-item-label>
                      KODE REKENING : {{ scope.rs2 }} <br>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col-12">
            <q-input
              v-model="store.form.permintaan"
              label="Keterangan"
              autogrow
              outlined
              standout="bg-yellow-3"
              icon="icon-mat-search"
              hide-bottom-space
            />
          </div>
          <div class="col-12">
            <q-separator class="q-my-sm" />
          </div>
          <div class="col-12">
            <div class="text-right">
              <q-btn
                label="Simpan & Kirim Permintaan"
                type="submit"
                color="primary"
                :loading="store.loadingOrder"
                :disable="store.loadingOrder"
              />
            </div>
          </div>
        </q-form>
      </q-scroll-area>
    </div>
  </div>
</template>

<script setup>
import { useAmbulanStore } from 'src/stores/simrs/igd/ambulan'
import { onMounted, ref } from 'vue'

const store = useAmbulanStore()
const formRef = ref()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  tujuanambulan: {
    type: Array,
    default: () => []
  },
  perawat: {
    type: Array,
    default: () => []
  }
})

// eslint-disable-next-line no-unused-vars
const options = ref([])
const listperawat = ref([])
const pelsupir = ref(['Rujukan', 'Jenazah', 'Emergency'])
const pelperawat = ref(['Rujukan', 'Emergency', 'Privat'])

// function filterFn(val, update, abort) {
//   if (val.length < 1) {
//     abort()
//     return
//   }

//   update(() => {
//     const needle = val.toLowerCase()
//     // const arr = store.listDiagnosa
//     const arr = listperawat.value
//     console.log('sasa', arr)
//     const filter = ['rs2']
//     const multiFilter = (data = [], filterKeys = [], value = '') =>
//       data.filter((item) => filterKeys.some(
//         (key) =>
//           item[key].toString().toLowerCase().includes(value.toLowerCase()) &&
//             item[key]
//       )
//       )
//     const filteredData = multiFilter(arr, filter, needle)
//     options.value = filteredData
//   })
// }

function saveOrder () {
  store.saveOrder(props.pasien).then(() => {
    formRef.value.resetValidation()
  })
}
onMounted(() => {
  listperawat.value = store.listperawat
  formRef.value.resetValidation()
})
</script>
