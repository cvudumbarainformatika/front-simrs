<script setup>
import { useAsessmentUlangRanapStore } from 'src/stores/simrs/ranap/asessmentulang.js'
import { defineAsyncComponent, onMounted, reactive } from 'vue'
import useForm from './useForm'

const FormAnamnesis = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/anamnesis/FormAnamnesis.vue'))
const FormPemeriksaanUmum = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/pemeriksaan/comp/pemeriksaanUmum/FormPemeriksaanUmum.vue'))
const FormComp = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/pemeriksaan/comp/penilaian/FormComp.vue'))
// const FormComp = import('src/pages/simrs/ranap/layanan/pemeriksaan/comp/penilaian/FormComp.vue')

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  kasus: {
    type: Object,
    default: null
  },
  nakes: {
    type: String,
    default: null
  }
})

// eslint-disable-next-line no-unused-vars
const store = useAsessmentUlangRanapStore()

const SET = reactive({
  radius: '5px',
  headerClass: 'bg-grey-6 text-white',
  expandIconClass: 'text-white',
  classes: 'shadow-1 overflow-hidden q-mb-xs'
})

// eslint-disable-next-line no-unused-vars
const { storeAnamnesis, storePenilaian, storePemeriksaanUmum } = useForm(props.pasien)

onMounted(() => {
  storeAnamnesis.initReset(null)
  storePemeriksaanUmum.initReset()
  storePenilaian.getUsia(props.pasien)
  storePenilaian.initReset(props.pasien)

  // console.log('asesment :ulang="true"', storePenilaian.humptys)
})

</script>

<template>
  <q-form class="column fit">
    <div class="col full-height q-pa-md scroll">
      <q-list separator class="rounded-borders">
        <!-- SUBJECTIVE -->
        <q-expansion-item
          :default-opened="true"
          :header-class="`${SET.headerClass}`"
          :expand-icon-class="`${SET.expandIconClass}`"
          :class="`${SET.classes}`"
          :style="`border-radius: ${SET.radius}`"
        >
          <template #header>
            <q-item-section avatar>
              <q-avatar size="sm" color="dark" text-color="white">
                <div class="text-weight-bold">
                  S
                </div>
              </q-avatar>
            </q-item-section>

            <q-item-section class="text-bold">
              SUBJECTIVE
            </q-item-section>
          </template>

          <q-card>
            <q-card-section>
              <FormAnamnesis :pasien="pasien" :kasus="kasus" :nakes="nakes" ulang />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <!-- OBJECTIVE -->
        <q-expansion-item
          :default-opened="true"
          :header-class="`${SET.headerClass}`"
          :expand-icon-class="`${SET.expandIconClass}`"
          :class="`${SET.classes}`"
          :style="`border-radius: ${SET.radius}`"
        >
          <template #header>
            <q-item-section avatar>
              <q-avatar size="sm" color="dark" text-color="white">
                <div class="text-weight-bold">
                  O
                </div>
              </q-avatar>
            </q-item-section>

            <q-item-section class="text-bold">
              OBJECTIVE
            </q-item-section>
          </template>

          <q-card>
            <q-card-section>
              <FormPemeriksaanUmum :pasien="pasien" :kasus="kasus" ulang />
            </q-card-section>
            <q-card-section>
              <FormComp :pasien="pasien" :kasus="props.kasus" ulang :key="props.pasien" />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <!-- ASESSMENT -->
        <q-expansion-item
          :default-opened="true"
          :header-class="`${SET.headerClass}`"
          :expand-icon-class="`${SET.expandIconClass}`"
          :class="`${SET.classes}`"
          :style="`border-radius: ${SET.radius}`"
        >
          <template #header>
            <q-item-section avatar>
              <q-avatar size="sm" color="dark" text-color="white">
                <div class="text-weight-bold">
                  A
                </div>
              </q-avatar>
            </q-item-section>

            <q-item-section class="text-bold">
              ASSESSMENT
            </q-item-section>
          </template>

          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
              commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <!-- PLAN -->
        <q-expansion-item
          :default-opened="true"
          :header-class="`${SET.headerClass}`"
          :expand-icon-class="`${SET.expandIconClass}`"
          :class="`${SET.classes}`"
          :style="`border-radius: ${SET.radius}`"
        >
          <template #header>
            <q-item-section avatar>
              <q-avatar size="sm" color="dark" text-color="white">
                <div class="text-weight-bold">
                  P
                </div>
              </q-avatar>
            </q-item-section>

            <q-item-section class="text-bold">
              PLANT
            </q-item-section>
          </template>

          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
              commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>

      <div style="margin-bottom: 100px;" />
    </div>

    <div class="absolute-bottom full-width bg-yellow-3 q-pa-sm">
      <div class="flex justify-between items-center">
        <div>kiri</div>
        <div>
          <q-btn label="Tambahkan Asessment" color="primary" />
        </div>
      </div>
    </div>
  </q-form>
</template>
