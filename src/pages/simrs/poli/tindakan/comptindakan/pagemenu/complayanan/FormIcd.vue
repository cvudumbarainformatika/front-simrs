<template>
  <div class="q-pa-md text-weight-bold">
    FORM Prosedur (Icd 9)
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
      <!-- icd 9 -->
      <div class="col-12 q-mb-sm">
        <q-select
          ref="refIcd"
          v-model="store.formtindakan.icd9"
          label="Cari Icd 9"
          outlined
          use-input
          standout="bg-yellow-3"
          dense
          emit-value
          map-options
          option-value="kd_prosedur"
          :option-label="opt => Object(opt) === opt && 'prosedur' in opt ? opt.kd_prosedur + ' ~ ' + opt.prosedur : ' Cari Icd 9 '"
          autocomplete="prosedur"
          input-debounce="500"
          valid
          :options="optionIcds"
          :loading="store.loadingIcd"
          @filter="filterIcd"
          @clear="store.setFormTindakan('icd9', null)"
          @update:model-value="store.setFormTindakan('icd9', $event)"
        >
          <!-- @input-value="store.cariIcd9" -->
          <template
            v-if="store.formtindakan.icd9"
            #append
          >
            <q-icon
              name="icon-mat-cancel"
              class="cursor-pointer"
              @click.stop.prevent="store.setFormTindakan('icd9', null)"
            />
          </template>
          <template #no-option>
            <q-item>
              <q-item-section class="text-grey">
                Tidak ditemukan
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <!-- Special Procedure -->
      <div
        v-if="store.specialProcedureOpts.length"
        class="col-12 q-mb-sm"
      >
        <q-select
          v-model="store.formtindakan.procedure_code"
          label="Special Procedure"
          outlined
          use-input
          standout="bg-yellow-3"
          dense
          emit-value
          map-options
          option-value="code"
          option-label="description"
          autocomplete="description"
          input-debounce="500"
          valid
          :options="store.specialProcedureOpts"
          @clear="store.setFormTindakan('procedure_code', null)"
          @update:model-value="store.setFormTindakan('procedure_code', $event)"
        >
          <!-- @input-value="store.cariIcd9" -->
          <template
            v-if="store.formtindakan.procedure_code"
            #append
          >
            <q-icon
              name="icon-mat-cancel"
              class="cursor-pointer"
              @click.stop.prevent="store.setFormTindakan('procedure_code', null)"
            />
          </template>
          <template #no-option>
            <q-item>
              <q-item-section class="text-grey">
                Tidak ditemukan
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <!-- Special Prosthesis -->
      <div
        v-if="store.specialProsthesisOpts.length"
        class="col-12 q-mb-sm"
      >
        <q-select
          v-model="store.formtindakan.prosthesis_code"
          label="Special Prosthesis"
          outlined
          use-input
          standout="bg-yellow-3"
          dense
          emit-value
          map-options
          option-value="code"
          option-label="description"
          autocomplete="description"
          input-debounce="500"
          valid
          :options="store.specialProsthesisOpts"
          @clear="store.setFormTindakan('prosthesis_code', null)"
          @update:model-value="store.setFormTindakan('prosthesis_code', $event)"
        >
          <!-- @input-value="store.cariIcd9" -->
          <template
            v-if="store.formtindakan.prosthesis_code"
            #append
          >
            <q-icon
              name="icon-mat-cancel"
              class="cursor-pointer"
              @click.stop.prevent="store.setFormTindakan('prosthesis_code', null)"
            />
          </template>
          <template #no-option>
            <q-item>
              <q-item-section class="text-grey">
                Tidak ditemukan
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <!-- Special Investigation -->
      <div
        v-if="store.specialInvestigationOpts.length"
        class="col-12 q-mb-sm"
      >
        <q-select
          v-model="store.formtindakan.investigation_code"
          label="Special Investigation"
          outlined
          use-input
          standout="bg-yellow-3"
          dense
          emit-value
          map-options
          option-value="code"
          option-label="description"
          autocomplete="description"
          input-debounce="500"
          valid
          :options="store.specialInvestigationOpts"
          @clear="store.setFormTindakan('investigation_code', null)"
          @update:model-value="store.setFormTindakan('investigation_code', $event)"
        >
          <!-- @input-value="store.cariIcd9" -->
          <template
            v-if="store.formtindakan.investigation_code"
            #append
          >
            <q-icon
              name="icon-mat-cancel"
              class="cursor-pointer"
              @click.stop.prevent="store.setFormTindakan('investigation_code', null)"
            />
          </template>
          <template #no-option>
            <q-item>
              <q-item-section class="text-grey">
                Tidak ditemukan
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <!-- Special Drug  -->
      <div
        v-if="store.specialDrugOpts.length"
        class="col-12 q-mb-sm"
      >
        <q-select
          v-model="store.formtindakan.drug_code"
          label="Special Drug"
          outlined
          use-input
          standout="bg-yellow-3"
          dense
          emit-value
          map-options
          option-value="code"
          option-label="description"
          autocomplete="description"
          input-debounce="500"
          valid
          :options="store.specialDrugOpts"
          @clear="store.setFormTindakan('drug_code', null)"
          @update:model-value="store.setFormTindakan('drug_code', $event)"
        >
          <!-- @input-value="store.cariIcd9" -->
          <template
            v-if="store.formtindakan.drug_code"
            #append
          >
            <q-icon
              name="icon-mat-cancel"
              class="cursor-pointer"
              @click.stop.prevent="store.setFormTindakan('drug_code', null)"
            />
          </template>
          <template #no-option>
            <q-item>
              <q-item-section class="text-grey">
                Tidak ditemukan
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>

      <div class="col-12 text-right">
        <q-btn
          label="Simpan Icd"
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
// const inpQtyRef = ref(null)

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
  console.log(formmRef.value)
  options.value = store.listTindakan
  // store.initReset()
  // formmRef.value?.resetValidation()
})

// function updateSearchTindakan(val) {
//   store.setKdTindakan(val).then(() => {
//     inpQtyRef.value.focus()
//   })
// }

function onSubmit() {
  store.saveTindakan(props.pasien).then(() => {
    formmRef.value.resetValidation()
  })
}

// function filterFn(val, update, abort) {
//   if (val.length < 1) {
//     abort()
//     return
//   }

//   update(() => {
//     const needle = val.toLowerCase()
//     const arr = store.listTindakan
//     const filter = ['kdtindakan', 'tindakan']
//     const multiFilter = (data = [], filterKeys = [], value = '') =>
//       data.filter((item) => filterKeys.some(
//         (key) =>
//           item[key].toString().toLowerCase().includes(value.toLowerCase()) &&
//           item[key]
//       )
//       )
//     const filteredData = multiFilter(arr, filter, needle)
//     options.value = filteredData
//   })
// }

const refIcd = ref(null)
const optionIcds = ref([])

function filterIcd(val, update) {
  if (val === '') {
    update(() => {
      optionIcds.value = store.optionsIcd9
    })
    return
  }
  if (val === null) {
    update(() => {
      optionIcds.value = store.optionsIcd9
    })
    return
  }

  update(() => {
    const filter = ['kd_prosedur', 'prosedur']
    const needle = val.toLowerCase()
    // const splits = arr.split('-')
    const multiFilter = (data = [], filterKeys = [], value = '') =>
      data.filter((item) =>
        filterKeys.some(
          (key) =>
            item[key].toString().toLowerCase().includes(value.toLowerCase()) &&
                item[key]
        )
      )
    let filteredData = multiFilter(store.optionsIcd9, filter, needle)
    if (!filteredData.length) {
      if (val !== '') {
        store.cariIcd9(val).then(() => {
          filteredData = multiFilter(store.optionsIcd9, filter, needle)
          optionIcds.value = filteredData
        })
      }
    } else {
      optionIcds.value = filteredData
    }
  })
}
</script>
