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
          v-model="store.formicd.kdprocedure"
          label="Cari Icd 9"
          outlined
          use-input
          standout="bg-yellow-3"
          dense
          emit-value
          map-options
          option-value="kd_prosedur"
          :option-label="opt => Object(opt) === opt && 'prosedur' in opt ? opt.kd_prosedur + ' ~ ' + opt.prosedur : ''"
          autocomplete="prosedur"
          input-debounce="500"
          valid
          :options="optionIcds"
          :loading="store.loadingIcd"
          @filter="filterIcd"
          @clear="store.setFormIcd('kdprocedure', null)"
          @update:model-value="setIcd"
        >
          <!-- @input-value="store.cariIcd9" -->
          <template
            v-if="store.formicd.kdprocedure"
            #append
          >
            <q-icon
              name="icon-mat-cancel"
              class="cursor-pointer"
              @click.stop.prevent="store.setFormIcd('kdprocedure', null)"
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
        v-if="ina.specialProcedureOpts.length"
        class="col-12 q-mb-sm"
      >
        <q-select
          v-model="ina.formSpecial.procedure_code"
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
          :options="ina.specialProcedureOpts"
          @clear="ina.setFormSpecial('procedure_code', null)"
          @update:model-value="ina.setFormSpecial('procedure_code', $event)"
        >
          <!-- @input-value="ina.cariIcd9" -->
          <template
            v-if="ina.formSpecial.procedure_code"
            #append
          >
            <q-icon
              name="icon-mat-cancel"
              class="cursor-pointer"
              @click.stop.prevent="ina.setFormSpecial('procedure_code', null)"
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
        v-if="ina.specialProsthesisOpts.length"
        class="col-12 q-mb-sm"
      >
        <q-select
          v-model="ina.formSpecial.prosthesis_code"
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
          :options="ina.specialProsthesisOpts"
          @clear="ina.setFormSpecial('prosthesis_code', null)"
          @update:model-value="ina.setFormSpecial('prosthesis_code', $event)"
        >
          <!-- @input-value="ina.cariIcd9" -->
          <template
            v-if="ina.formSpecial.prosthesis_code"
            #append
          >
            <q-icon
              name="icon-mat-cancel"
              class="cursor-pointer"
              @click.stop.prevent="ina.setFormSpecial('prosthesis_code', null)"
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
        v-if="ina.specialInvestigationOpts.length"
        class="col-12 q-mb-sm"
      >
        <q-select
          v-model="ina.formSpecial.investigation_code"
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
          :options="ina.specialInvestigationOpts"
          @clear="ina.setFormSpecial('investigation_code', null)"
          @update:model-value="ina.setFormSpecial('investigation_code', $event)"
        >
          <!-- @input-value="ina.cariIcd9" -->
          <template
            v-if="ina.formSpecial.investigation_code"
            #append
          >
            <q-icon
              name="icon-mat-cancel"
              class="cursor-pointer"
              @click.stop.prevent="ina.setFormSpecial('investigation_code', null)"
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
        v-if="ina.specialDrugOpts.length"
        class="col-12 q-mb-sm"
      >
        <q-select
          v-model="ina.formSpecial.drug_code"
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
          :options="ina.specialDrugOpts"
          @clear="ina.setFormSpecial('drug_code', null)"
          @update:model-value="ina.setFormSpecial('drug_code', $event)"
        >
          <!-- @input-value="ina.cariIcd9" -->
          <template
            v-if="ina.formSpecial.drug_code"
            #append
          >
            <q-icon
              name="icon-mat-cancel"
              class="cursor-pointer"
              @click.stop.prevent="ina.setFormSpecial('drug_code', null)"
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
          :loading="store.loadingSaveIcd"
          :disable="store.loadingSaveIcd"
        />
      </div>
    </q-form>
    <!-- <div class="q-pb-xl" /> -->
  </q-scroll-area>
</template>

<script setup>
import { useInacbgPoli } from 'src/stores/simrs/pelayanan/poli/inacbg'
import { useLayananPoli } from 'src/stores/simrs/pelayanan/poli/layanan'
import { onMounted, ref } from 'vue'

const store = useLayananPoli()
const ina = useInacbgPoli()

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

function setIcd(val) {
  store.setFormIcd('kdprocedure', val)
  const icd = store.optionsIcd9.filter(a => a.kd_prosedur === val)
  if (icd.length) {
    store.setFormIcd('procedure', icd[0].prosedur)
  }
}

function onSubmit() {
  store.saveIcd(props.pasien).then(() => {
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
