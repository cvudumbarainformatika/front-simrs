<script setup>
import { useTindakanRanapStore } from 'src/stores/simrs/ranap/tindakan'
import { defineAsyncComponent, onMounted, ref } from 'vue'

const AutocompleteNakesMulti = defineAsyncComponent(() => import('./AutocompleteNakesMulti.vue')) // lazy-loaded

const store = useTindakanRanapStore()
// eslint-disable-next-line no-unused-vars
const { formtindakan, listTindakan, listPetugas, setKdTindakan } = store

const options = ref([])

const formmRef = ref(null)
const inpQtyRef = ref(null)

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  kasus: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  console.log('pasien', props.pasien)
  options.value = filterArrayTindakan(listTindakan, props.pasien)
})

const filterArrayTindakan = (arr, pasien) => {
  let val = arr
  if (pasien?.kodepoli === 'POL041') val = arr
  else val = arr?.filter(x => x.kdpoli?.includes(pasien?.kdgroup_ruangan))
  // console.log('onMounted formTindakan', val)
  return val
}

const onSubmit = () => {
  // console.log('formtindakan', props.pasien)
  store.saveTindakan(props.pasien)
}

function updateSearchTindakan (val) {
  setKdTindakan(val).then(() => {
    inpQtyRef.value.focus()
  })
}

function filterFn (val, update, abort) {
  if (val.length < 1) {
    abort()
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    const arr = props.pasien.kodepoli === 'POL041' ? listTindakan : listTindakan?.filter(x => x?.kdpoli?.includes(props.pasien?.kdgroup_ruangan))
    // console.log('arr', arr)
    const filter = ['kdtindakan', 'tindakan', 'icd9']
    const multiFilter = (data = [], filterKeys = [], value = '') =>
      data.filter((item) => filterKeys.some(
        (key) =>
          item[key]?.toString()?.toLowerCase()?.includes(value.toLowerCase()) &&
          item[key]
      )
      )
    const filteredData = multiFilter(arr, filter, needle)
    options.value = filteredData
  })
}

</script>

<template>
  <div class="fit column">
    <div class="col full-height scroll">
      <q-card flat>
        <q-form
          ref="formmRef"
          class=""
          @submit="onSubmit"
        >
          <q-card-section class="row q-pa-lg q-col-gutter-sm">
            <div class="col-12 q-mb-sm">
              <q-select
                v-model="store.searchtindakan"
                use-input
                hide-selected
                fill-input
                outlined
                standout="bg-yellow-3"
                dense
                emit-value
                map-options
                option-value="kdtindakan"
                :option-label="opt => Object(opt) === opt && 'tindakan' in opt ? opt.kdtindakan + ' ~ ' + opt.tindakan + ' --ICDCODE-- ' + opt.icd9 : ' Cari Tindakan '"
                input-debounce="0"
                :options="options"
                label="Cari Tindakan"
                @filter="filterFn"
                @update:model-value="(val)=> updateSearchTindakan(val)"
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
                v-model="formtindakan.tindakan"
                label="Tindakan (Otomatis)"
                dense
                outlined
                standout="bg-yellow-3"
                :rules="[val => !!val || 'Harus diisi']"
                hide-bottom-space
                readonly
              />
            </div>

            <div class="col-9">
              <q-input
                v-model="formtindakan.tarif"
                label="Biaya (Otomatis)"
                dense
                outlined
                standout="bg-yellow-3"
                :rules="[val => !!val || 'Harus diisi']"
                hide-bottom-space
                readonly
              />
            </div>
            <div class="col-3">
              <q-input
                ref="inpQtyRef"
                v-model="formtindakan.jmltindakan"
                label="Qty"
                dense
                outlined
                standout="bg-yellow-3"
                :rules="[val => !!val || 'Harus diisi',
                         val => !isNaN(val) || 'Harus pakai Nomor',
                ]"
                hide-bottom-space
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="formtindakan.keterangan"
                label="Keterangan"
                autogrow
                outlined
                standout="bg-yellow-3"
                hide-bottom-space
              />
            </div>
            <div class="col-12">
              <q-separator />
            </div>

            <AutocompleteNakesMulti
              label="Pelaksana Satu"
              placeholder="Pelaksana Satu"
              class="col-12"
              autocomplete="nama"
              option-value="kdpegsimrs"
              option-label="nama"
              map-options
              emit-value
              use-chips
              :model="formtindakan.pelaksanaSatu"
              :source="listPetugas"
              @update:model-value="(val)=> {
                // console.log('update model', val);
                formtindakan.pelaksanaSatu = val
              }"

              :rules="[val => !!val?.length || 'Harap diisi']"
            />
            <AutocompleteNakesMulti
              label="Pelaksana Dua"
              placeholder="Pelaksana Dua"
              class="col-12"
              autocomplete="nama"
              option-value="kdpegsimrs"
              option-label="nama"
              map-options
              emit-value
              use-chips
              :model="formtindakan.pelaksanaDua"
              :source="listPetugas"
              @update:model-value="(val)=> {
                // console.log('update model', val);
                formtindakan.pelaksanaDua = val
              }"
            />
          </q-card-section>
          <q-separator />
          <q-card-section align="right">
            <!-- <div class="col-12 text-right"> -->
            <q-btn
              label="Simpan Tindakan"
              color="primary"
              type="submit"
              :loading="store.loadingFormTindakan"
              :disable="store.loadingFormTindakan"
            />
          <!-- </div> -->
          </q-card-section>
        </q-form>
      </q-card>
    </div>
  </div>
</template>
