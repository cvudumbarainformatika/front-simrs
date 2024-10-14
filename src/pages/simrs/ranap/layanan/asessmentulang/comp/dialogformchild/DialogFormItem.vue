<template>
  <q-dialog persistent @hide="emits('onHide')">
    <q-card style="min-width: 40vw; min-height: 80vh; max-height: 80vh" class="column full-height">
      <q-bar class="col-auto">
        <q-icon name="icon-mat-edit_document" />
        <div class="f-12">
          {{ currentTime }}
        </div>

        <q-space />

        <q-btn dense flat icon="icon-mat-close" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-form class="col full-height column">
        <q-card-section v-if="settings.formOpen === 'anamnesis'" class="col full-height scroll">
          <FormAnamnesis :pasien="pasien" :kasus="kasus" :nakes="nakes" ulang />
        </q-card-section>
        <q-card-section v-if="settings.formOpen === 'pemeriksaan'" class="col full-height scroll">
          <FormPemeriksaanUmum :pasien="pasien" :kasus="kasus" :nakes="nakes" ulang class="q-mb-sm" />
          <FormPenilaian :pasien="pasien" :kasus="kasus" :nakes="nakes" ulang />
        </q-card-section>
        <q-separator />
        <q-card-actions align="right" class="col-auto q-pb-md z-top bg-grey-3">
          <q-btn
            :loading="settings.isLoadingSave" :disable="settings.isLoadingSave"
            size="md" outline rounded color="primary"
            :v-close-popup="settings.isEdit"
            @click="emits('onClick')"
          >
            <div class="q-px-lg">
              {{ settings.isEdit ? 'Update' : 'Ok' }}
            </div>
          </q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
// import { date } from 'quasar'
// eslint-disable-next-line no-unused-vars
import { computed, defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue'

const FormAnamnesis = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/anamnesis/FormAnamnesis.vue'))
const FormPemeriksaanUmum = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/pemeriksaan/comp/pemeriksaanUmum/FormPemeriksaanUmum.vue'))
const FormPenilaian = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/pemeriksaan/comp/penilaian/FormComp.vue'))

defineProps({
  settings: {
    type: Object,
    default: null
  },
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

const emits = defineEmits(['onHide', 'onClick'])

const currentTime = ref('')

onMounted(() => {
  setInterval(() => {
    const date = new Date()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    currentTime.value = `${hours}:${minutes}:${seconds}`
  }, 1000) // 1000ms = 1s

  console.log('currentTime', currentTime.value)
})

onUnmounted(() => {
  clearInterval()
})
</script>
