<template>
  <div class="full-height">
    <div class="q-pa-sm text-weight-bold">
      <!-- FORM DIAGNOSA
      <div class="f-10 text-weight-light">
        <em>form Diagnosa sekaligus pensimulasian INACBG </em>
      </div> -->
      <q-btn
        color="primary"
        class="q-pa-none"
        flat
        dense
      >
        MEMO : {{ pasien?.memodiagnosa ?? 'MEMO DOKTER' }}
        <q-menu
          style="width: 400px;"
        >
          <div class="q-pa-sm">
            <q-form @submit="gantiMemo">
              <q-input
                v-model="memoDokter"
                label="Masukkan Memo Dokter untuk diagnosa"
                outlined
                standout="bg-yellow-3"
                dense
                :rules="[val => !!val || 'Harap diisi']"
              />
            </q-form>
          </div>
        </q-menu>
      </q-btn>
    </div>
    <q-separator style="margin-top:-10px" />
    <q-form
      ref="formRef"
      class="row q-pa-md q-col-gutter-xs"
      @submit="onSubmit"
    >
      <div class="col-3">
        <div>Kasus Baru ?</div>
      </div>
      <div class="col-9 q-gutter-sm">
        <q-option-group
          v-model="store.formdiagnosa.kasus"
          name="kasus"
          :options="optionsKasus"
          inline
          dense
          @update:model-value="kasusDiUbah"
        />
      </div>
      <div class="col-12">
        <q-separator class="q-my-sm" />
      </div>
      <div class="col-3">
        <div>Diagnosis Utama ?</div>
      </div>
      <div class="col-9 q-gutter-sm">
        <q-option-group
          v-model="store.formdiagnosa.tipediagnosa"
          name="tipediagnosa"
          :options="optionsDiagutama"
          inline
          dense
          :disable="pasien?.diagnosamedis?.length > 0"
          @update:model-value="diagnosaUtamaDiubah"
        />
      <!-- <q-radio
        v-model="store.formdiagnosa.tipediagnosa"
        dense
        val="Primer"
        label="Iya"
      />
      <q-radio
        v-model="store.formdiagnosa.tipediagnosa"
        dense
        val="Sekunder"
        label="Tidak"
      /> -->
      </div>
      <div class="col-12">
        <q-separator class="q-my-sm" />
      </div>

      <div class="col-12 q-mb-sm">
        <q-select
          v-model="store.searchdiagnosa"
          use-input
          hide-selected
          fill-input
          outlined
          standout="bg-yellow-3"
          dense
          emit-value
          map-options
          option-value="kode"
          :option-label="opt => Object(opt) === opt && 'keterangan' in opt ? opt.kode +' ~ '+ opt.keterangan : ' Cari Diagnosa '"
          input-debounce="0"
          :options="options"
          label="Cari Diagnosa (ICD)"
          @filter="filterFn"
          @update:model-value="(val)=>store.setKode(val)"
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
      <div class="col-3">
        <div>Kode (ICD)</div>
      </div>
      <div class="col-9">
        <q-input
          v-model="store.formdiagnosa.kddiagnosa"
          placeholder="Kode (Automatis)"
          dense
          outlined
          standout="bg-yellow-3"
          :rules="[val => !!val || 'Harus diisi']"
          :lazy-rules="true"
          hide-bottom-space
          readonly
          style="max-width: 150px;"
        />
      </div>
      <div class="col-3">
        <div>Diagnosa</div>
      </div>
      <div class="col-9">
        <q-input
          v-model="store.formdiagnosa.diagnosa"
          placeholder="Diagnosa (Automatis)"
          outlined
          autogrow
          standout="bg-yellow-3"
          :rules="[val => !!val || 'Harus diisi']"
          :lazy-rules="true"
          hide-bottom-space
          readonly
        />
      </div>
      <div class="col-3">
        <div>Keterangan</div>
      </div>
      <div class="col-9">
        <q-input
          v-model="store.formdiagnosa.keterangan"
          autogrow
          outlined
          standout="bg-yellow-3"
          hide-bottom-space
        />
      </div>

      <div class="col-12">
        <q-separator class="q-my-lg" />
      </div>
      <div class="col-12">
        <q-btn
          label="Simpan Diagnosa"
          color="primary"
          type="submit"
          :loading="store.loadingFormDiagnosa"
          :disable="store.loadingFormDiagnosa"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
// import { useLayananPoli } from 'src/stores/simrs/pelayanan/poli/layanan'
// import { usePengunjungPoliStore } from 'src/stores/simrs/pelayanan/poli/pengunjung'
import { useDiagnosaStore } from 'src/stores/simrs/ranap/diagnosa'
import { usePengunjungRanapStore } from 'src/stores/simrs/ranap/pengunjung'
// eslint-disable-next-line no-unused-vars
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  nakes: {
    type: String,
    default: null
  }
})

const formRef = ref(null)
const store = useDiagnosaStore()
const pengunjung = usePengunjungRanapStore()
const emits = defineEmits(['savePemeriksaan'])

const memoDokter = ref('')

const $q = useQuasar()

const optionsKasus = ref([
  { label: 'Iya', value: 'Baru', color: 'primary' },
  { label: 'Tidak', value: 'Lama', color: 'negative' }
])
const optionsDiagutama = ref([
  { label: 'Iya', value: 'Primer', color: 'primary' },
  { label: 'Tidak', value: 'Sekunder', color: 'negative' }
])

function onSubmit () {
  if (store.formdiagnosa.kasus === null || store.formdiagnosa.kasus === '') {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'icon-mat-warning',
      message: 'Maaf Kasus Baru Atau Lama harus dipilih'
    })
  }
  else if (!store.formdiagnosa.kasus) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'icon-mat-warning',
      message: 'Maaf Kasus Baru Atau Lama harus dipilih'
    })
  }
  else {
    emits('savePemeriksaan')
  }
}

function resetValidation () {
  // formRef.value.resetValidation()
}
defineExpose({ resetValidation })
const options = ref([])
// const listDiagnosa = ref([])

onMounted(() => {
  // ganti()
  options.value = store.listDiagnosa
  store.initReset(props.pasien).then(() => {
    resetValidation()
  })
  // console.log('onMounted', options.value)
})

function filterFn (val, update, abort) {
  if (val.length < 2) {
    abort()
    options.value = []
    return
  }

  // if (store.formdiagnosa.kasus === null || store.formdiagnosa.kasus === '') {
  //   $q.notify({
  //     color: 'negative',
  //     textColor: 'white',
  //     icon: 'icon-mat-warning',
  //     message: 'Maaf Kasus Baru Atau Lama harus dipilih',
  //     position: 'top-left'
  //   })
  //   abort()
  //   return
  // }

  update(() => {
    const needle = val.toLowerCase()
    // const arr = store.listDiagnosa
    const arr = store.listDiagnosa
    // console.log('update', arr, needle, store.listDiagnosa)

    const filter = ['kode', 'keterangan']
    const multiFilter = (data = [], filterKeys = [], value = '') =>
      data.filter((item) => filterKeys.some(
        (key) =>
          item[key].toString().toLowerCase().includes(value.toLowerCase()) &&
            item[key]
      )
      )
    const filteredData = multiFilter(arr, filter, needle)
    options.value = filteredData
  })
}

function kasusDiUbah (val) {
  ganti(val)
}

function ganti (val) {
  // const arr = store.listDiagnosa
  // // console.log(arr)
  // listDiagnosa.value = arr

  const arr2 = props.pasien?.diagnosamedis

  // if (val === 'Baru' && arr2.length === 0) {
  //   listDiagnosa.value = arr.length ? arr.filter(x => !x.kode.toString().toLowerCase().includes('z')) : []
  //   // listDiagnosa.value = arr.length ? arr : []
  // }
  // else if (val === 'Baru' && arr2.length > 0) {
  //   // listDiagnosa.value = arr.length ? arr.filter(x => x.kode.toString().toLowerCase().includes('z')) : []
  //   listDiagnosa.value = arr.length ? arr : []
  // }
  // else if (val === 'Lama' && arr2.length === 0) {
  //   listDiagnosa.value = arr.length ? arr.filter(x => x.kode.toString().toLowerCase().includes('z')) : []
  // }
  // else if (val === 'Lama' && arr2.length > 0) {
  //   listDiagnosa.value = arr.length ? arr.filter(x => !x.kode.toString().toLowerCase().includes('z')) : []
  // }
  // listDiagnosa.value = arr.length ? arr : []
  arr2.length ? store.setFormDianosa('tipediagnosa', 'Sekunder') : store.setFormDianosa('tipediagnosa', 'Primer')

  // console.log('diag', arr)
}

function diagnosaUtamaDiubah (val) {
  // console.log(props.pasien)
  if (store.formdiagnosa.kasus === null || store.formdiagnosa.kasus === '') {
    $q.notify({
      color: 'negative',
      textColor: 'white',
      icon: 'icon-mat-warning',
      message: 'Maaf Kasus Baru Atau Lama harus dipilih terlebih dahulu',
      position: 'top-left'
    })

    // store.setFormDianosa('tipediagnosa', '')
  }
}

function gantiMemo () {
  // console.log('okkk')
  const form = {
    memo: memoDokter.value,
    noreg: props.pasien?.noreg
  }

  pengunjung.gantiMemo(form, props.pasien)
}

watch(() => props.pasien?.diagnosamedis, (obj) => {
  console.log('watch pilihan kasus', obj)
  ganti(store.formdiagnosa.kasus)
}, { deep: true })

</script>
