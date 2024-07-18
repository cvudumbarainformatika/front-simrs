<template>
  <div class="column full-height">
    <q-bar class="col-auto bg-dark text-white">
      <div class="q-py-sm f-14 ">
        Form Order Laborat
      </div>
    </q-bar>
    <div class="col full-height">
      <!-- <q-scroll-area style="height: calc(100% - 1px);"> -->
      <q-form
        ref="formRef"
        class="row q-pa-md q-col-gutter-xs"
        @submit="saveOrderLaborat"
      >
        <div class="col-12">
          <q-input
            v-model="store.permintaanLaborats"
            label="Permintaan (Klik Untuk Cari Pemeriksaan)"
            autogrow
            outlined
            standout="bg-yellow-3"
            icon="icon-mat-search"
            :rules="[val => !!val || 'Harap cari pemeriksaan dahulu']"
            lazy-rules="ondemand"
            hide-bottom-space
            @click="modalOpen = true"
          />
        </div>
        <div class="col-6">
          <q-input
            ref="diagnosaRef"
            v-model="store.form.diagnosa_masalah"
            label="Diagnosa / Masalah"
            dense
            outlined
            standout="bg-yellow-3"
          />
        </div>
        <div class="col-6">
          <q-input
            v-model="store.form.catatan_permintaan"
            label="Catatan"
            dense
            outlined
            standout="bg-yellow-3"
          />
        </div>
        <div class="col-12">
          <q-separator class="q-my-sm" />
        </div>
        <div class="col-6">
          <div class="flex items-center">
            <div class="q-mr-md">
              Pasien Puasa ?
            </div>
            <div class="q-gutter-sm">
              <q-radio
                v-model="store.form.puasa_pasien"
                val="Tidak"
                label="Tidak"
                size="sm"
                dense
              />
              <q-radio
                v-model="store.form.puasa_pasien"
                val="Iya"
                label="Iya"
                size="sm"
                dense
              />
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="flex items-center">
            <div class="q-mr-md">
              Cito ?
            </div>
            <div class="q-gutter-sm">
              <q-radio
                v-model="store.form.prioritas_pemeriksaan"
                val="Tidak"
                label="Tidak"
                size="sm"
                dense
              />
              <q-radio
                v-model="store.form.prioritas_pemeriksaan"
                val="Iya"
                label="Iya"
                size="sm"
                dense
              />
            </div>
          </div>
        </div>
        <div class="col-12">
          <q-separator class=" q-my-md" />
          <div class="text-right q-gutter-sm">
            <!-- <q-btn
                label="Reset Form"
                color="dark"
                type="reset"
              /> -->
            <q-btn
              label="Simpan & Kirim Order"
              color="primary"
              type="submit"
              :loading="store.loadingSaveLab"
              :disable="store.loadingSaveLab"
            />
          </div>
        </div>
      </q-form>
      <!-- </q-scroll-area> -->
    </div>

    <!-- MODAL -->
    <ModalPermintaan
      v-model="modalOpen"
      :masters="store.masterlaborat"
      :headers="store.headerlaborats"
      @ok="pilihPemeriksaans"
    />
  </div>
</template>
<script setup>
import { useLaboratPoli } from 'src/stores/simrs/pelayanan/poli/laborat'
import { onMounted, ref } from 'vue'
// import { formatRp } from 'src/modules/formatter'
import ModalPermintaan from './ModalPermintaan.vue'

const store = useLaboratPoli()

const modalOpen = ref(false)
// const cariRef = ref(null)
const formRef = ref(null)
const diagnosaRef = ref(null)

const options = ref()

const props = defineProps({
  pasien: { type: Object, default: null }
})

onMounted(() => {
  options.value = store.masterlaborat

  // cariRef.value.focus()
})

// async function filterFn(val, update, abort) {
//   if (val.length < 1) {
//     abort()
//     return
//   }
//   update(
//     () => {
//       const needle = val.toLowerCase()
//       // const arr = 'kdpemeriksaan'
//       const splits = ['name']
//       const multiFilter = (data = [], filterKeys = [], value = '') => data.filter((item) => filterKeys.some(key => item[key].toString().toLowerCase().includes(value.toLowerCase()) && item[key]))
//       const filteredData = multiFilter(store.masterlaborat, splits, needle)
//       options.value = filteredData
//     },
//     ref => {
//       if (val !== '' && ref.options.length) {
//         ref.setOptionIndex(-1)
//         ref.moveOptionSelection(1, true)
//       }
//     }
//   )
// }

// function insertList(val) {
//   console.log(val)
//   store.setDetails(val)
//   diagnosaRef.value.focus()
// }

// function filterAs(val, update) {
//   update(() => {
//     if (val === '') {
//       asalSumberSpesimenOptions.value = asalOptions
//     } else {
//       const needle = val.toLowerCase()
//       asalSumberSpesimenOptions.value = asalOptions.filter(
//         v => v.toLowerCase().indexOf(needle) > -1
//       )
//     }
//   })
// }

// function createValueAsalSumberSpesimen(val, done) {
//   if (val.length > 0) {
//     if (!asalOptions.includes(val)) {
//       asalOptions.push(val)
//     }
//     done(val, 'add-unique')
//   }
// }
// function filterMs(val, update) {
//   update(() => {
//     if (val === '') {
//       metodePengambilanSpesimenOptions.value = metodeOptions
//     } else {
//       const needle = val.toLowerCase()
//       metodePengambilanSpesimenOptions.value = metodeOptions.filter(
//         v => v.toLowerCase().indexOf(needle) > -1
//       )
//     }
//   })
// }

// function createValueMetodePengambilanSpesimen(val, done) {
//   if (val.length > 0) {
//     if (!metodeOptions.includes(val)) {
//       metodeOptions.push(val)
//     }
//     done(val, 'add-unique')
//   }
// }

function saveOrderLaborat () {
  // INI diganti function baru
  // console.log('save', props.pasien)
  store.saveOrderLaboratBaru(props.pasien).then(() => {
    // console.log(formRef.value)
    formRef.value.resetValidation()
  })
}

function pilihPemeriksaans (val) {
  // console.log(val)
  modalOpen.value = false
  const arr = val.length ? val.map(x => x.name) : []
  const implode = arr.length ? arr.join('||') : ''
  // console.log(implode)
  store.setPermintaanLaborats(implode, val)
  // insertList(val)
}

</script>
