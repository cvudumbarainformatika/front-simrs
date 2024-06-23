<template>
  <div class="q-pa-md text-weight-bold">
    FORM Tindakan
    <!-- <div class="f-10 text-weight-light">
      <em>form Tindakan sekaligus pensimulasian INACBG </em>
    </div> -->
  </div>
  <q-separator />
  <q-scroll-area style="height: calc(100% - 50px);">
    <q-form
      ref="formmRef"
      class="row q-pa-md q-col-gutter-sm"
      @submit="onSubmit"
    >
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
          :option-label="opt => Object(opt) === opt && 'tindakan' in opt ? opt.kdtindakan + ' ~ ' + opt.tindakan + ' --> ' + opt.icd9 : ' Cari Tindakan '"
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
          v-model="store.formtindakan.tindakan"
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
          v-model="store.formtindakan.tarif"
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
          v-model="store.formtindakan.jmltindakan"
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
          v-model="store.formtindakan.keterangan"
          label="Keterangan"
          autogrow
          outlined
          standout="bg-yellow-3"
          hide-bottom-space
        />
      </div>
      <div class="col-12">
        <q-separator class="q-my-md" />
      </div>
      <!-- <div
        v-if="store.searchtindakan==='T00204'"
        class="col-12"
      >
        {{ store.searchtindakan }}
      </div> -->
      <div class="col-12 text-right">
        <q-btn
          label="Simpan Tindakan"
          color="primary"
          type="submit"
          :loading="store.loadingFormTindakan"
          :disable="store.loadingFormTindakan"
        />
      </div>
    </q-form>
    <!-- <div class="q-pb-xl" /> -->
  </q-scroll-area>
</template>

<script setup>
import { useLayananPoli } from 'src/stores/simrs/pelayanan/poli/layanan'
import { onMounted, ref } from 'vue'

const store = useLayananPoli()

const options = ref([])
const formmRef = ref(null)
const inpQtyRef = ref(null)

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

// const jikaEcg = computed(() => {
//   return store.searchtindakan
// })

// function resetValidasi() {
//   formmRef.value?.resetValidation()
// }

// defineExpose({ resetValidasi })

onMounted(() => {
  if (props.pasien.kodepoli === 'POL041') options.value = store.listTindakan
  else options.value = store.listTindakan?.filter(x => x.kdpoli?.includes(props.pasien?.kodepoli))
  // console.log('options', options.value)
  // store.initReset()
  // formmRef.value?.resetValidation()
})

function updateSearchTindakan (val) {
  store.setKdTindakan(val).then(() => {
    inpQtyRef.value.focus()
  })
}

function onSubmit () {
  store.saveTindakan(props.pasien).then(() => {
    formmRef.value.resetValidation()
  })
}

function filterFn (val, update, abort) {
  if (val.length < 1) {
    abort()
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    const arr = props.pasien.kodepoli === 'POL041' ? store.listTindakan : store.listTindakan?.filter(x => x.kdpoli?.includes(props.pasien?.kodepoli))
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
