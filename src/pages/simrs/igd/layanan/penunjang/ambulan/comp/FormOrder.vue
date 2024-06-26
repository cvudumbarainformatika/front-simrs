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
              ref="refTujuan"
              v-model="store.form.tujuan"
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
              clearable
              :rules="[
                val => !!val || 'Harus diisi'
              ]"
            />
          </div>
          <div class="col-6 q-mb-sm">
            <q-select
              v-model="store.form.pelsupir"
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
              option-label="rs2"
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
              fill-input
              hide-selected
              outlined
              standout="bg-yellow-3"
              dense
              emit-value
              map-options
              option-value="rs1"
              option-label="rs2"
              :options="options"
              label="Perawat Pendamping 2"
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
const refTujuan = ref(null)

function filterFn (val, update, abort) {
  if (val.length < 1) {
    abort()
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    // const arr = store.listDiagnosa
    const arr = store.listperawat
    const filter = ['rs2']
    // console.log('sasax', arr)
    const multiFilter = (data = [], filterKeys = [], value = '') =>
      data?.filter((item) => filterKeys.some(
        (key) =>
          item[key]?.toString()?.toLowerCase()?.includes(value?.toLowerCase()) &&
            item[key]
      )
      )
    const filteredData = multiFilter(arr, filter, needle)
    options.value = filteredData
  })
}

function saveOrder () {
  console.log('wew', refTujuan.value.validate())
  // store.saveOrder(props.pasien).then(() => {
  //   formRef.value.resetValidation()
  // })
}
onMounted(() => {
  listperawat.value = store.listperawat
  formRef.value.resetValidation()
})

</script>
